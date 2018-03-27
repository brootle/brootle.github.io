const assert = require('assert');

// get local etherium network
const ganache = require('ganache-cli');

// this is a construction function so we use capital letter
const Web3 = require('web3');

// create an instance of Web3
// constructor takes provider as an aurgument that connects to locat test network
// that we are hosting, ganache creates several unlocked accounts that we can use in our test network
// const web3 = new Web3(ganache.provider());
const provider = ganache.provider();
const web3 = new Web3(provider);

// get interface and bytecode fields from out contract exported in compile.js
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach( async () => {
    // get a list of available account
    // this is async function so we use a promise
    // web3.eth.getAccounts().then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    // });

    // refactor same code and add async before our anonymous function
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy contract   
    // and deploy it with bytecode and argument - it our case that's 'message' - see 'contracts/Inbox.sol'
    // and we send it right away specifying amount of gas that can be spent
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    // we add this because there is some bug in web3 version 1.0.0-beta.26
    lottery.setProvider(provider);
});

describe('Lottery contract', () => {

    // check if the contract gets actually deployed to the network
    // if it was deployed - it should have an address
    it('deploys a contract', () => {
        assert.ok(lottery.options.address); // checks if value is defined, not null or undefined
    });

    it('one account can enter', async () => {
        await lottery.methods.enter().send({ 
            from: accounts[0], 
            value: web3.utils.toWei('0.02', 'ether') 
        });

        // get array of accounts of players
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });

        // there should be only one account and it's same as account[0] which is account that entered
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('many account can enter', async () => {
        await lottery.methods.enter().send({ 
            from: accounts[0], 
            value: web3.utils.toWei('0.02', 'ether') 
        });

        await lottery.methods.enter().send({ 
            from: accounts[1], 
            value: web3.utils.toWei('0.03', 'ether') 
        });

        await lottery.methods.enter().send({ 
            from: accounts[2], 
            value: web3.utils.toWei('0.04', 'ether') 
        });                

        // get array of accounts of players
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);

    });

    it('requires minimum ether to enter', async () => {
        try{
            await lottery.methods.enter().send({ 
                from: accounts[0], 
                value: web3.utils.toWei('0.001', 'ether') 
            });
            assert(false);
        } catch(err){
            // make sure we get error
            assert(err);
        }
    });    
 
    it('only manager call pickWinner', async () => {
        try{
            await lottery.methods.pickWinner().send({ 
                from: accounts[1]
            });
            assert(false);
        } catch(err){
            // make sure we get error
            assert(err);
        }
    });  

    it('sends money to the winner and resets players array', async () => {
        await lottery.methods.enter().send({ 
            from: accounts[0], 
            value: web3.utils.toWei('2', 'ether') 
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({ from: accounts[0] });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });      

});