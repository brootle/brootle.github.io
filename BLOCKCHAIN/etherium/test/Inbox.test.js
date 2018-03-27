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
let inbox;

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
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello World!'] })
        .send({ from: accounts[0], gas: '1000000' });

    // we add this because there is some bug in web3 version 1.0.0-beta.26
    inbox.setProvider(provider);
});

describe('Inbox contract', () => {

    // check if the contract gets actually deployed to the network
    // if it was deployed - it should have an address
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); // checks if value is defined, not null or undefined
    });

    it('default message can be set', async () => {
        // we use 'call' when we need to retreive data without modifying it
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello World!');
    });    

    it('message can be updated', async () => {
        // we use 'send' when we need to modify data, no need to send gas?
        await inbox.methods.setMessage('New Message!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'New Message!');
    });     
 
});