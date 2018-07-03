const r = require('rethinkdbdash')();

module.exports = async (data) => {
  const all = await r.db('facemash2').table('data').run();
  for (let i in all) {
    if (all.hasOwnProperty(i)) {
      const filtered = await r.db('facemash2').table('data').filter({name: all[i].name, removed: false}).run();
      if (!filtered.length === 1) {
        console.log('Dupe found: ' + all[i].name)
      }
    }
  }
  r.getPoolMaster().drain();
};

module.exports();
