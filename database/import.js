const fs = require('fs');
const r = require('rethinkdbdash');

async function load() {
    await r.db('facemash2').table('data').insert(JSON.parse(fs.readFileSync('./data.json.json').toString())).run();
}

load();
