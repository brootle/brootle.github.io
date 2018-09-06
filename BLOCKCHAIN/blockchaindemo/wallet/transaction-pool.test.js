const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', ()=>{

    let transactionPool, wallet, transaction;

    beforeEach(()=>{
        transactionPool = new TransactionPool();
        wallet = new Wallet();
        // transaction = Transaction.newTransaction(wallet, 'dsf43453kl434', 30);        
        // transactionPool.updateOrAddTransaction(transaction);

        transaction = wallet.createTransaction('dsf43453kl434', 30, transactionPool);
    });

    it('add a transaction to the pool', ()=>{
        expect(transactionPool.transactions.find(t => t.id === transaction.id))
            .toEqual(transaction);
    });

    it('updates a transaction in the pool', ()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = Transaction.newTransaction(wallet, 'rklwejr435jl34', 12);

        transactionPool.updateOrAddTransaction(newTransaction);

        expect(JSON.stringify(transactionPool.transactions.find(t => t.id === newTransaction.id)))
            .not.toEqual(oldTransaction);
    });    

    it('clears transactions', ()=>{
        transactionPool.clear();
        expect(transactionPool).toEqual([]);
    });

    describe('mixing valid and corrupt transactions', () => {
        let validTransactions;

        beforeEach(()=>{
            // we already made one valid transaction before
            validTransactions = [...transactionPool.transactions];

            // now let's make transactions, half of them will be corrupted
            for(let i=0; i<6; i++){
                wallet = new Wallet();
                transaction = wallet.createTransaction('ldkfjae43ldjfal', 30, transactionPool);

                // when i is even we corrupt transaction with some stupid amount number
                if(i%2==0){
                    transaction.input.amount = 99999;
                } else{
                    validTransactions.push(transaction);
                }
            }

            it('shows a difference between valid and corrupt transactions', () => {
                expect(JSON.stringify(transactionPool.transactions)).not.toEqual(JSON.stringify(validTransactions));
            });

            it('grabs valid transactions', () => {
                expect(transactionPool.validTransactions()).toEqual(validTransactions);
            })

        });        
    });
          
});