import { DataProvider, fetchUtils, PaginationPayload } from "react-admin";
import { stringify } from "query-string";

const apiUrl = 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100014/records';
const httpClient = fetchUtils.fetchJson;

// Since all datapoints are returned, we need to filter out the latest datapoint for each location

const getLatestDataPoints = (records: any[], locationKey: string, timestampKey: string) => {
  const latestData = new Map();

  records.forEach(record => {
    const location = record[locationKey];
    const timestamp = new Date(record[timestampKey]);
  
    if(!latestData.has(location) || latestData.get(location).timestamp < timestamp) {
      latestData.set(location, {...record, timestamp});
    }
  });
  return Array.from(latestData.values());
};

// Dataprovider needs more functions, but these are sufficient for us (No create, update, delete)

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const response = await fetchUtils.fetchJson(`${apiUrl}?order_by=published%20desc&limit=100`);
    const data = getLatestDataPoints(response.json.results, 'id', 'published');
    return { 
      data: data,
      total: data.length
     }
  },

  getOne: async (resource, params) => {
    const response = await httpClient(`${apiUrl}/?where=id%20%3D%20"${params.id}"&order_by=published%20desc&limit=1`);
    console.log(response.json.results[0]);
    return { data: response.json.results[0] };
  },
};

export default dataProvider;