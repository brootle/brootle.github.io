THIS IS A COPY OF A PROJECT IN "ETHERIUM" FOLDER

1. Initialize new node project and make package.json
    $ npm init

   and make .gitignore file with node modules node_modules/

2. Prepare project structure, see https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/t/lecture/9020450?start=0
    make 'contracts' forlder that will have Solidity code and all contracts we make
    so we make Inbox.sol file in that folder and copy code we made at remix
    http://remix.ethereum.org/#optimize=false&version=soljson-v0.4.20+commit.3155dd80.js

    So finale structure is like this:

                contracts/Inbox.sol
                test/Inbox.test.js
                compile.js
                deploy.js
                package.json
                .gitignore

3. Install Solidity compiler
    $ npm install solc --save

4. Load Sol code in compile.js, basically we just read it as a file and export Inbox contract from the object

5. Install web3 and testing tools, and local etherium test network - ganache
   mocha - test running framework
    npm install mocha ganache-cli web3@1.0.0-beta.26 --save 

6. Write tests in test/Inbox.test.js using local etherium network
7. Add "test": "mocha" into scripts of package.json
8. And just run npm command to run test in scripts
    $ npm run test

9. we need to make updates in code, see here https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/t/lecture/9042518?start=0

10. Use https://infura.io/ to get access to ethereum nodes on test network

11. Install module that will allow us to work with provider to connect to node
    $ npm install truffle-hdwallet-provider --save

12. Start to writing actual code in 'deploy.js'

13. Contract was deployed to this address
    0xC5Cb6C27319E4e624F844946307d3fC7CD80e9A7

14. Check contract at
    https://rinkeby.etherscan.io/address/0xC5Cb6C27319E4e624F844946307d3fC7CD80e9A7


15. Go to remix to interact with contact http://remix.ethereum.org/
    Select 'Injected Web3' in Run->Environment
    And put our contract address at 'At Address'