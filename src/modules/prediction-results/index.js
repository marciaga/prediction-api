import Boom from 'boom';
import uuid from 'node-uuid';

const paramsWhitelist = ['limit', 'source'];
// exports.register registers the plugin with Hapi
exports.register = function(server, options, next) {
    const db = server.plugins['hapi-mongodb'].db
    const predictions = db.collection('predictionInfo');

    server.route({
        method: 'GET',
        path: '/api/v1/predictions',
        handler: function(request, reply) {
            let queryParams = request.query;
            let options = {
                sort: [[ 'date', 'desc' ]]
            };
            let queryParamsKeys = Object.keys(queryParams);
            // if there are query params, ensure they're whitelisted
            if (queryParamsKeys.length > 0) {
                let found = queryParamsKeys.find((p, i) => {
                    return p !== paramsWhitelist[i];
                });
                if (found) {
                    return reply(Boom.forbidden('Query params not allowed'));
                }
                options = Object.assign({}, options, queryParams);
            }
            // if there are no query params, we query all sources for the latest results from each
            predictions.distinct('source')
                .then((response) => {
                    // if limit is passed in as query param, it must be type cast to an int
                    options.limit = options.limit ? parseInt(options.limit) : 1;
                    // response is an array of all the sources as strings
                    response = options.source ? [options.source] : response;
                    // remove source from options object
                    delete options.source;
                    // construct an array of queries (queries return promises)
                    let queries = response.map((s) => predictions.find({ source: s }, options).toArray());
                    // when promises resolve
                    Promise.all(queries)
                        .then((responses) => {
                            // responses is an array of arrays each array containing one source's latest result
                            let res = responses.reduce((a, b) => {
                                return a.concat(b);
                            }, []);

                            return reply(res);
                        })
                        .catch((error) => {
                            console.log(error);
                            return reply(Boom.badData('Internal MongoDB Error', error));
                        });
                })
                .catch((error) => {
                    console.log(error);
                    return reply(Boom.badData('Internal MongoDB Error', error));
                });

        }
    });
    return next();
};
exports.register.attributes = {
    name: 'routes-prediction'
};
