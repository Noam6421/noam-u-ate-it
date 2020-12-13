import PgPubsub from '@graphile/pg-pubsub';
import { makePluginHook, PostGraphileOptions } from 'postgraphile';

require('dotenv').config();

const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PgOrderByRelatedPlugin = require('@graphile-contrib/pg-order-by-related');
const pluginHook = makePluginHook([PgPubsub]);

const genericOptions: PostGraphileOptions = {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    enableCors: true,
    appendPlugins: [ConnectionFilterPlugin, pluginHook, PgOrderByRelatedPlugin],
    graphileBuildOptions: {
        connectionFilterRelations: true
    },
    retryOnInitFail: true,
    bodySizeLimit: '5MB',
    ignoreRBAC: false,
    pgSettings: {
        statement_timeout: '30000'
    }
};

module.exports = {
    genericOptions
};