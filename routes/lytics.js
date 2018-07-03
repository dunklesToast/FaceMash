
async function routes(fastify) {
    fastify.get('/conn', {}, async (req, reply) => {
        reply.send(require('../assets/io')());
    });
}

module.exports = routes;
