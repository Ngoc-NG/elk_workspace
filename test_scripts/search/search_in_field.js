const es = require('elasticsearch');

const INDEX = 'chicago_crimes';
const TYPE = 'logs';
const HOST = 'localhost:9200';
const LOG = 'trace';

const client = new es.Client({
  host: HOST,
  log: LOG
});

client.search({
  index: INDEX,
  q: 'Primary_Type:assault'
}).then(resp => {
  console.log(JSON.stringify(resp, null, 2));
}).catch(err => {
  console.error(JSON.stringify(err, null, 2));
});
