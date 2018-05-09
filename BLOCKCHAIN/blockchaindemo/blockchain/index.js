const Block = require('./Block.js');

class Blockchain {

    constructor(){
        // we just assign array with genesis block
        this.chain = [Block.genesis()];
    }

    // this function adds blocks to the chain
    addBlock(data){
        // find last block in the chain
        const lastBlock = this.chain[this.chain.length-1];

        // now we make new block based on last block in the chain
        const block = Block.mineBlock(lastBlock, data);

        // add new block to the chain
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        // convert to JSON and compare 1st block of the chain
        // obviously if 1st block is not same, the chain is not valid
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        // now we can go through all blocks in the chain and compare hashes
        // last hash value of current block must be equal to hash of last block
        for (let i=1; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            // and we can also check if the hash of the block equals to hashed block
            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                return false;
            }
        }


        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("the new chain is shorter than original chain");
            return;
        } else if(!this.isValidChain(newChain)){
            console.log("new chain is not valid");
            return;
        }

        // if all checks are good
        console.log("replacing old chain with new chain...")
        this.chain = newChain;
    }

}

// export this so it can be used somewhere else
module.exports = Blockchain;