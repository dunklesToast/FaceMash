const r = require('rethinkdbdash')();

async function routes(fastify) {
    fastify.get('/removed', {}, async (req, reply) => {
        reply.send(await r.db('facemash2').table('data').filter({removed: true}));
    });
    fastify.get('/waiting', {}, async (req, reply) => {
        reply.send(await r.db('facemash2').table('data').filter({waiting: true}));
    });
}

module.exports = routes;
