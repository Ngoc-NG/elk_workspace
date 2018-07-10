const elasticsearch = require('elasticsearch');
const bcrypt = require('bcrypt');

const login = 'admin';
const password = 'admin';

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
            _id : "sentinl-user:3679bee0-843d-11e8-b023-81647bf52a16"
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
 