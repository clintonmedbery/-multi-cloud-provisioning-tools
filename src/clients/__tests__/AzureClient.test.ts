import { SubscriptionClient } from '@azure/arm-subscriptions';
import { ClientSecretCredential } from '@azure/identity';
import AzureClient from '../AzureClient';
import {
  mockLocations,
  mockResourceSkus,
  mockVmSizes,
} from './AzureClient.fixtures';
import { ComputeManagementClient } from '@azure/arm-compute';

const mockSkusGenerator = ({ filter }: { filter: string }) => {
  let skus = mockResourceSkus;
  if (filter) {
    const [key, value] = filter.split(' eq ');
    if (key === 'location') {
      // Removing single quotes from the value using a regex
      // The regex /'/g matches all single quote characters in the string
      const locationValue = value.replace(/'/g, '');
      skus = skus.filter(
        (sku) => sku.locations && sku.locations.includes(locationValue)
      );
    }
  }
  let i = 0;
  return {
    [Symbol.asyncIterator]: async function* () {
      while (i < skus.length) {
        yield skus[i++];
      }
    },
    byPage: jest.fn().mockImplementation(() => {
      return {
        [Symbol.asyncIterator]: async function* () {
          while (i < skus.length) {
            yield { skus: [skus[i++]] };
          }
        },
      };
    }),
    next: jest.fn(),
  };
};

const mockVmSizesGenerator = () => {
  let vmSizes = mockVmSizes;
  return {
    [Symbol.asyncIterator]: async function* () {
      let i = 0;
      while (i < vmSizes.length) {
        yield vmSizes[i++];
      }
    },
    byPage: jest.fn().mockImplementation(() => {
      return {
        [Symbol.asyncIterator]: async function* () {
          let i = 0;
          while (i < vmSizes.length) {
            yield { vmSizes: [vmSizes[i++]] };
          }
        },
      };
    }),
    next: jest.fn(),
  };
};

jest.mock('@azure/arm-compute', () => {
  return {
    ComputeManagementClient: jest.fn().mockImplementation(() => {
      return {
        resourceSkus: {
          list: jest.fn().mockImplementation(mockSkusGenerator),
        },
        virtualMachineSizes: {
          list: jest.fn().mockImplementation(mockVmSizesGenerator),
        },
      };
    }),
  };
});

jest.mock('@azure/arm-subscriptions', () => {
  return {
    SubscriptionClient: jest.fn().mockImplementation(() => {
      return {
        subscriptions: {
          listLocations: jest.fn().mockResolvedValue(mockLocations),
        },
      };
    }),
  };
});

const mockClientSecretCredential = {
  getToken: jest.fn().mockResolvedValue({
    token: 'mock-token',
    expiresOnTimestamp: Date.now() + 3600000,
  }),
};

jest.mock('@azure/identity', () => {
  return {
    ClientSecretCredential: jest.fn(() => mockClientSecretCredential),
  };
});

describe('AzureClient', () => {
  let azureClient: AzureClient;
  const clientId = 'test-client-id';
  const clientSecret = 'test-client-secret';
  const tenantId = 'test-tenant-id';
  beforeEach(() => {
    azureClient = new AzureClient('test-subscription-id');
  });

  describe('authenticate', () => {
    it('should authenticate and set the credentials', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);

      expect(ClientSecretCredential).toHaveBeenCalledWith(
        tenantId,
        clientId,
        clientSecret
      );
    });
  });

  describe('getLocations', () => {
    it('should return the list of locations', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const locations = await azureClient.getLocations();
      expect(locations).toEqual(mockLocations);
      expect(SubscriptionClient).toHaveBeenCalledTimes(1);
    });
  });

  describe('getResourceSkus', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return all skus', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const skus = await azureClient.getResourceSkus();
      expect(skus).toEqual(mockResourceSkus);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
      expect(skus.length).toBe(6);
    });

    it('should return skus filtered by location', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const skus = await azureClient.getResourceSkus('westus2');
      const filteredSkus = mockResourceSkus.filter(
        (sku) => sku.locations && sku.locations.includes('westus2')
      );
      expect(skus).toEqual(filteredSkus);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
      expect(skus.length).toBe(5);
    });

    it('should return skus filtered by resourceType', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const skus = await azureClient.getResourceSkus(
        undefined,
        'virtualMachines'
      );
      const filteredSkus = mockResourceSkus.filter(
        (sku) => sku.resourceType === 'virtualMachines'
      );
      expect(skus).toEqual(filteredSkus);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
      expect(skus.length).toBe(5);
    });

    it('should return skus filtered by vmSize', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const skus = await azureClient.getResourceSkus(
        undefined,
        undefined,
        'Standard_NV6s_v2'
      );
      const filteredSkus = mockResourceSkus.filter(
        (sku) => sku.name === 'Standard_NV6s_v2'
      );
      expect(skus).toEqual(filteredSkus);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
      expect(skus.length).toBe(2);
    });

    it('should return skus filtered by location, resourceType, and vmSize', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const skus = await azureClient.getResourceSkus(
        'westus2',
        'virtualMachines',
        'Standard_NV6s_v2'
      );
      const filteredSkus = mockResourceSkus.filter(
        (sku) =>
          sku.locations &&
          sku.locations.includes('westus2') &&
          sku.resourceType === 'virtualMachines' &&
          sku.name === 'Standard_NV6s_v2'
      );
      expect(skus).toEqual(filteredSkus);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
      expect(skus.length).toBe(1);
    });
  });

  describe('getVirtualMachineSizes', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return all virtual machine sizes for a location', async () => {
      await azureClient.authenticate(clientId, clientSecret, tenantId);
      const vmSizes = await azureClient.getVirtualMachineSizes('westus2');
      expect(vmSizes).toEqual(mockVmSizes);
      expect(ComputeManagementClient).toHaveBeenCalledTimes(1);
    });
  });
});
