const r = require('rethinkdbdash')({
    db: "facemash2"
});
const getElo = require('./getElo');
const io = require('../FaceMash').io;

function createBattle(data) {
    data.started = r.now();
    return r.table('battlehistory').insert(data).run();
}

async function finishBattle(data) {
    data.ended = r.now();
    return r.db('facemash2').table('battlehistory').get(data.buid).update(data).run();
}

async function battles() {
    return r.db('facemash2').table('battlehistory').run();
}

function changes() {
    r.db('facemash2').table('battlehistory').changes().run().then(feed => {
        feed.each((err, changed) => {
            console.log('change!');
            io.emit('newData', changed)
        })
    });
}

module.exports = {
    createBattle: createBattle,
    finishBattle: finishBattle,
    battles: battles
};

changes();
