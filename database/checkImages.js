const r = require('rethinkdbdash')();
const axios = require('axios');
const get = require('lodash.get');

module.exports = async (data) => {
  const all = await r.db('facemash2').table('data').run();
  for (let i in all) {
    try {
      await axios.get(all[i].url);
    }catch (e) {
      if(get(e, 'response.status') === 403){
        await r.db('facemash2').table('data').get(all[i].id).update({removed: true}).run();
        console.log('Image from ' + all[i].name + ' was removed :(');
      }else {
          await r.db('facemash2').table('data').get(all[i].id).update({removed: true}).run();
          console.log('Image from ' + all[i].name + ' was removed :(  But had error code ' + e.response.code);
      }
    }
  }
  r.getPoolMaster().drain()
};

module.exports();
