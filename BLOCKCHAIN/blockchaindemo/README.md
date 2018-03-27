Based on https://www.udemy.com/build-blockchain

The App is here https://github.com/15Dkatz/sf-chain-guides

1. Init app -y means yes to all questions
    $ npm init -y

2. Install nodemon as dev dependency, i is short for install
    $ npm i nodemon --save-dev

3. Create Block as a class in block.js

4. Install mocha for testing
    $ npm install mocha --save 

7. Add "test": "mocha" into "scripts" to package.json 
    $ npm run test     

8. Make 'test/Blockchain.test.js' for our tests

9. Or we can test it another way. Make file dev-test.js
   Add "dev-test": "nodemon dev-test" to scripts
   $ npm run dev-test

10. Install crypto-js module so we can use SHA-256 hash function
   $ npm install crypto-js --save
