const es = require('elasticsearch');

const INDEX = 'credit_card';
const TYPE = 'logs';
const HOST = 'localhost:9200';
const LOG = 'trace';

const client = new es.Client({
  host: HOST,
  log: LOG
});

const BODY = {
  aggs: {
    amount_outlier: {
      percentiles: {
        field: 'Amount'
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
