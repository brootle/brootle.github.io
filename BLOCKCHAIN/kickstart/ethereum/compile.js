const path = require('path');
const fs = require('fs-extra'); // has more functions than standard file system module of NodeJS
const solc = require('solc'); // require solidity compiler

// everytime we run compiler we must delete build folder with everything inside
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// read file as utf8 text
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, "utf8");

// now we compile contracts
// the output will have two contracts as object
const output = solc.compile(source, 1).contracts;

// create 'build' folder
fs.ensureDirSync(buildPath);

// itterate over each contract in the object and save it into separate file
for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':','')}.json`), // get rid of ':'' from contract name
        output[contract]
    );
}
