const moment = require('moment');
const es = require('elasticsearch');
const _ = require('lodash');

const index = 'watcher_aggs_test-' + moment().format('MM-DD-YYYY');
const type = 'animal';
const host = 'sb.local:9200';
const repeatInterval = 5000;

const client = new es.Client({host});

function createDoc() {
  const animals = ['cat', 'dog', 'monkey', 'dragon', 'rabbit'];
  return {
    random: _.random(0, 10),
    animal: animals[_.random(0, animals.length-1)],
    '@timestamp': new Date(),
  };
}

(async () => {
  try {
    await client.indices.create({index});
  } catch (err) {
    console.log(`FAIL to create index: ${err.message}`);
  }

  setInterval(async () => {
    const body = createDoc();
    try {
      await client.index({index, type, body});
      console.log('SUCCESS, created doc: ' + JSON.stringify(body, null, 2));
    } catch (err) {
      console.log(`FAIL to index a doc: ${err.message}`);
    }
  }, repeatInterval);
})();
