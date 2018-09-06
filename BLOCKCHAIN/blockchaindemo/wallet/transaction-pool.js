const Transaction = require('./transaction');

class TransactionPool {
    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        console.log('.....................................');

        console.log("UPDATE OR ADD TRANSACTION...");

        // if there is no such transaction in the pool already, transactionWithId will be undefined
        let transactionWithId = this.transactions.find(t => t.id == transaction.id);

        // if such transaction already exists in the pool we find it and replace with incoming transaction
        if(transactionWithId){
            console.log("REPLACE TRANSACTION WITH INCOMING TRANSACTION...");
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else{
            // we add this transaction if it doesn't exist yet
            console.log("PUSH TRANSACTION TO THE POOL...");
            this.transactions.push(transaction);
        }

        console.log('.....................................');
    }

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
    }

    validTransactions(){
        return this.transactions.filter(transaction =>{
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amount;
            }, 0); // 0 is initial value of total

            if(transaction.input.amount !== outputTotal){
                console.log(`Invalid transaction from ${transaction.input.address}`);
                return;
            }

            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Invalid signature from ${transaction.input.address}`);
                return;                
            }

            return transaction;
        })
    }

    clear(){
        this.transactions = [];
    }

}

module.exports = TransactionPool;