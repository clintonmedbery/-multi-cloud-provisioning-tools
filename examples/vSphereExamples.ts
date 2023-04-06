import vSphereClient from '../src/clients/vSphereClient'
import { NetworkType } from '../src/models/vSphereModels'

async function main() {
  const host = 'your-vsphere-host'
  const username = 'your-username'
  const password = 'your-password'

  const client = new vSphereClient(host, username, password)
  await client.authenticate()

  // Fetch VMs
  const allVMs = await client.getVMs()
  console.log('All Virtual Machines:', allVMs)
  const filteredVMs = await client.getVMs({ names: ['vm1', 'vm2'] })
  console.log('Filtered Virtual Machines:', filteredVMs)

  // Fetch Clusters
  const allClusters = await client.getClusters()
  console.log('All Clusters:', allClusters)
  const filteredClusters = await client.getClusters({
    clusters: ['cluster1-id'],
  })
  console.log('Filtered Clusters:', filteredClusters)

  // Fetch Datacenters
  const allDatacenters = await client.getDataCenters()
  console.log('All Datacenters:', allDatacenters)
  const filteredDatacenters = await client.getDataCenters({ names: ['dc1-id'] })
  console.log('Filtered Datacenters:', filteredDatacenters)

  // Fetch Datastores
  const allDatastores = await client.getDatastores()
  console.log('All Datastores:', allDatastores)
  const filteredDatastores = await client.getDatastores({ types: ['VMFS'] })
  console.log('Filtered Datastores:', filteredDatastores)

  // Fetch Folders
  const allFolders = await client.getFolders()
  console.log('All Folders:', allFolders)
  const filteredFolders = await client.getFolders({ folders: ['folder-name'] })
  console.log('Filtered Folders:', filteredFolders)

  // Fetch Deployments
  const allDeployments = await client.getDeployments()
  console.log('All Deployments:', allDeployments)

  // Fetch Hosts
  const allHosts = await client.getHosts()
  console.log('All Hosts:', allHosts)
  const filteredHosts = await client.getHosts({ datacenters: ['center-name'] })
  console.log('Filtered Hosts:', filteredHosts)

  // Fetch Networks
  const allNetworks = await client.getNetworks()
  console.log('All Networks:', allNetworks)
  const filteredNetworks = await client.getNetworks({
    types: [NetworkType.DISTRIBUTED_PORTGROUP],
  })
  console.log('Filtered Networks:', filteredNetworks)

  // Fetch Resource Pools
  const allResourcePools = await client.getResourcePools()
  console.log('All Resource Pools:', allResourcePools)
  const filteredResourcePools = await client.getResourcePools({
    datacenters: ['dat-center-name'],
  })
  console.log('Filtered Resource Pools:', filteredResourcePools)
}

main().catch(console.error)
