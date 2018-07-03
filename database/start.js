const r = require('rethinkdbdash')();

module.exports = (cb) => {
    r.dbList().run().then((data) => {
        if (!data.includes('facemash2')) {
            r.dbCreate('facemash2').run().then(() => {
                r.db('facemash2').tableCreate('data').run().then(() => {
                    r.db('facemash2').tableCreate('battlehistory').run().then(() => {
                        r.db('facemash2').tableCreate('backup').run().then(() => {
                            cb(true);
                        })
                    })
                })
            })
        } else {
            cb(false)
        }
    })
};
