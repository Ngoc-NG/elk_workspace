const es = require('elasticsearch');

const INDEX = 'chicago_crimes';
const TYPE = 'logs';
const HOST = 'localhost:9200';
const LOG = 'trace';

const client = new es.Client({
  host: HOST,
  log: LOG
});

const BODY = {
  aggs: {
    crime_type: {
      adjacency_matrix: {
        filters: {
          grpA: {
            terms: {
              Primary_Type: ['theft']
            }
          },
          grpB: {
            terms: {
              Primary_Type: ['assault']
            }
          }
        }
      }
    }
  }
};

client.search({
  index: INDEX,
  body: BODY
}).then(resp => {
  console.log(JSON.stringify(resp, null, 2));
}).catch(err => {
  console.error(JSON.stringify(err, null, 2));
});
