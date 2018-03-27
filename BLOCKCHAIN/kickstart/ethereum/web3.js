const Web3 = require('web3');

// create instance of Web3 and use Metamask Provider
// if we have Metamask install as Google Chrome extention
// local web3 with it's own Provider is already there
// so we just grab Provider from there

// THE PROBLEM - NextJS will render everything on server side,
// by window object doesn't exist on server side yet

// const web3 = new Web3(window.web3.currentProvider);

// SOLUTION

const keys = require('../config/keys');

let web3;

// check if we are running in a browser
// and check if user is running Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server or the user is not running Metamask
    // in this case we use our own Provider
    // we create provide via https://rinkeby.infura.io
    const provider = new Web3.providers.HttpProvider(
        keys.networknodeurl
    );

    web3 = new Web3(provider);
}

export default web3;