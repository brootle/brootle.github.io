const assert = require('assert');

const Block = require('../Block.js');

beforeEach( async () => {
    // we can set some vairables here that will be used before each test
});


describe('Blockchain', () => {

    it('Can create an instance of a Block', () => {
        const block = new Block('timestamp', 'lasthash', 'hash', 'data');
        //console.log(block.toString());
        assert.equal(block.timestamp, 'timestamp');
        assert.equal(block.lasthash, 'lasthash');
        assert.equal(block.hash, 'hash');
        assert.equal(block.data, 'data');
    });     

    it('Genesis block created', () => {
        assert.ok(Block.genesis());
    });       

    it('New block attached to the chain', () => {
        // create some block
        const oldBlock = new Block(Date.now(), 'lasthash', 'hash', 'data');
        // attach block to blockchain
        const newBlock = Block.mineBlock(oldBlock, 'some data');

        // console.log(newBlock);

        assert.ok(newBlock.timestamp);
        assert.equal(newBlock.lasthash, 'hash');
        assert.ok(newBlock.hash);
        assert.equal(newBlock.data, 'some data');
    });       

});