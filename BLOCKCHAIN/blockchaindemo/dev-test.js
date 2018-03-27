const Block = require('./Block.js');

const block = new Block('timestamp', 'lasthash', 'hash', 'data');
console.log(block.toString());

console.log(Block.genesis().toString());