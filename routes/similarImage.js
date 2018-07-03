const similarImage = require('../database/similarImage');
const createBattle = require('../database/battleHistory').createBattle;

async function routes(fastify, options) {
  fastify.get('/similar/:id', {}, async (req, reply) => {
    const result = (await similarImage(req.params.id));
    const battleData = await createBattle({
      images: [req.params.id, result.id]
    });
    reply.send({
      url: result.url,
      buid: battleData.generated_keys[0],
      id: result.id
    });
  });
}

module.exports = routes;
