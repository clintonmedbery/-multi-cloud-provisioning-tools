# Welcome!

The aim of this library is to provide you with tools to help provision clusters using multiple infrastructure providers.

Right now the library supports vSphere and Azure.

# Examples

### Azure

```
 const subscriptionId = 'YOUR_SUBSCRIPTION_ID';
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const tenantId = 'YOUR_TENANT_ID';

  const client = new AzureClient(subscriptionId);

  // Authenticate with a client secret
  await client.authenticate(clientId, clientSecret, tenantId);

  // List all locations
  const locations = await client.getLocations();
  console.log('Locations:', locations);

  // List all resource SKUs
  const allSkus = await client.getResourceSkus();
  console.log('Resource SKUs:', allSkus);

  // List all resource SKUs in a specific location
  const location = 'eastus';
  const locationSkus = await client.getResourceSkus(location);
  console.log(`Resource SKUs in ${location}:`, locationSkus);

  // List all virtual machine sizes in a specific location
  const vmSizes = await client.getVirtualMachineSizes(location);
  console.log(`Virtual machine sizes in ${location}:`, vmSizes);

  // List all resource SKUs for a specific resource type
  const resourceType = 'virtualMachines';
  const typeSkus = await client.getResourceSkus(undefined, resourceType);
  console.log(`Resource SKUs for ${resourceType}:`, typeSkus);

  // List all resource SKUs for a specific virtual machine size
  const vmSize = 'Standard_DS2_v2';
  const vmSkus = await client.getResourceSkus(undefined, undefined, vmSize);
  console.log(`Resource SKUs for ${vmSize}:`, vmSkus);

  // List all resource SKUs for a specific location, resource type, and virtual machine size
  const specificSkus = await client.getResourceSkus(
    location,
    resourceType,
    vmSize
  );
  console.log(
    `Resource SKUs for ${location}, ${resourceType}, and ${vmSize}:`,
    specificSkus
  );
```

### vSphere

```
 const host = 'your-vsphere-host';
  const username = 'your-username';
  const password = 'your-password';

  const client = new vSphereClient(host, username, password, false);
  await client.authenticate();

  // Fetch VMs
  const allVMs = await client.getVMs();
  console.log('All Virtual Machines:', allVMs);
  const filteredVMs = await client.getVMs({ names: ['vm1', 'vm2'] });
  console.log('Filtered Virtual Machines:', filteredVMs);

  // Fetch Clusters
  const allClusters = await client.getClusters();
  console.log('All Clusters:', allClusters);
  const filteredClusters = await client.getClusters({
    clusters: ['cluster1-id'],
  });
  console.log('Filtered Clusters:', filteredClusters);

  // Fetch Datacenters
  const allDatacenters = await client.getDataCenters();
  console.log('All Datacenters:', allDatacenters);
  const filteredDatacenters = await client.getDataCenters({
    names: ['dc1-id'],
  });
  console.log('Filtered Datacenters:', filteredDatacenters);

  // Fetch Datastores
  const allDatastores = await client.getDatastores();
  console.log('All Datastores:', allDatastores);
  const filteredDatastores = await client.getDatastores({ types: ['VMFS'] });
  console.log('Filtered Datastores:', filteredDatastores);

  // Fetch Folders
  const allFolders = await client.getFolders();
  console.log('All Folders:', allFolders);
  const filteredFolders = await client.getFolders({ folders: ['folder-name'] });
  console.log('Filtered Folders:', filteredFolders);

  // Fetch Deployments
  const allDeployments = await client.getDeployments();
  console.log('All Deployments:', allDeployments);

  // Fetch Hosts
  const allHosts = await client.getHosts();
  console.log('All Hosts:', allHosts);
  const filteredHosts = await client.getHosts({ datacenters: ['center-name'] });
  console.log('Filtered Hosts:', filteredHosts);

  // Fetch Networks
  const allNetworks = await client.getNetworks();
  console.log('All Networks:', allNetworks);
  const filteredNetworks = await client.getNetworks({
    types: [NetworkType.DISTRIBUTED_PORTGROUP],
  });
  console.log('Filtered Networks:', filteredNetworks);

  // Fetch Resource Pools
  const allResourcePools = await client.getResourcePools();
  console.log('All Resource Pools:', allResourcePools);
  const filteredResourcePools = await client.getResourcePools({
    datacenters: ['dat-center-name'],
  });
  console.log('Filtered Resource Pools:', filteredResourcePools);
```

# Built with Rollup Typescript Boilerplate

https://github.com/xg4/rollup-typescript-boilerplate

## LICENSE

MIT
