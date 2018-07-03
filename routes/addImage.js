const insert = require('../database/insertImage');

async function routes(fastify) {
  fastify.post('/addImage', {}, async (req, reply) => {
    console.log('Adding image from: ' + req.body.name);
    insert(req.body);
    reply.send('if u read this have a great day :)')
  });
}

module.exports = routes;
