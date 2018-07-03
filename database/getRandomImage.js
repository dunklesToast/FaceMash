const r = require('rethinkdbdash')();

module.exports = async () => {
  return (await r.db('facemash2').table('data').filter({removed: false, waiting: false}).withFields(['id', 'url']).sample(1).run())[0];
};
