import { SubscriptionClient } from '@azure/arm-subscriptions';
import { Location } from '@azure/arm-subscriptions';
import { ClientSecretCredential, TokenCredential } from '@azure/identity';
import {
  ComputeManagementClient,
  ResourceSku,
  VirtualMachineSize,
} from '@azure/arm-compute';

/**
 * A client for accessing Azure resources using the Azure SDK.
 */
class AzureClient {
  private subscriptionId: string;
  private credentials: TokenCredential | undefined;

  /**
   * Creates an instance of AzureClient.
   *
   * @param subscriptionId - The ID of the Azure subscription to use.
   */
  constructor(subscriptionId: string) {
    this.subscriptionId = subscriptionId;
  }

  /**
   * Authenticates the client with the Azure API using a client secret.
   *
   * @param clientId - The Azure Active Directory (AAD) client ID to use for authentication.
   * @param clientSecret - The AAD client secret to use for authentication.
   * @param tenantId - The ID of the tenant where the AAD application is registered.
   */
  async authenticate(
    clientId: string,
    clientSecret: string,
    tenantId: string
  ): Promise<void> {
    try {
      const credentials: TokenCredential = new ClientSecretCredential(
        tenantId,
        clientId,
        clientSecret
      );
      this.credentials = credentials;
    } catch (error) {
      console.error('Failed to authenticate with Azure API:', error);
      throw error;
    }
  }

  /**
   * Gets a list of all locations for the current Azure subscription.
   *
   * @returns An array of `Location` objects representing the locations.
   * @throws An error if there was a problem retrieving the locations.
   */
  async getLocations(): Promise<Location[]> {
    if (!this.credentials) {
      throw new Error('Azure credentials not set');
    }
    try {
      const subscriptionsClient = new SubscriptionClient(this.credentials);
      const iterator = await subscriptionsClient.subscriptions.listLocations(
        this.subscriptionId
      );
      const locations: Location[] = [];
      for await (const location of iterator) {
        locations.push(location);
      }
      return locations;
    } catch (error) {
      console.error('Failed to get locations:', error);
      throw error;
    }
  }

  /**
   * Gets a list of resource SKUs for the specified location and resource type.
   *
   * @param [location] - The name of the location to filter by, or `undefined` to retrieve all SKUs.
   * @param [resourceType] - The name of the resource type to filter by, or `undefined` to retrieve all SKUs.
   * @param [vmSize] - The name of the virtual machine size to filter by, or `undefined` to retrieve all SKUs.
   * @returns An array of `ResourceSku` objects representing the resource SKUs.
   * @throws An error if there was a problem retrieving the resource SKUs.
   */
  async getResourceSkus(
    location?: string,
    resourceType?: string,
    vmSize?: string
  ): Promise<ResourceSku[]> {
    if (!this.credentials) {
      throw new Error('Azure credentials not set');
    }
    const filter = location ? `location eq '${location}'` : '';
    try {
      const computeClient = new ComputeManagementClient(
        this.credentials,
        this.subscriptionId
      );
      const skus = await computeClient.resourceSkus.list({
        filter,
      });
      const resourceSkus: ResourceSku[] = [];

      for await (const sku of skus) {
        if (!resourceType || sku.resourceType === resourceType)
          resourceSkus.push(sku);
      }
      // At this time, the Azure SDK does not support filtering by resource type or vm size.
      if (resourceType || vmSize) {
        return resourceSkus.filter((sku) => {
          const matchesResourceType = resourceType
            ? sku.resourceType === resourceType
            : true;
          const matchesVmSize = vmSize ? sku.name === vmSize : true;
          return matchesResourceType && matchesVmSize;
        });
      }
      return resourceSkus;
    } catch (error) {
      console.error('Failed to get resource skus:', error);
      throw error;
    }
  }

  /**
   * Gets a list of virtual machine sizes for the specified location.
   *
   * @param location - The name of the location to retrieve virtual machine sizes for.
   * @returns An array of `VirtualMachineSize` objects representing the virtual machine sizes.
   * @throws An error if there was a problem retrieving the virtual machine sizes.
   */
  async getVirtualMachineSizes(location: string): Promise<ResourceSku[]> {
    if (!this.credentials) {
      throw new Error('Azure credentials not set');
    }
    try {
      const computeClient = new ComputeManagementClient(
        this.credentials,
        this.subscriptionId
      );
      const sizes = await computeClient.virtualMachineSizes.list(location);
      const vmSizes: VirtualMachineSize[] = [];
      for await (const vm of sizes) {
        vmSizes.push(vm);
      }
      return vmSizes;
    } catch (error) {
      console.error('Failed to get virtual machine sizes:', error);
      throw error;
    }
  }
}

export default AzureClient;
