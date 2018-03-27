1. Install web3 library
    $ npm install web3@1.0.0-beta.26 --save 

2. Make separate file for configuration of web3 - src/web3.js
   We will use Provider used by Metamask

3. Import web3 in App.js component

4. Add contract file -> lottery.js

5. We need to get contract interface, to do that go to 'lottery' project
   and add console.log(interface); to deploy.js and run deploy.js again
    $ node deploy.js

   After this we get new address 0x6614645E4435973cA54Aa68E592e3c1D9F12B84d

6. Import lottery to App component
