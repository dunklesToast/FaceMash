const fs = require('fs');

async function load() {
    await r.db('facemash2').table('data').insert(JSON.parse(fs.readFileSync('./data.json.json').toString())).run();
}

load();
