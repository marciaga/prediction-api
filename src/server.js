'use strict';

require('babel-core/register');

const path = require('path');
const Glue = require('glue');
const options = { relativeTo: __dirname };

const manifest = process.env.NODE_ENV === 'production' ? require('./config/manifest.production.js') : require('./config/manifest.json');

Glue.compose(manifest, options, (err, server) => {
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });
});
