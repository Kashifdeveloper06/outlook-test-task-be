// // Elasticsearch service
// const elasticsearch = require('../config/elasticsearch');

// const indexEmailData = async (userId, emailData) => {
//     // Index email data in Elasticsearch
//     // Implement according to your Elasticsearch setup
// };

// module.exports = { indexEmailData };



const { Client } = require('@elastic/elasticsearch-serverless');
const client = new Client({
    node: 'https://d8b4766fab2343d7b1c3df4a4324ed20.es.us-east-1.aws.elastic.cloud:443',
    auth: {
        apiKey: 'STNCT3c0OEJXZHhxZlhiTjFYLWs6WjE2RHk4X09TZ1dTc04zVC1GMF9mZw=='
    }
});

const resp = client.info();

// console.log("Response from elastisearch", resp);
/**
{
  name: 'instance-0000000000',
  cluster_name: 'd9dcd35d12fe46dfaa28ec813f65d57b',
  cluster_uuid: 'iln8jaivThSezhTkzp0Knw',
  version: {
    build_flavor: 'default',
    build_type: 'docker',
    build_hash: 'c94b4700cda13820dad5aa74fae6db185ca5c304',
    build_date: '2022-10-24T16:54:16.433628434Z',
    build_snapshot: false,
    lucene_version: '9.4.1',
    minimum_wire_compatibility_version: '7.17.0',
    minimum_index_compatibility_version: '7.0.0'
  },
  tagline: 'You Know, for Search'
}
*/


// Sample books data
const dataset = [
    { "name": "Snow Crash", "author": "Neal Stephenson", "release_date": "1992-06-01", "page_count": 470 },
    { "name": "Revelation Space", "author": "Alastair Reynolds", "release_date": "2000-03-15", "page_count": 585 },
    { "name": "1984", "author": "George Orwell", "release_date": "1985-06-01", "page_count": 328 },
    { "name": "Fahrenheit 451", "author": "Ray Bradbury", "release_date": "1953-10-15", "page_count": 227 },
    { "name": "Brave New World", "author": "Aldous Huxley", "release_date": "1932-06-01", "page_count": 268 },
    { "name": "The Handmaid's Tale", "author": "Margaret Atwood", "release_date": "1985-06-01", "page_count": 311 }
];

// Index with the bulk helper
const result = client.helpers.bulk({
    datasource: dataset,
    onDocument(doc) {
        return { index: { _index: 'my-index-name' } };
    }
});

// console.log("Response from ElastiSearch", result);
/**
{
  total: 6,
  failed: 0,
  retry: 0,
  successful: 6,
  noop: 0,
  time: 191,
  bytes: 787,
  aborted: false
}
*/

// Let's search!
// Let's search!
// Let's search!
client.search({
    index: 'my-index-name', // Use the correct index name here
    q: 'snow'
}).then(response => {
    console.log(response.hits.hits);
}).catch(error => {
    console.error('Error searching:', error);
});

