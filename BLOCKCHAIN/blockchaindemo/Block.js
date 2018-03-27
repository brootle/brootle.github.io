const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lasthash, hash, data){
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
    }

    // The toString() method returns a string representing the object.
    // use substring to limit the number to 10 symbols
    toString(){
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lasthash.substring(0,10)}
            Hash:      ${this.hash.substring(0,10)}
            Data:      ${this.data}
        `;
    }

    // Static method calls are made directly on the class and are not callable on instances 
    // of the class. Static methods are often used to create utility functions.
    // here we make 1st block also called genesis block
    // 'this' is related to current Class
    static genesis(){
        return new this('Genesis time','-----','nexthash',[]); 
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data); 
    }

    // we hash entire block and convert it into string
    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

// export this so it can be used somewhere else
module.exports = Block;