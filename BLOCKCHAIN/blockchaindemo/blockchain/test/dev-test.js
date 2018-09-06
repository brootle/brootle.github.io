// testing wallet key pair creation
const Wallet = require('../../wallet');
const wallet = new Wallet();
console.log(wallet.toString());


// testing how difficulty changes when we are adding new blocks to the chain

// const Blockchain = require('../../blockchain');

// const blockchain = new Blockchain();

// for(let i=0; i<10; i++){
//     console.log(blockchain.addBlock(`Block: ${i}`).toString());
// }

//////////////////////////////////////////////////////////////////////////////



// we were testing some functionality here before #30 in README.md

// const Block = require('../Block.js');

// console.log(Block.genesis().toString());

// // testing creation of new block
// const block = new Block(Date.now(), 'lasthash', 'hash', 'data');
// console.log(block.toString());

// // attach block to blockchain, we attach new block to genesis block
// const newBlock = Block.mineBlock(Block.genesis(), 'some data');
// console.log(newBlock.toString());

////////////////////////////////////////////////////////////////////////