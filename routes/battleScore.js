const processBattle = require('../database/processBattle');

async function routes(fastify) {
  fastify.post('/battleEnded', {}, async (req, reply) => {
    processBattle(req.body);
    reply.send();
  });
}

module.exports = routes;
