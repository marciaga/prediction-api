'use strict';

require('babel-core/register');

const path = require('path');
const Glue = require('glue');
const options = { relativeTo: __dirname };
const url = process.env.DB_CONNECTION;

let manifest = require('./config/manifest.json');

if (process.env.NODE_ENV === 'production') {
    let prodMongo = manifest.registrations.find(r => r.plugin.register && r.plugin.register === 'hapi-mongodb');
    prodMongo.plugin.options.url = url;
}

Glue.compose(manifest, options, (err, server) => {
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });
});
