import { ResourceSku } from '@azure/arm-compute';

export const mockLocations = [
  {
    id: '/subscriptions/fake-sub-id/locations/australiacentral',
    name: 'australiacentral',
    displayName: 'Australia Central',
    latitude: '-35.3075',
    longitude: '149.1244',
  },
  {
    id: '/subscriptions/fake-sub-id/locations/australiacentral2',
    name: 'australiacentral2',
    displayName: 'Australia Central 2',
    latitude: '-35.3075',
    longitude: '149.1244',
  },
];

export const mockResourceSkus: ResourceSku[] = [
  {
    resourceType: 'hostGroups/hosts',
    name: 'ESv3-Type4',
    family: 'standardESv3Family',
    locations: ['westus2'],
    locationInfo: [
      {
        location: 'westus2',
        zones: ['1', '2', '3'],
        zoneDetails: [
          {
            capabilities: [
              {
                name: 'UltraSSDAvailable',
                value: 'True',
              },
            ],
          },
        ],
      },
    ],
    capabilities: [
      {
        name: 'vCPUs',
        value: '119',
      },
      {
        name: 'vCPUsPerCore',
        value: '2',
      },
      {
        name: 'Cores',
        value: '64',
      },
      {
        name: 'SupportsAutoplacement',
        value: 'True',
      },
    ],
    restrictions: [],
  },
  {
    resourceType: 'virtualMachines',
    name: 'Standard_NV6s_v2',
    tier: 'Standard',
    size: 'NV6s_v2',
    family: 'standardNVSv2Family',
    locations: ['westus1'],
    locationInfo: [
      {
        location: 'westus1',
        zones: ['2'],
        zoneDetails: [],
      },
    ],
    capabilities: [
      {
        name: 'MaxResourceVolumeMB',
        value: '344064',
      },
      {
        name: 'OSVhdSizeMB',
        value: '1047552',
      },
      {
        name: 'vCPUs',
        value: '6',
      },
      {
        name: 'MemoryPreservingMaintenanceSupported',
        value: 'False',
      },
    ],
    restrictions: [
      {
        type: 'Location',
        values: ['westus1'],
        restrictionInfo: {
          locations: ['westus1'],
        },
        reasonCode: 'NotAvailableForSubscription',
      },
      {
        type: 'Zone',
        values: ['westus1'],
        restrictionInfo: {
          locations: ['westus1'],
          zones: ['1', '2', '3'],
        },
        reasonCode: 'NotAvailableForSubscription',
      },
    ],
  },
  {
    resourceType: 'virtualMachines',
    name: 'Standard_NV6_Promo',
    tier: 'Standard',
    size: 'NV6_Promo',
    family: 'standardNVPromoFamily',
    locations: ['westus2'],
    locationInfo: [
      {
        location: 'westus2',
        zones: ['3', '2', '1'],
        zoneDetails: [],
      },
    ],
    capabilities: [
      {
        name: 'MaxResourceVolumeMB',
        value: '389120',
      },
      {
        name: 'OSVhdSizeMB',
        value: '1047552',
      },
    ],
    restrictions: [
      {
        type: 'Zone',
        values: ['westus2'],
        restrictionInfo: {
          locations: ['westus2'],
          zones: ['1', '2', '3'],
        },
        reasonCode: 'NotAvailableForSubscription',
      },
    ],
  },
  {
    resourceType: 'virtualMachines',
    name: 'Standard_NV72ads_A10_v5',
    tier: 'Standard',
    size: 'NV72ads_A10_v5',
    family: 'StandardNVADSA10v5Family',
    locations: ['westus2'],
    locationInfo: [
      {
        location: 'westus2',
        zones: ['1', '3'],
        zoneDetails: [
          {
            capabilities: [
              {
                name: 'UltraSSDAvailable',
                value: 'True',
              },
            ],
          },
        ],
      },
    ],
    capabilities: [
      {
        name: 'MaxResourceVolumeMB',
        value: '2949120',
      },
      {
        name: 'OSVhdSizeMB',
        value: '1047552',
      },
      {
        name: 'vCPUs',
        value: '72',
      },
      {
        name: 'MemoryPreservingMaintenanceSupported',
        value: 'False',
      },
      {
        name: 'HyperVGenerations',
        value: 'V1,V2',
      },
      {
        name: 'MemoryGB',
        value: '880',
      },
      {
        name: 'MaxDataDiskCount',
        value: '32',
      },
      {
        name: 'CombinedTempDiskAndCachedIOPS',
        value: '96000',
      },
      {
        name: 'CombinedTempDiskAndCachedReadBytesPerSecond',
        value: '805306368',
      },
      {
        name: 'CombinedTempDiskAndCachedWriteBytesPerSecond',
        value: '805306368',
      },
      {
        name: 'CachedDiskBytes',
        value: '1099511627776',
      },
    ],
    restrictions: [],
  },
  {
    resourceType: 'virtualMachines',
    name: 'Standard_NV6s_v2',
    tier: 'Standard',
    size: 'NV6s_v2',
    family: 'standardNVSv2Family',
    locations: ['westus2'],
    locationInfo: [
      {
        location: 'westus2',
        zones: ['2', '1', '3'],
        zoneDetails: [
          {
            capabilities: [
              {
                name: 'UltraSSDAvailable',
                value: 'True',
              },
            ],
          },
        ],
      },
    ],
    capabilities: [
      {
        name: 'MaxResourceVolumeMB',
        value: '180224',
      },
      {
        name: 'OSVhdSizeMB',
        value: '1047552',
      },
    ],
    restrictions: [],
  },
  {
    resourceType: 'virtualMachines',
    name: 'Standard_PB6s',
    tier: 'Standard',
    size: 'PB6s',
    family: 'standardPBSFamily',
    locations: ['westus2'],
    locationInfo: [
      {
        location: 'westus2',
        zones: ['3'],
        zoneDetails: [],
      },
    ],
    capabilities: [
      {
        name: 'MaxResourceVolumeMB',
        value: '344064',
      },
      {
        name: 'OSVhdSizeMB',
        value: '1047552',
      },
      {
        name: 'CpuArchitectureType',
        value: 'x64',
      },
      {
        name: 'LowPriorityCapable',
        value: 'False',
      },

      {
        name: 'RdmaEnabled',
        value: 'False',
      },
      {
        name: 'MaxNetworkInterfaces',
        value: '1',
      },
    ],
    restrictions: [
      {
        type: 'Location',
        values: ['westus2'],
        restrictionInfo: {
          locations: ['westus2'],
        },
        reasonCode: 'NotAvailableForSubscription',
      },
      {
        type: 'Zone',
        values: ['westus2'],
        restrictionInfo: {
          locations: ['westus2'],
          zones: ['1', '2', '3'],
        },
        reasonCode: 'NotAvailableForSubscription',
      },
    ],
  },
];

export const mockVmSizes = [
  {
    name: 'Standard_DC2ds_v3',
    numberOfCores: 2,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 153600,
    memoryInMB: 16384,
    maxDataDiskCount: 8,
  },
  {
    name: 'Standard_DC4ds_v3',
    numberOfCores: 4,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 307200,
    memoryInMB: 32768,
    maxDataDiskCount: 16,
  },
  {
    name: 'Standard_DC8ds_v3',
    numberOfCores: 8,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 614400,
    memoryInMB: 65536,
    maxDataDiskCount: 32,
  },
  {
    name: 'Standard_DC16ds_v3',
    numberOfCores: 16,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 1228800,
    memoryInMB: 131072,
    maxDataDiskCount: 32,
  },
  {
    name: 'Standard_DC24ds_v3',
    numberOfCores: 24,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 1843200,
    memoryInMB: 196608,
    maxDataDiskCount: 32,
  },
  {
    name: 'Standard_DC32ds_v3',
    numberOfCores: 32,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 2457600,
    memoryInMB: 262144,
    maxDataDiskCount: 32,
  },
  {
    name: 'Standard_DC48ds_v3',
    numberOfCores: 48,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 2457600,
    memoryInMB: 393216,
    maxDataDiskCount: 32,
  },
  {
    name: 'Standard_ND6s',
    numberOfCores: 6,
    osDiskSizeInMB: 1047552,
    resourceDiskSizeInMB: 344064,
    memoryInMB: 114688,
    maxDataDiskCount: 12,
  },
];
