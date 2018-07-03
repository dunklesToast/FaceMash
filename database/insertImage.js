const r = require('rethinkdbdash')();

module.exports = async (data) => {

  if(data.name && data.url){
    const filtered = await r.db('facemash2').table('data').filter({name: data.name, removed: data.removed, waiting: data.waiting}).run();
    if(!filtered[0]){
      data.elo = 1000;
      return r.db('facemash2').table('data').insert(data).run();
    }else {
      console.log('Image already in there...');
    }
  }else {
    console.log("Data missing")
  }
};
