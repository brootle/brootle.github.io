const ChainUtil = require('../chain-util');

const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    // The toString() method returns a string representing the object.
    // use substring to limit the number to 10 symbols
    toString(){
        return `Block - 
            Timestamp   :   ${this.timestamp}
            Last Hash   :   ${this.lastHash.substring(0,10)}
            Hash        :   ${this.hash.substring(0,10)}
            Nonce       :   ${this.nonce}
            Difficulty  :   ${this.difficulty}
            Data        :   ${this.data}
        `;
    }

    // Static method calls are made directly on the class and are not callable on instances 
    // of the class. Static methods are often used to create utility functions.
    // here we make 1st block also called genesis block
    // 'this' is related to current Class
    static genesis(){
        return new this('Genesis time','-----','nexthash',[], 0, DIFFICULTY); 
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        
        // get difficulty from last block and calculate new difficulty
        let { difficulty } = lastBlock;

        do{
            nonce++;
            timestamp = Date.now();
            
            // calculate new difficulty based on difference in timestamp value of last block and now
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);

            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
            // DIFFICULTY defines how many zeros we should have in a hash
            // we calculate the hash till there are 4 zeros at the start of it
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty); 
    }

    // we hash entire block and convert it into string
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    // here we hash data in the block passing block as parameter
    static blockHash(block){
        // get values from block object
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

// export this so it can be used somewhere else
module.exports = Block;