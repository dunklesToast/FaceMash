const r = require('rethinkdbdash')();

async function routes(fastify) {
    fastify.post('/update/:id', {}, async (req, reply) => {
        reply.send(await r.db('facemash2').table('data').get(req.params.id).update({url: req.body.url, removed: false}));
    });
}

module.exports = routes;
