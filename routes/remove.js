const r = require('rethinkdbdash')();

async function routes(fastify) {
    fastify.delete('/remove/:id', {}, async (req, reply) => {
        const entry = await r.db('facemash2').table('data').get(req.params.id).run();
        await r.db('facemash2').table('backup').insert(entry).run();
        reply.send(await r.db('facemash2').table('data').get(req.params.id).delete().run());
    });
}

module.exports = routes;
