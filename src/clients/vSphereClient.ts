import fetch from 'node-fetch'
import {
  GetVMsParams,
  VM,
  GetClustersParams,
  Cluster,
  GetDataCentersParams,
  DataCenter,
  GetDatastoresParams,
  Datastore,
  GetFoldersParams,
  Folder,
  DeploymentInfo,
  GetHostsParams,
  Host,
  GetNetworksParams,
  Network,
  GetResourcePoolsParams,
  ResourcePool,
} from '../models/vSphereModels'
import { buildQueryString } from '../utils'

class vSphereClient {
  private baseUrl: string
  private headers: Record<string, string>
  private sessionId?: string

  constructor(
    host: string,
    private username: string,
    private password: string
  ) {
    this.baseUrl = `https://${host}`
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    this.headers = { 'Content-Type': 'application/json' }
  }

  async authenticate(): Promise<void> {
    try {
      const basicAuth = Buffer.from(
        `${this.username}:${this.password}`
      ).toString('base64')
      this.headers['Authorization'] = `Basic ${basicAuth}`
      const response = await fetch(`${this.baseUrl}/api/session`, {
        method: 'POST',
        headers: this.headers,
      })

      if (!response.ok) {
        throw new Error(
          `Failed to authenticate with vSphere API: ${response.statusText}`
        )
      }

      const data = await response.json()
      // @ts-ignore
      this.sessionId = data
    } catch (error) {
      console.error('Failed to authenticate with vSphere API:', error)
      throw error
    }
  }

  async authenticateOrThrow(): Promise<void> {
    if (!this.sessionId) {
      await this.authenticate()
    }
    if (!this.sessionId) {
      throw new Error('Failed to authenticate with vSphere API: No session ID')
    }
  }

  /**
   * Fetches a list of virtual machines filtered by the given parameters.
   * @param params - An object containing optional arrays of cluster IDs, datacenter IDs, folder IDs, host IDs, names, power_states, resource_pool IDs, and VM IDs
   * @returns {Promise<VM[]>} A Promise that resolves with the list of virtual machines
   * @throws An error if the request fails
   */
  async getVMs(params?: GetVMsParams): Promise<VM[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/vm`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get VMs: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get VMs:', error)
      throw error
    }
  }

  /**
   * Fetches a list of clusters filtered by the given parameters.
   * @param params - An object containing optional arrays of cluster IDs, datacenter IDs, folder IDs, and cluster names
   * @returns {Promise<Cluster[]>} A Promise that resolves with the list of clusters
   * @throws An error if the request fails
   */
  async getClusters(params?: GetClustersParams): Promise<Cluster[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/cluster`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Clusters: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Clusters:', error)
      throw error
    }
  }

  /**
   * Fetches a list of datacenters filtered by the given parameters.
   * @param params - An object containing optional arrays of datacenter IDs, folder IDs, and datacenter names
   * @returns {Promise<DataCenter[]>} A Promise that resolves with the list of datacenters
   * @throws An error if the request fails
   */
  async getDataCenters(params?: GetDataCentersParams): Promise<DataCenter[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/datacenter`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get DataCenters: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get DataCenters:', error)
      throw error
    }
  }

  /**
   * Fetches a list of datastores filtered by the given parameters.
   * @param params - An object containing optional arrays of datastore IDs, datacenter IDs, folder IDs, datastore names, and datastore types
   * @returns {Promise<Datastore[]>} A Promise that resolves with the list of datastores
   * @throws An error if the request fails
   */
  async getDatastores(params?: GetDatastoresParams): Promise<Datastore[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/datastore`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Datastores: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Datastores:', error)
      throw error
    }
  }

  /**
   * Fetches a list of folders filtered by the given parameters.
   * @param params - An object containing optional arrays of datacenter IDs, folder IDs, folder names, parent folder IDs, and folder types
   * @returns {Promise<Folder[]>} A Promise that resolves with the list of folders
   * @throws An error if the request fails
   */
  async getFolders(params?: GetFoldersParams): Promise<Folder[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/folder`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Folders: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Folders:', error)
      throw error
    }
  }

  /**
   * Fetch deployment information.
   * @returns {Promise<DeploymentInfo[]>} Deployment information.
   */
  async getDeployments(): Promise<DeploymentInfo[]> {
    await this.authenticateOrThrow()
    const url = `${this.baseUrl}/api/vcenter/deployment`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Deployment Information: ${JSON.stringify(
            response,
            null,
            2
          )}`
        )
      }

      const data = await response.json()
      return data as DeploymentInfo[]
    } catch (error) {
      console.error('Failed to get Deployment Information:', error)
      throw error
    }
  }

  /**
   * Fetches a list of hosts filtered by the given parameters.
   * @param params - An object containing optional arrays of cluster IDs, connection states, datacenter IDs, folder IDs, host IDs, host names, and a standalone flag
   * @returns A Promise that resolves with the list of hosts
   * @throws An error if the request fails
   */
  async getHosts(params?: GetHostsParams): Promise<Host[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/host`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Hosts: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Hosts:', error)
      throw error
    }
  }

  /**
   * Fetches a list of networks filtered by the given parameters.
   * @param params - An object containing optional arrays of datacenter IDs, folder IDs, network names, network IDs, and network types
   * @returns A Promise that resolves with the list of networks
   * @throws An error if the request fails
   */
  async getNetworks(params?: GetNetworksParams): Promise<Network[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/network`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Networks: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Networks:', error)
      throw error
    }
  }

  /**
   * Fetches a list of resource pools filtered by the given parameters.
   * @param params - An object containing optional arrays of cluster IDs, datacenter IDs, host IDs, resource pool names, parent resource pool IDs, and resource pool IDs
   * @returns A Promise that resolves with the list of resource pools
   * @throws An error if the request fails
   */
  async getResourcePools(
    params?: GetResourcePoolsParams
  ): Promise<ResourcePool[]> {
    await this.authenticateOrThrow()

    let url = `${this.baseUrl}/api/vcenter/resource-pool`
    if (params) {
      url += `?${buildQueryString(params as Record<string, string | string[]>)}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'vmware-api-session-id': this.sessionId ?? '' },
      })

      if (!response.ok) {
        throw new Error(
          `Failed to get Resource Pools: ${JSON.stringify(response, null, 2)}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get Resource Pools:', error)
      throw error
    }
  }
}

export default vSphereClient
