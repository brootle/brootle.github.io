const Transaction = require('./transaction');
const Wallet = require('./index');

const { MINING_REWARD } = require('../config');

describe('Transaction', ()=>{

    let transaction, wallet, recipient, amount;

    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'fewlfjo2ijwor23o2ifoeow';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('ountputs the `amount` substructed from the wallet balance', ()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
            .toEqual(wallet.balance - amount);
    });

    it('ountputs the `amount` added to the recipient', ()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount)
            .toEqual(amount);
    });    


    it('inputs the the balance of the wallet', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });    


    it('validates a valid transaction', ()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });      

    it('invalidates a corrupt transaction', ()=>{
        transaction.outputs[0].amount = 500000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });      
    


    describe('transaction with the `amount` that exceeds the balance', ()=>{
        beforeEach(()=>{
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create a transaction', ()=>{
            expect(transaction).toEqual(undefined);
        });          
    });        


    describe('updating transaction', ()=>{
        let nextAmount, nextRecipient;
        beforeEach(()=>{
            nextAmount = 25;
            nextRecipient = 'fadf34i5oi4u3oiffw';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it(`substracts the next amount from sender's output`, ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                .toEqual(wallet.balance - amount - nextAmount);
        });          

        it('outputs the amount for the next recipient', ()=>{
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
                .toEqual(nextAmount);
        });          
    });     

    describe('creating a reward transaction', ()=>{
        beforeEach(()=>{
            transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
        });

        it(`reward the miner's wallet`, ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(MINING_REWARD);
        });
    });   
         
});