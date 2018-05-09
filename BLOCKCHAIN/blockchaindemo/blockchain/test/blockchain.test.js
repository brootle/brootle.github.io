const Blockchain = require('../index');
const Block = require('../Block.js');

describe('Blockchain', ()=>{

    let blockchain, another_blockchain;

    beforeEach(()=>{
        blockchain = new Blockchain();
        another_blockchain = new Blockchain();
    });

    it('starts with genesis block', ()=>{
        // when we create new blockchain
        // the 1st block should be genesis block
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block', ()=>{
        // make sure new block with data is added correctly
        const data = "hello";
        blockchain.addBlock(data);
        // so we check last block data
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });    

    it('validates a chain', ()=>{
        another_blockchain.addBlock("some block data");
        // here we check that chain has same genesis block and that the chain is consistent
        expect(blockchain.isValidChain(another_blockchain.chain)).toBe(true);
    })

    it('invalidates a chain with corrupt genesis block', ()=>{
        // we put some data in the genesis block
        another_blockchain.chain[0] = "bad data";
        // here we check that chain has same genesis block and that the chain is consistent
        expect(blockchain.isValidChain(another_blockchain.chain)).toBe(false);
    })    

    it('invalidates a chain some corrupt block', ()=>{
        // add a block with data
        another_blockchain.addBlock("some block data");
        // change this data to something else
        another_blockchain.chain[1] = "corrupted data";
        // here we check that chain has same genesis block and that the chain is consistent
        expect(blockchain.isValidChain(another_blockchain.chain)).toBe(false);
    })       

    it('replaces the chain with a valid chain', ()=>{
        another_blockchain.addBlock("some block data");
        blockchain.replaceChain(another_blockchain.chain);

        expect(blockchain).toEqual(another_blockchain);
    })      

    it('does not replace a chain with a shorter or same lenght chain', ()=>{
        blockchain.addBlock("some block data");
        blockchain.replaceChain(another_blockchain.chain);
        
        expect(blockchain).not.toEqual(another_blockchain);
    })       

    it('generates a hash that matches the difficulty', ()=>{

    })       
    

});