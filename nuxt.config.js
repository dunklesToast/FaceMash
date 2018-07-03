module.exports = {
    dev: (process.env.NODE_ENV !== 'production'),
    head: {
        title: 'facemash - compare your friends images!',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'facemash is a simple webpage where you can compare instagram images and like or dislike them. it is pretty much the same as in the movie "The Social Network".'
            },
            {
                name: 'copyright',
                content: "Copyright 2018 - dunklesToast"
            },
            {
                name: 'keywords',
                content: "facemash, images, instagram, comparison, turing effect, the social network, hot or not"
            },
            {
                name: 'robots',
                content: 'index, follow'
            },
            {
                name: 'subject',
                content: 'facemash is about comparing images from instagram users'
            },
            {
                name: 'language',
                content: 'DE'
            },
            {
                name: 'author',
                content: 'dunklesToast'
            },
            {
                name: 'owner',
                content: 'dunklesToast'
            },
            {
                name: 'pagename',
                content: 'facemash - compare images'
            },
            {
                name: 'category',
                content: 'entertainment'
            },
            {
                name: 'HandhelpFriendly',
                content: 'True'
            },
            {
                name: 'MobileOptimized',
                content: '320'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {
                src: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                type: "text/javascript"
            },
            {
                src: "//https://www.googletagmanager.com/gtag/js?id=UA-109492702-2",
                type: "text/javascript"
            },
            {
                src: "/ads.js",
                type: "text/javascript"
            }

        ],
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: 'yellow'},
    plugins: ['~/plugins/meta.js'],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
};
