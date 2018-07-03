const r = require('rethinkdbdash')();
const get = require('lodash.get');

module.exports = async (similarTo) => {
  const currentImageURL = await r.db('facemash2').table('data').get(similarTo).run();
  return await checkImage(currentImageURL.elo, 200, currentImageURL)
};

async function checkImage(elo, range, current) {
  if(!range) range = 200;
  let result = await r.db('facemash2').table('data').filter(r.row("elo").gt(elo - range).and(r.row('elo').lt(elo + range))).filter({removed: false, waiting: false}).withFields(['id', 'url']).run();
  result = removeCurrentFromArray(result, current.url);

  const random = randomFromArray(result);

  if(random && get(random, 'url') !== current.url){
    return random
  }else {
    console.log('Extending Range to ' + (range + 50));
    return await checkImage(elo, range + 50, current);
  }
}

function removeCurrentFromArray(array, current) {
  let result = [];
  for(let i in array){
    if(array[i].url !== current) result.push(array[i])
  }
  return result
}

function randomFromArray(items) {
  return items[Math.floor(Math.random()*items.length)];
}
