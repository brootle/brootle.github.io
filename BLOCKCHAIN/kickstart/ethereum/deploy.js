const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

const compiledFactory  = require('./build/CampaignFactory.json');

const keys = require('../config/keys');

// we pass 12 words mnemonic for the account and a link to network we want to connect to
const provider = new HDWalletProvider(
    keys.mnemonic,
    keys.networknodeurl
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });    

    console.log('Contract deployed to: ', result.options.address);
}

deploy();