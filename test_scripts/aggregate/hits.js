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
    top_amounts: {
      terms: {
        field: 'Amount',
        size: 3
      },
      aggs: {
        top_time: {
          top_hits: {
            sort: [
              {
                Time: {
                  order: 'asc'
                }
              }
            ],
            _source: {
              includes: [ 'Amount', 'Time', 'Class']
            },
            size: 2
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
