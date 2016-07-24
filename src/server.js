'use strict';

require('babel-core/register');

const path = require('path');
const Glue = require('glue');
const manifest = require('./config/manifest.json');
const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (err, server) => {
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });
});
