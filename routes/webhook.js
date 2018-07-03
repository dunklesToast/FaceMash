const r = require('rethinkdbdash')();
const sha512 = require('js-sha512');
const os = require('os');

async function routes(fastify) {
    fastify.post('/webhook', {}, async (req, reply) => {
        console.log(req.query.action);
        if (req.query.action === "addFromInstaPix") {
            const secure = sha512.hmac(os.arch() + os.release(), JSON.stringify(req.body.data));
            console.log(secure);
            if(secure === req.body.sha){
                console.log('access granted');
                r.db('facemash2').table('data').insert({
                    url: req.body.data.url,
                    name: req.body.data.name,
                    removed: false,
                    waiting: true,
                    elo: 1000
                }).run();
                reply.status(201).send();
            }else {
                reply.status(403).send();
            }
        } else {
            reply.status(404).send();
        }
    });
}

module.exports = routes;
