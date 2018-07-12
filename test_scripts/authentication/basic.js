const elasticsearch = require('elasticsearch');
const bcrypt = require('bcrypt');

const login = 'sentinl';
const password = 'sentinl';

const config = {
  host: [
    {
      host: 'localhost',
      auth: `${login}:${password}`,
      protocol: 'https',
      port: 9200
    }
  ]
};

const client = new elasticsearch.Client(config);

const index = '.kibana';
const type = 'doc';
const body = {
  query: {
    bool: {
      must : [
        {
          match : {
            _id : "sentinl-user:b37d5290-84d7-11e8-acf4-9df877c2f7e4"
          } 
        }
    ]
    }
  }
};

client.search({
  index,
  type,
  body
}).then(function (resp) {
  console.log(JSON.stringify(resp, null, 2));
}).catch(function (err) {
  console.log(JSON.stringify(err, null, 2));
});
 