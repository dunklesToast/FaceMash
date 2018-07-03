const randomImage = require('../database/getRandomImage');

async function routes(fastify) {
    fastify.get('/random', {}, async (req, reply) => {
        const image = await randomImage();
        console.log()
        reply.send(image);
    });
}

module.exports = routes;
