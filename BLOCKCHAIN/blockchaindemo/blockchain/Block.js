const SHA256 = require('crypto-js/sha256');
// Secure Hash Algorithm 256 bits for the hash

const { DIFFICULTY } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    // The toString() method returns a string representing the object.
    // use substring to limit the number to 10 symbols
    toString(){
        return `Block - 
            Timestamp   :   ${this.timestamp}
            Last Hash   :   ${this.lastHash.substring(0,10)}
            Hash        :   ${this.hash.substring(0,10)}
            Nonce       :   ${this.nonce}
            Data        :   ${this.data}
        `;
    }

    // Static method calls are made directly on the class and are not callable on instances 
    // of the class. Static methods are often used to create utility functions.
    // here we make 1st block also called genesis block
    // 'this' is related to current Class
    static genesis(){
        return new this('Genesis time','-----','nexthash',[], 0); 
    }

    static mineBlock(lastBlock, data){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
            // DIFFICULTY defines how many zeros we should have in a hash
            // we calculate the hash till there are 4 zeros at the start of it
        }while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce); 
    }

    // we hash entire block and convert it into string
    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    // here we hash data in the block passing block as parameter
    static blockHash(block){
        // get values from block object
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}

// export this so it can be used somewhere else
module.exports = Block;