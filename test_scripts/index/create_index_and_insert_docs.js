'use strict';

const elasticsearch = require('elasticsearch');
const DOCUMENTS = require('./datasets/documents.json');

const ES_INDEX_NAME = 'spaceship_project';
const ES_PORT = 9200;
const ES_HOST = 'localhost';
const LOG_NAME = 'trace';
const DELETE_INDEX = true;

const client = new elasticsearch.Client({
  host: `${ES_HOST}:${ES_PORT}`,
  log: LOG_NAME
});

if (DELETE_INDEX) {
  client.indices.delete({
    index: ES_INDEX_NAME,
    ignore: [404]
  }).then(() => {

    Promise.all([createIndex(client)]).then(() => {
      processDocuments(client, DOCUMENTS);
    });

  }, (error) => {
    console.log(`DELETE INDEX: ${error}`);
  });
} else {
  processDocuments(client, DOCUMENTS);
}

function createIndex(client) {
  client.indices.create({
    index: ES_INDEX_NAME,
  }).then((response) => {
    console.log(`CREATE INDEX RESPONSE: ${response}`);
  }, (error) => {
    console.log(`CREATE INDEX: ${error}`);
  });
}

function indexDoc(client, doc, type) {
  client.index({
    index: ES_INDEX_NAME,
    type: type,
    id: doc.id,
    body: doc
  }).then((response) => {
    console.log(`INDEX DOC RESPONSE: ${response}`);
  }, (error) => {
    console.log(`INDEX DOC: ${error}`);
  });
}

function processDocuments(client, docs) {
  for (const i in docs.spaceship_parts) {
    if (docs.spaceship_parts.hasOwnProperty(i)) {
      indexDoc(client, JSON.stringify(docs.spaceship_parts[i]), 'spaceship_parts');
    }
  }
  for (const i in docs.spaceship_service) {
    if (docs.spaceship_service.hasOwnProperty(i)) {
      indexDoc(client, JSON.stringify(docs.spaceship_service[i]), 'spaceship_service');
    }
  }
}

