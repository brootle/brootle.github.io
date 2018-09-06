const ChainUtil = require('../chain-util');

const { MINING_REWARD } = require('../config');

class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    update(senderWallet, recipient, amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

        if(amount > senderOutput.amount){
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;

        this.outputs.push({ amount, address: recipient });

        // we must make new signature as we updated transaction
        Transaction.signTransaction(this, senderWallet);

        return this;
    }

    static transactionWithOutputs(senderWallet, outputs){
        // make new instance of transaction class
        const transaction = new this();    

        transaction.outputs.push(...outputs);    

        Transaction.signTransaction(transaction, senderWallet);

        return transaction;
    }

    static newTransaction(senderWallet, recipient, amount){

        // check if sender has enough money to sender
        if(amount > senderWallet.balance){
            console.log(`Amount: ${amount} exceeds balance`);
            return;
        }

        // insert 2 objects, so use ES6 spread operator 
        // by creating an array of 2 objects pushing 
        // each object one at a time

        return Transaction.transactionWithOutputs(senderWallet, [
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }            
        ]);
    }

    static rewardTransaction(minerWallet, blockchainWallet){
        return Transaction.transactionWithOutputs(blockchainWallet, [{
            amount: MINING_REWARD, address: minerWallet.publicKey
        }]);
    }

    static signTransaction(transaction, senderWallet){
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }

    static verifyTransaction(transaction){
        // publicKey, signature, dataHash
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

// export this so it can be used somewhere else
module.exports = Transaction;