const r = require('rethinkdbdash')({
  db: "facemash2"
});

module.exports = async (id) => {
  return await r.table('data').get(id).withFields(['elo']).run();
};
