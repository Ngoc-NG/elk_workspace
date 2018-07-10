'use strict';

const elasticsearch = require('elasticsearch');

const settings = {
  index: 'shakespeare',
  port: 9220,
  host: 'localhost',
  log: 'trace'
};

const es = new elasticsearch.Client({
  host: `${settings.host}:${settings.port}`,
  log: settings.log
});

es.indices.getMapping({
  index: settings.index,
  ignoreUnavailable: true,
  allowNoIndices: true
}).then((data) => {
  console.log(JSON.stringify(data));
}, (error) => {
  console.log('ERROR!!!');
  console.log(error);
});
