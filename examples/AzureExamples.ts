import AzureClient from '../src/clients/AzureClient';

async function main() {
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
}

main().catch((error) => console.error('Error:', error));
