const insert = require('../database/insertImage');
const lastbattles = require('../database/battleHistory').battles;

async function routes(fastify, io) {
    fastify.get('/lastBattles', {}, async (req, reply) => {
        console.log('Socket connection o.O');
        reply.send(await lastbattles());
    });
}

module.exports = routes;
