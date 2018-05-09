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

11. Install another testing tool as development dependency - jest
   $ npm i jest --save-dev

12. make block.test.js in root of project, jest will find and run it

13. add "jest-test": "jest --watchAll" into scripts in package.json
   $ npm run jest-test
    Jest will look for all test.js files, so I rename test files used for Mocha
    I move all tests to test folder

14. Make Blockchain class in Blockchain.js

15. Move all blockchain related files to blockchain folder and re-name Blockchain.js to index.js 
    and update name where Blockchain.js was required to index

16. Make 'app' folder for client application and index.js for our application code

17. Install express module for application's API
    npm i express --save

18. Add to scripts in package.json
    "start": "node ./app",
    "dev": "nodemon ./app"

    Use $ npm run dev - to start app

19. Install body-parser to get data fro post requests 
    $ npm i body-parser --save

20. In the post request send JSON data like this, body should be application/json

    {
        "data":"some data"
    }

21. Install websocket module
    $ npm i ws --save

22. Make "p2p-server.js" in app folder, that will be out socket server

23. Run the app
    $ npm run dev

    server started at 
    HTTP_PORT=3001 P2P_PORT=5001

    we manually connect to started server from another HTTP_PORT but to same host 5001
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev    

    and we can connect to all existing hosts
    $ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev     

    we create socket connection to existing host
    $ check https://github.com/15Dkatz/sf-chain-guides/blob/master/app/p2p-server.js    

24. Start app and send few blocks via post http method using Postman
    Start another connection
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev   

25. Call syncChains function from p2p-server.js in app.js to sync chains everytime new block added to the chain
    and we can start another connection and add block from there to test if new blockchain is transmitted to all connected peers

26. Add NONCE and DIFFICULTY to Block.js and write a test in block.test.js to test it

27. Move const DIFFICULTY = 4; to new file in root -> config.js