import VSphereClient from '../VSphereClient';
import fetch from 'node-fetch';
import https from 'https';
import {
  mockClusters,
  mockDataCenters,
  mockDatastores,
  mockDeployments,
  mockFolders,
  mockHosts,
  mockNetworks,
  mockResourcePools,
  mockVMs,
} from './VSphereClient.fixtures';
import {
  FolderType,
  GetClustersParams,
  GetDataCentersParams,
  GetDatastoresParams,
  GetFoldersParams,
  GetHostsParams,
  GetNetworksParams,
  GetResourcePoolsParams,
  GetVMsParams,
  HostConnectionState,
  NetworkType,
} from '../../models/VSphereModels';

jest.mock('node-fetch', () => jest.fn());
jest.mock('https', () => ({ Agent: jest.fn() }));

const { Response } = jest.requireActual('node-fetch');

describe('VSphereClient', () => {
  const host = 'example.com';
  const username = 'test';
  const password = 'test';
  const rejectUnauthorized = false;
  let client: VSphereClient;

  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
    client = new VSphereClient(host, username, password, rejectUnauthorized);
  });

  it('creates an instance correctly', () => {
    expect(client).toBeInstanceOf(VSphereClient);
    expect(client['baseUrl']).toBe(`https://${host}`);
    expect(client['headers']).toEqual({ 'Content-Type': 'application/json' });
    expect(https.Agent).toHaveBeenCalledWith({ rejectUnauthorized });
  });

  describe('authenticate', () => {
    it('sends a request and sets the session id', async () => {
      const mockSessionId = 'mock-session-id';
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockSessionId), { status: 200 })
      );

      await client.authenticate();

      expect(fetch).toHaveBeenCalledWith(`${client['baseUrl']}/api/session`, {
        method: 'POST',
        headers: {
          ...client['headers'],
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString('base64')}`,
        },
        agent: client['httpsAgent'],
      });
      expect(client['sessionId']).toBe(mockSessionId);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to authenticate';
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response('', { status: 401, statusText: errorMessage })
      );

      await expect(client.authenticate()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(`${client['baseUrl']}/api/session`, {
        method: 'POST',
        headers: {
          ...client['headers'],
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString('base64')}`,
        },
        agent: client['httpsAgent'],
      });
      expect(client['sessionId']).toBeUndefined();
    });
  });

  describe('getVMs', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all VMs when no parameters are given', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockVMs), { status: 200 })
      );

      const vms = await client.getVMs();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/vm`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(vms).toEqual(mockVMs);
    });

    it('fetches VMs with given parameters', async () => {
      const params: GetVMsParams = {
        clusters: ['cluster-1', 'cluster-2'],
        vms: ['vm-100', 'vm-200'],
      };
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockVMs), { status: 200 })
      );

      const vms = await client.getVMs(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/vm?clusters=cluster-1,cluster-2&vms=vm-100,vm-200`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(vms).toEqual(mockVMs);
    });
  });

  describe('getClusters', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all clusters when no parameters are given', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockClusters), { status: 200 })
      );

      const clusters = await client.getClusters();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/cluster`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(clusters).toEqual(mockClusters);
    });

    it('fetches clusters with given parameters', async () => {
      const params: GetClustersParams = {
        clusters: ['cluster-100', 'cluster-200'],
        names: ['Test Cluster 1', 'Test Cluster 2'],
      };
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockClusters), { status: 200 })
      );

      const clusters = await client.getClusters(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/cluster?clusters=cluster-100,cluster-200&names=Test%20Cluster%201,Test%20Cluster%202`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(clusters).toEqual(mockClusters);
    });
  });

  describe('getDataCenters', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all data centers when no parameters are given', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDataCenters), { status: 200 })
      );

      const dataCenters = await client.getDataCenters();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datacenter`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(dataCenters).toEqual(mockDataCenters);
    });

    it('fetches data centers with given parameters', async () => {
      const params: GetDataCentersParams = {
        datacenters: ['dc1', 'dc2'],
        names: ['Data Center 1', 'Data Center 2'],
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDataCenters), { status: 200 })
      );

      const dataCenters = await client.getDataCenters(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datacenter?datacenters=dc1,dc2&names=Data%20Center%201,Data%20Center%202`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(dataCenters).toEqual(mockDataCenters);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get DataCenters';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response('', { status: 400, statusText: errorMessage })
      );

      await expect(client.getDataCenters()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datacenter`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getDatastores', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all datastores when no parameters are given', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDatastores), { status: 200 })
      );

      const datastores = await client.getDatastores();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datastore`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(datastores).toEqual(mockDatastores);
    });

    it('fetches datastores with datacenter parameter', async () => {
      const params: GetDatastoresParams = {
        datacenters: ['dc1', 'dc2'],
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDatastores), { status: 200 })
      );

      const datastores = await client.getDatastores(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datastore?datacenters=dc1,dc2`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(datastores).toEqual(mockDatastores);
    });

    it('fetches datastores with multiple parameters', async () => {
      const params: GetDatastoresParams = {
        datacenters: ['dc1', 'dc2'],
        datastores: ['ds1', 'ds2'],
        folders: ['folder1', 'folder2'],
        names: ['Datastore 1', 'Datastore 2'],
        types: ['NFS41', 'NFS'],
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDatastores), { status: 200 })
      );

      const datastores = await client.getDatastores(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datastore?datacenters=dc1,dc2&datastores=ds1,ds2&folders=folder1,folder2&names=Datastore%201,Datastore%202&types=NFS41,NFS`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(datastores).toEqual(mockDatastores);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Datastores';
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getDatastores()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/datastore`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getFolders', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all folders when no parameters are given', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockFolders), { status: 200 })
      );

      const folders = await client.getFolders();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/folder`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(folders).toEqual(mockFolders);
    });

    it('fetches folders with given parameters', async () => {
      const params: GetFoldersParams = {
        datacenters: ['dc1', 'dc2'],
        folders: ['folder-100', 'folder-200'],
        names: ['Folder 1', 'Folder 2'],
        parent_folders: ['parent-folder-1', 'parent-folder-2'],
        type: FolderType.HOST,
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockFolders), { status: 200 })
      );

      const folders = await client.getFolders(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/folder?datacenters=dc1,dc2&folders=folder-100,folder-200&names=Folder%201,Folder%202&parent_folders=parent-folder-1,parent-folder-2&type=HOST`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(folders).toEqual(mockFolders);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Folders';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getFolders()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/folder`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getDeployments', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all deployments', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockDeployments), { status: 200 })
      );

      const deployments = await client.getDeployments();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/deployment`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(deployments).toEqual(mockDeployments);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Deployment Information';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getDeployments()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/deployment`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getHosts', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all hosts without parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockHosts), { status: 200 })
      );

      const hosts = await client.getHosts();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/host`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(hosts).toEqual(mockHosts);
    });

    it('fetches hosts with parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockHosts), { status: 200 })
      );
      const params: GetHostsParams = {
        clusters: ['cluster-1'],
        connection_states: [HostConnectionState.CONNECTED],
        datacenters: ['datacenter-1'],
        folders: ['folder-1'],
        hosts: ['host-1'],
        names: ['Host 1'],
        standalone: true,
      };

      const hosts = await client.getHosts(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/host?clusters=cluster-1&connection_states=CONNECTED&datacenters=datacenter-1&folders=folder-1&hosts=host-1&names=Host%201&standalone=true`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(hosts).toEqual(mockHosts);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Hosts';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getHosts()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/host`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getNetworks', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all networks without parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockNetworks), { status: 200 })
      );

      const networks = await client.getNetworks();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/network`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(networks).toEqual(mockNetworks);
    });

    it('fetches networks with parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockNetworks), { status: 200 })
      );
      const params: GetNetworksParams = {
        datacenters: ['datacenter-1'],
        folders: ['group-n1'],
        names: ['network-1'],
        networks: ['network-1'],
        types: [NetworkType.STANDARD_PORTGROUP],
      };

      const networks = await client.getNetworks(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/network?datacenters=datacenter-1&folders=group-n1&names=network-1&networks=network-1&types=STANDARD_PORTGROUP`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(networks).toEqual(mockNetworks);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Networks';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getNetworks()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/network`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });

  describe('getResourcePools', () => {
    beforeEach(() => {
      client['authenticateOrThrow'] = jest.fn();
    });

    it('fetches all resource pools without parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockResourcePools), { status: 200 })
      );

      const resourcePools = await client.getResourcePools();

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/resource-pool`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(resourcePools).toEqual(mockResourcePools);
    });

    it('fetches resource pools with parameters', async () => {
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify(mockResourcePools), { status: 200 })
      );
      const params: GetResourcePoolsParams = {
        clusters: ['cluster-1'],
        datacenters: ['datacenter-1'],
        hosts: ['host-1'],
        names: ['Resource Pool 1'],
        parent_resource_pools: ['parent-resource-pool-1'],
        resource_pools: ['resource-pool-1'],
      };

      const resourcePools = await client.getResourcePools(params);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/resource-pool?clusters=cluster-1&datacenters=datacenter-1&hosts=host-1&names=Resource%20Pool%201&parent_resource_pools=parent-resource-pool-1&resource_pools=resource-pool-1`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
      expect(resourcePools).toEqual(mockResourcePools);
    });

    it('throws an error if the request fails', async () => {
      const errorMessage = 'Failed to get Resource Pools';

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
        new Response(JSON.stringify({ message: errorMessage }), { status: 500 })
      );

      await expect(client.getResourcePools()).rejects.toThrow(errorMessage);

      expect(fetch).toHaveBeenCalledWith(
        `${client['baseUrl']}/api/vcenter/resource-pool`,
        {
          method: 'GET',
          headers: { 'vmware-api-session-id': client['sessionId'] ?? '' },
          agent: client['httpsAgent'],
        }
      );
    });
  });
});
