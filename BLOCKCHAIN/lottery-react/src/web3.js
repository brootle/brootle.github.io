const Web3 = require('web3');

// create instance of Web3 and use Metamask Provider
// if we have Metamask install as Google Chrome extention
// local web3 with it's own Provider is already there
// so we just grab Provider from there
const web3 = new Web3(window.web3.currentProvider);

export default web3;