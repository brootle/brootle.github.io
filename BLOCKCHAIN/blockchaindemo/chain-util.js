// import ec class for cryptography
const EC = require('elliptic').ec;
// import module that creates ID, v1 generates id bases on timestamp
const uuidV1 = require('uuid/v1');  
const ec = new EC('secp256k1');

const SHA256 = require('crypto-js/sha256');
// Secure Hash Algorithm 256 bits for the hash

class ChainUtil {

    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash) {
        // 1st we convert from hex back to key 
        // and after that we verify signature using ec function         
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }    

}

// export this so it can be used somewhere else
module.exports = ChainUtil;