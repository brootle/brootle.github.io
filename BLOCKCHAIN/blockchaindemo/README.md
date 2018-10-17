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

28. 'generates a hash that matches the difficulty' test added to block.test.js

29. Calculate and set difficulty dynamically based on how long it takes to mine new block
    add MINE_RATE to config.js and import this variable in Block.js
    and add 'difficulty' parameter to Block object
    add 'adjustDifficulty' function to Block object
    and because now we can calculate 'difficulty' we replace DIFFICULTY with block.difficulty in Block.test.js

30. Testing how difficulty changes addig several blocks in 'dev-test.js'
  


    =============== W A L L E T ================

31.  Make 'wallet' folder for our wallet object

32. Install elliptic module
    $ npm i elliptic --save

33. Make 'chain-util.js' in root of the project for ChainUtil class and import it to Wallet class

34. Make a test in dev-test.js

35. Install module that creates universal unique ID based on current timestamp
    $ npm install uuid --save

36. Make Transaction class in wallet directory - 'transaction.js'

37. Test transactions in 'transaction.test.js'

38. Add to package.json to set test env to node because 'elliptic' has a dependency which is using
    browser env to generate random numbers - the "brorand" dependency code is not in JsDom 

  "jest": {
    "testEnvironment": "node"
  }

39. Add 'sign' method to wallet class and add 'signTransaction' method to transaction class

40. Move SHA256 to 'chain-utils' from Block.js and add hash function to 'chain-utils'

41. Add verifySignature method to chain-utils.js

42. Add verifyTransaction method to transaction.js

43. Add 'update' function to transaction.js



    =============== T R A N S A C T I O N  P O O L ================

44. Make transaction-pool.js in wallet directory

45. Make transaction-pool.test.js to test new class

46. Add 'createTransaction' method to Wallet class

47. Add 'existingTransaction' method to transaction-pool.js

48. Add 'index.test.js' in 'wallet' folder to test wallet


    ======== I N T E G R A T E  W A L L E T  T O  A P P ===========

49. Add 'const Wallet = require('../wallet');' to 'app/index.js'
    and we also need to get TransactionPool there

50. Add transactionPool to P2pServer constructor to sync Transaction Pool among all users

51. Add types to data that we send over a socket, so we declare new const MESSAGE_TYPES,
    so now we have to update sendChain method to add message type and update sendTransaction
    in the same way and update messageHandler function

52. Add p2pServer.broadcastTransaction(transaction); into app/index.js to app.post('/transact'....

53. Now we can test new functionality, see step 24.
    Run app
    $ npm run dev

    Start app from another HTTP and PORT at another terminal and connect to running app at 5001 port
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev 

    In Postman make few transactions in post requests to http://localhost:3001/transact

    {
        "recipient":"jdfaldlasjfl343l4jldss",
        "amount": 20
    }    

    And we will see same transactions on an app running at different port http://localhost:3002/transactions

    And if we make transactions from 2nd app, we will see result in 1st app
    so the chains are sync accross all running apps connected via P2P server over sockets

54. Add new route to app/index.js to display wallet public key app.get('/public-key'



    ======== M I N E  T R A N S A C T I O N S ===========

55. Make new class in app/miner.js

56. Add validTransactions function to transaction-pool

57. Add test to transaction-pool.test.js
    go to beforeEach and replace 

        // transaction = Transaction.newTransaction(wallet, 'dsf43453kl434', 30);        
        // transactionPool.updateOrAddTransaction(transaction);

    with
        transaction = wallet.createTransaction('dsf43453kl434', 30, transactionPool);

    Test valid and corrupt transactions    
    
    and run tests
        $ npm run jest-test


58. Add MINING_REWARD constant to config.js file, we will use it in wallet/transaction.js and add
    new function - transactionWithOutputs

59. And add rewardTransaction function there as well.

60. Create blockchainWallet function in wallet/index.js

61. Test rewardTransaction in transaction.test.js

62. In app/miner.js we push rewardTransaction to transaction pool to reward current miner

63. Add clear function to transaction-pool.js

64. Add a test to transaction-pool.test.js to test clear function

65. Add test to transaction.test.js to test 'creating a reward transaction'

67. Add "clear transactions" message to p2p-server.js
    So we bassically force all connected sockets to run clear() function on transactionPool

68. Create miner instance in app/index.js

69. Add mine-transactions GET route to app/index.js

70. TEST mining blocks:

    start instance of the app
    $ npm run dev
    and the app will run at http://localhost:3001/

    Start app from another HTTP and PORT at another terminal and connect to running app at 5001 port
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev   
    the app will run at http://localhost:3002/  

    In Postman make few transactions in post requests to http://localhost:3001/transact
    The 'Body' must be 'raw'

    {
        "recipient":"jdfaldlasjfl343l4jldss",
        "amount": 20
    }        

    and

    {
        "recipient":"jdfaldlasjfl343l4jldss",
        "amount": 14
    }        

    NOW we can call for GET request http://localhost:3002/mine-transactions
    transactions will be added to the chain and chain will be replaced
    and we will be redirected to http://localhost:3002/blocks


71. Calculate Wallet Balance, see chapter 66 https://www.udemy.com/build-blockchain/learn/v4/t/lecture/9423068?start=0

72. Add calculateBalance function to wallet/index.js

73. Add this.balance = this.calculateBalance(blockchain); to createTransaction function and add blockchain argument

74. Add blockchain to const transaction = wallet.createTransaction(recipient, amount, blockchain, transactionPool); in app/index.js
    and we must add it to wallet/index.test.js as well and in wallet/transaction-pool.test.js

    and run tests
        $ npm run jest-test    

75. Add test to test calculateBalance function in wallet/index.test.js

76. TEST the complete app

    start instance of the app
    $ npm run dev
    and the app will run at http://localhost:3001/

    Start app from another HTTP and PORT at another terminal and connect to running app at 5001 port
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev   
    the app will run at http://localhost:3002/  

    Get Public Key of one of the connected wallets
    http://localhost:3002/public-key

    In Postman make transaction in post requests to http://localhost:3001/transact
    The 'Body' must be 'raw', use Public Key from http://localhost:3002/public-key

    {
        "recipient":"0464ad28dda49a775ff8e9e7df60e474719ab55413ea554d592a9a2b46c3da1d91e76de5475b6df6d65bde3831beed8c169981013fc7ce7dbfc442a780fd59a5ad",
        "amount": 20
    }       

    and couple more transactions 

    {
        "amount": 12,
        "address": "0464ad28dda49a775ff8e9e7df60e474719ab55413ea554d592a9a2b46c3da1d91e76de5475b6df6d65bde3831beed8c169981013fc7ce7dbfc442a780fd59a5ad"
    }

    {
        "amount": 43,
        "address": "0464ad28dda49a775ff8e9e7df60e474719ab55413ea554d592a9a2b46c3da1d91e76de5475b6df6d65bde3831beed8c169981013fc7ce7dbfc442a780fd59a5ad"
    }    

    We can see transactions in TransactionPool here http://localhost:3001/transactions or http://localhost:3002/transactions

    Now we can MINE transactions by going to http://localhost:3001/mine-transactions 
    and we will be redirected to http://localhost:3001/blocks


    Do another transaction to see the balance of the wallet

    In Postman make transaction in post requests to http://localhost:3001/transact
    The 'Body' must be 'raw', use Public Key from http://localhost:3002/public-key

    {
        "recipient":"0464ad28dda49a775ff8e9e7df60e474719ab55413ea554d592a9a2b46c3da1d91e76de5475b6df6d65bde3831beed8c169981013fc7ce7dbfc442a780fd59a5ad",
        "amount": 20
    }         

    Keep in mined that if you MINED from the 1st wallet it also got 50 as mining reward