export interface GetClustersParams {
  /** An optional array of cluster IDs */
  clusters?: string[]

  /** An optional array of datacenter IDs */
  datacenters?: string[]

  /** An optional array of folder IDs */
  folders?: string[]

  /** An optional array of cluster names */
  names?: string[]
}

/**
 * Represents a vSphere cluster object.
 */
export interface Cluster {
  /** Whether Distributed Resource Scheduler (DRS) is enabled. */
  drs_enabled: boolean
  /** Identifier of the cluster. */
  cluster: string
  /** Name of the cluster. */
  name: string
  /** Whether High Availability (HA) is enabled. */
  ha_enabled: boolean
}

/**
 * The power state of a virtual machine.
 */
export enum PowerState {
  POWERED_ON = 'POWERED_ON',
  POWERED_OFF = 'POWERED_OFF',
  SUSPENDED = 'SUSPENDED',
}

/**
 * Represents a virtual machine object.
 */
export interface VM {
  /** Memory size of the virtual machine in mebibytes (MiB). */
  memory_size_MiB: number
  /** Identifier of the virtual machine. */
  vm: string
  /** Name of the virtual machine. */
  name: string
  /** Power state of the virtual machine. */
  power_state: string
  /** Number of CPUs in the virtual machine. */
  cpu_count: number
}

/**
 * Parameters for filtering virtual machines.
 */
export interface GetVMsParams {
  /** Array of cluster IDs to filter by. */
  clusters?: string[]
  /** Array of datacenter IDs to filter by. */
  datacenters?: string[]
  /** Array of folder IDs to filter by. */
  folders?: string[]
  /** Array of host IDs to filter by. */
  hosts?: string[]
  /** Array of virtual machine names to filter by. */
  names?: string[]
  /** Array of virtual machine power states to filter by. */
  power_states?: PowerState[]
  /** Array of resource pool IDs to filter by. */
  resource_pools?: string[]
  /** Array of virtual machine IDs to filter by. */
  vms?: string[]
}

/**
 * Represents a vSphere data center object.
 */
export interface DataCenter {
  /**
   * The identifier of the data center.
   */
  datacenter: string

  /**
   * The name of the data center.
   */
  name: string
}

/**
 * The parameters used to filter the list of data centers.
 */
export interface GetDataCentersParams {
  /**
   * An optional array of datacenter IDs to filter by. If unset or empty, datacenters with any identifier match the filter.
   */
  datacenters?: string[]

  /**
   * An optional array of folder IDs that must contain the datacenters for the datacenter to match the filter. If unset or empty, datacenters in any folder match the filter.
   */
  folders?: string[]

  /**
   * An optional array of names that datacenters must have to match the filter. If unset or empty, datacenters with any name match the filter.
   */
  names?: string[]
}

/**
 * The supported types of vCenter datastores.
 */
export type DatastoreType =
  | 'VMFS'
  | 'NFS'
  | 'NFS41'
  | 'CIFS'
  | 'VSAN'
  | 'VFFS'
  | 'VVOL'

/**
 * Represents a datastore object.
 */
export interface Datastore {
  /** Identifier of the datastore. */
  datastore: string
  /** Name of the datastore. */
  name: string
  /** Type of the datastore. */
  type: DatastoreType
  /** Capacity of the datastore, in bytes. */
  capacity?: number
  /** Available space of the datastore, in bytes. */
  free_space?: number
}

/**
 * Parameters for filtering datastores.
 */
export interface GetDatastoresParams {
  /** Array of datacenter IDs to filter by. */
  datacenters?: string[]
  /** Array of datastore IDs to filter by. */
  datastores?: string[]
  /** Array of folder IDs to filter by. */
  folders?: string[]
  /** Array of datastore names to filter by. */
  names?: string[]
  /** Array of datastore types to filter by. */
  types?: DatastoreType[]
}

/**
 * Represents a vSphere folder object.
 */
export interface Folder {
  /** Identifier of the folder. */
  folder: string
  /** Name of the folder. */
  name: string
  /** Type of the folder. */
  type: FolderType
}

/**
 * The type of a vSphere folder.
 */
export enum FolderType {
  DATACENTER = 'DATACENTER',
  DATASTORE = 'DATASTORE',
  HOST = 'HOST',
  NETWORK = 'NETWORK',
  VIRTUAL_MACHINE = 'VIRTUAL_MACHINE',
}

/**
 * Parameters for filtering folders.
 */
export interface GetFoldersParams {
  /** Array of datacenter IDs to filter by. */
  datacenters?: string[]
  /** Array of folder IDs to filter by. */
  folders?: string[]
  /** Array of folder names to filter by. */
  names?: string[]
  /** Array of parent folder IDs to filter by. */
  parent_folders?: string[]
  /** Type of folder to filter by. */
  type?: FolderType
}

/**
 * StdLocalizableMessage type
 */
export interface StdLocalizableMessage {
  // Positional arguments to be substituted into the message template
  args: string[]
  // The value of this localizable string or message template in the en_US (English) locale
  default_message: string
  // Unique identifier of the localizable string or message template
  id: string
  // Localized string value as per request requirements
  localized?: string
  // Named arguments to be substituted into the message template
  params?: Record<string, any>
}

/**
 * TaskProgress type
 */
export interface TaskProgress {
  // The amount of work completed for the operation
  completed: number
  // Message about the work progress
  message: StdLocalizableMessage
  // Total amount of the work for the operation
  total: number
}

/**
 * DeploymentNotification type
 */
export interface DeploymentNotification {
  // The notification id
  id: string
  // The notification message
  message: StdLocalizableMessage
  // The resolution message, if any. Only set for warnings and errors
  resolution?: StdLocalizableMessage
  // The time the notification was raised/found. Only set if the time information is available
  time?: string
}

/**
 * DeploymentNotifications type
 */
export interface DeploymentNotifications {
  // Error notification messages reported. Only set if an error was reported by the task
  errors?: DeploymentNotification[]
  // Info notification messages reported. Only set if an info was reported by the task
  info?: DeploymentNotification[]
  // Warning notification messages reported. Only set if a warning was reported by the task
  warnings?: DeploymentNotification[]
}

/**
 * StdDynamicID type
 */
export interface StdDynamicID {
  // The identifier for a resource whose type is specified by DynamicID.type
  id: string
  // The type of resource being identified
  type: string
}

/**
 * DeploymentSubtask type
 */
export interface DeploymentSubtask {
  // Flag to indicate whether or not the operation can be cancelled
  cancelable: boolean
  // Description of the operation associated with the task
  description: StdLocalizableMessage
  // Time when the operation is completed
  end_time?: string
  // Description of the error if the operation status is “FAILED”
  error?: any
  // Identifier of the operation associated with the task
  operation: string
  // Parent of the current task
  parent?: string
  // The progress info of this deployment task
  progress?: TaskProgress
  // Result of the task
  result?: DeploymentNotifications
  // Identifier of the service containing the operation
  service: string
  // Time when the operation is started
  start_time?: string
  // Status of the operation associated with the task
  status: TaskStatus
  // Identifier of the target created by the operation or an existing one the operation performed on
  target?: StdDynamicID
  // Name of the user who performed the operation
  user?: string
}

/**
 * TaskStatus enum
 */
export enum TaskStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  BLOCKED = 'BLOCKED',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

/**
 * DeploymentApplianceState enum
 */
export enum DeploymentApplianceState {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  INITIALIZED = 'INITIALIZED',
  CONFIG_IN_PROGRESS = 'CONFIG_IN_PROGRESS',
  QUESTION_RAISED = 'QUESTION_RAISED',
  FAILED = 'FAILED',
  CONFIGURED = 'CONFIGURED',
}

/**
 * DeploymentInfo type
 */
export interface DeploymentInfo {
  // Identifier of the service containing the operation
  service: string
  // Description of the operation associated with the task
  description: StdLocalizableMessage
  // Status of the operation associated with the task
  status: TaskStatus
  // The ApplianceState of the vCenter Appliance
  state: DeploymentApplianceState
  // Identifier of the operation associated with the task
  operation: string
  // Flag to indicate whether or not the operation can be cancelled
  cancelable: boolean
  // The progress info of the current appliance status
  progress?: TaskProgress
  // Parent of the current task
  parent?: string
  // Time when the operation is started
  start_time?: string
  // Description of the error if the operation status is “FAILED”
  error?: any
  // Time when the operation is completed
  end_time?: string
  // The ordered list of subtasks for this deployment operation
  subtask_order?: string[]
  // The map of the deployment subtasks and their status information
  subtasks?: Record<string, DeploymentSubtask>
  // Identifier of the target created by the operation or an existing one the operation performed on
  target?: StdDynamicID
  // Name of the user who performed the operation
  user?: string
}

/**
 * The connection status of a host.
 */
export enum HostConnectionState {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  NOT_RESPONDING = 'NOT_RESPONDING',
}

/**
 * Represents a Host object with its properties.
 */
export interface Host {
  /** The connection status of the host. */
  connection_state: HostConnectionState
  /** Identifier of the host. */
  host: string
  /** Name of the host. */
  name: string
  /** The power state of the host. */
  power_state?: PowerState
}

/**
 * Parameters to filter the hosts to fetch.
 */
export interface GetHostsParams {
  /** Clusters that must contain the hosts. */
  clusters?: string[]
  /** Connection states that a host must be in. */
  connection_states?: HostConnectionState[]
  /** Datacenters that must contain the hosts. */
  datacenters?: string[]
  /** Folders that must contain the hosts. */
  folders?: string[]
  /** Identifiers of hosts that can match the filter. */
  hosts?: string[]
  /** Names that hosts must have to match the filter. */
  names?: string[]
  /** If true, only standalone hosts can match the filter. */
  standalone?: boolean
}

/**
 * The type of a vCenter Server network.
 */
export enum NetworkType {
  STANDARD_PORTGROUP = 'STANDARD_PORTGROUP',
  DISTRIBUTED_PORTGROUP = 'DISTRIBUTED_PORTGROUP',
  OPAQUE_NETWORK = 'OPAQUE_NETWORK',
}

/**
 * Represents a Network object with its properties.
 */
export interface Network {
  /** Name of the network. */
  name: string
  /** Identifier of the network. */
  network: string
  /** The type of the network. */
  type: NetworkType
}

/**
 * Parameters to filter the networks to fetch.
 */
export interface GetNetworksParams {
  /** Datacenters that must contain the network. */
  datacenters?: string[]
  /** Folders that must contain the network. */
  folders?: string[]
  /** Names that networks must have to match the filter. */
  names?: string[]
  /** Identifiers of networks that can match the filter. */
  networks?: string[]
  /** Types that networks must have to match the filter. */
  types?: NetworkType[]
}

/**
 * Represents a ResourcePool object with its properties.
 */
export interface ResourcePool {
  /** Name of the resource pool. */
  name: string
  /** Identifier of the resource pool. */
  resource_pool: string
}

/**
 * Parameters to filter the resource pools to fetch.
 */
export interface GetResourcePoolsParams {
  /** Clusters that must contain the resource pool. */
  clusters?: string[]
  /** Datacenters that must contain the resource pool. */
  datacenters?: string[]
  /** Hosts that must contain the resource pool. */
  hosts?: string[]
  /** Names that resource pools must have to match the filter. */
  names?: string[]
  /** Resource pools that must contain the resource pool. */
  parent_resource_pools?: string[]
  /** Identifiers of resource pools that can match the filter. */
  resource_pools?: string[]
}
