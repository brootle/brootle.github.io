const path = require('path');
const fs = require('fs');
const solc = require('solc'); // require solidity compiler

// get path for the file
// __dirname is node constant that has project directory
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read file as utf8 text
const source = fs.readFileSync(inboxPath, "utf8");

// compile the source code and give number of contracts as 2nd argument
// so now it's complided in script that can be deployed to Ehter network
// it has interface and code, you can print it to see the result object
// solc.compile(source, 1);
// but we don't all data, we can just take Inbox contract from returned object and export it
module.exports = solc.compile(source, 1).contracts[':Inbox'];