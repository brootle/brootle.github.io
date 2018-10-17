const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');

class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
            Public Key  :   ${this.publicKey.toString()}
            Balance     :   ${this.balance}
        `;
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, blockchain, transactionPool){

        this.balance = this.calculateBalance(blockchain);


        if(amount > this.balance){
            console.log(`Amount: ${amount} more than current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);
        
        if(transaction){
            transaction.update(this, recipient, amount);
        }else{
            transaction = Transaction.newTransaction(this, recipient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    calculateBalance(blockchain){
        let balance = this.balance;
        let transactions = [];

        // get all transactions
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction);
        }));

        // get transactions relevant to this wallet
        const walletInputTransactions = transactions.filter(transaction => transaction.input.address === this.publicKey);

        // get the latest transaction and first check if there are any transaction
        let startTime = 0;

        if(walletInputTransactions.length > 0){
            const recentInputTransaction = walletInputTransactions.reduce(
                (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
            );

            balance = recentInputTransaction.outputs.find(output => output.address === this.publicKey).amount;
            startTime = recentInputTransaction.input.timestamp;
        }

        transactions.forEach(transaction => {
            if(transaction.input.timestamp > startTime){
                transaction.outputs.find(output => {
                    if(output.address === this.publicKey){
                        balance+=output.amount;
                    }
                });
            }
        });

        return balance;
    }

    static blockchainWallet(){
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }

}

// export this so it can be used somewhere else
module.exports = Wallet;