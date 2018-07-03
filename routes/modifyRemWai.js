const r = require('rethinkdbdash')();

async function routes(fastify) {
    fastify.patch('/m/:action/:bool/:id', {}, async (req, reply) => {
        const p = req.params;
        reply.send(await r.db('facemash2').table('data').get(p.id).update(JSON.parse(`{"${p.action}":${p.bool}}`)).run());
    });
}

module.exports = routes;
