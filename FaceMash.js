console.log("This is " +  (process.env.NODE_ENV || 'dev') + 'env');

require('./database/start')(function (success) {

    console.log('Database creation was ' + (success ? 'a' : 'no') + ' success');

    const useragent = require('useragent');
    const app = require('fastify')();
    const helmet = require('fastify-helmet');
    const io = require('socket.io')(app.server);

    module.exports = {
        io: io
    };

    app.use(require('cors')());

    const nuxtConfig = require('./nuxt.config.js');
    const {Nuxt, Builder} = require('nuxt');


    app.use((req, reply, next) => {
        const ua = useragent.is(req.headers['user-agent']);
        reply.setHeader('server', 'gws');
        reply.setHeader('facemash', require('./package').version);
        if (ua.ie && parseInt(ua.version) <= 9) res.end('your browser (internet explorer ' + ua.version + ') is too old. please upgrade');
        else next();
    });


    app.register(helmet);

    app.register(require('./routes/addImage'));
    app.register(require('./routes/randomImage'));
    app.register(require('./routes/similarImage'));
    app.register(require('./routes/battleScore'));
    app.register(require('./routes/battles'));
    app.register(require('./routes/getLinkToID'));
    app.register(require('./routes/removed'));
    app.register(require('./routes/updateImage'));
    app.register(require('./routes/webhook'));
    app.register(require('./routes/modifyRemWai'));
    app.register(require('./routes/remove'));
    app.register(require('./routes/lytics'));

    const nuxt = new Nuxt(nuxtConfig);

    if (nuxtConfig.dev) {
        const builder = new Builder(nuxt);
        builder.build();
    }

    app.setNotFoundHandler((req, reply) => {
        try {
            nuxt.render(req.raw, reply.res);
        } catch (e) {
            console.error(e);
        }
    });

    app.listen(3002);
});
