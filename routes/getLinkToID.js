const r = require('rethinkdbdash')();

async function routes(fastify) {
    fastify.get('/i2l/:id', {}, async (req, reply) => {
        reply.send(await r.db('facemash2').table('data').get(req.params.id));
    });
}

module.exports = routes;
