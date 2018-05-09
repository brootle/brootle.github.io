const Block = require('../Block.js');

console.log(Block.genesis().toString());

// testing creation of new block
const block = new Block(Date.now(), 'lasthash', 'hash', 'data');
console.log(block.toString());

// attach block to blockchain, we attach new block to genesis block
const newBlock = Block.mineBlock(Block.genesis(), 'some data');
console.log(newBlock.toString());