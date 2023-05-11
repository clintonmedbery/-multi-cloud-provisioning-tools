import {
  Cluster,
  Datastore,
  DeploymentApplianceState,
  DeploymentInfo,
  Folder,
  FolderType,
  Host,
  HostConnectionState,
  Network,
  NetworkType,
  ResourcePool,
  TaskStatus,
  VM,
} from '../../models/VSphereModels';

export const mockVMs: VM[] = [
  {
    memory_size_MiB: 4096,
    vm: 'vm-100',
    name: 'Test VM 1',
    power_state: 'POWERED_ON',
    cpu_count: 2,
  },
  {
    memory_size_MiB: 2048,
    vm: 'vm-200',
    name: 'Test VM 2',
    power_state: 'POWERED_OFF',
    cpu_count: 1,
  },
];

export const mockClusters: Cluster[] = [
  {
    drs_enabled: true,
    cluster: 'cluster-100',
    name: 'Test Cluster 1',
    ha_enabled: true,
  },
  {
    drs_enabled: false,
    cluster: 'cluster-200',
    name: 'Test Cluster 2',
    ha_enabled: true,
  },
];

export const mockDataCenters = [
  {
    datacenter: 'dc1',
    name: 'Data Center 1',
  },
  {
    datacenter: 'dc2',
    name: 'Data Center 2',
  },
];

// VSphereClient.fixtures.ts
export const mockDatastores: Datastore[] = [
  {
    datastore: 'ds1',
    name: 'Datastore 1',
    type: 'NFS',
    capacity: 100000,
    free_space: 50000,
  },
  {
    datastore: 'ds2',
    name: 'Datastore 2',
    type: 'NFS41',
    capacity: 200000,
    free_space: 100000,
  },
  {
    datastore: 'ds3',
    name: 'Datastore 3',
    type: 'NFS41',
    capacity: 200000,
    free_space: 100000,
  },
];

export const mockFolders: Folder[] = [
  {
    folder: 'folder-100',
    name: 'Folder 1',
    type: FolderType.DATACENTER,
  },
  {
    folder: 'folder-200',
    name: 'Folder 2',
    type: FolderType.HOST,
  },
  {
    folder: 'folder-300',
    name: 'Folder 3',
    type: FolderType.VIRTUAL_MACHINE,
  },
];

export const mockDeployments: DeploymentInfo[] = [
  {
    service: 'service-1',
    description: {
      args: [],
      default_message: 'Deployment 1',
      id: 'deploy-1',
    },
    status: TaskStatus.SUCCEEDED,
    state: DeploymentApplianceState.CONFIGURED,
    operation: 'operation-1',
    cancelable: false,
  },
  {
    service: 'service-2',
    description: {
      args: [],
      default_message: 'Deployment 2',
      id: 'deploy-2',
    },
    status: TaskStatus.FAILED,
    state: DeploymentApplianceState.FAILED,
    operation: 'operation-2',
    cancelable: true,
  },
];

export const mockHosts: Host[] = [
  {
    connection_state: HostConnectionState.CONNECTED,
    host: 'host-1',
    name: 'Host 1',
  },
  {
    connection_state: HostConnectionState.DISCONNECTED,
    host: 'host-2',
    name: 'Host 2',
  },
];

export const mockNetworks: Network[] = [
  {
    name: 'Network 1',
    network: 'network-1',
    type: NetworkType.STANDARD_PORTGROUP,
  },
  {
    name: 'Network 2',
    network: 'network-2',
    type: NetworkType.DISTRIBUTED_PORTGROUP,
  },
  {
    name: 'Network 3',
    network: 'network-3',
    type: NetworkType.OPAQUE_NETWORK,
  },
];

export const mockResourcePools: ResourcePool[] = [
  {
    name: 'ResourcePool 1',
    resource_pool: 'res-pool-1',
  },
  {
    name: 'ResourcePool 2',
    resource_pool: 'res-pool-2',
  },
];
