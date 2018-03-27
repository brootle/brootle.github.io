1. Initialize
    $ npm init

2. Install modules
    solc - Solidity compiler
    mocha - for testing
    ganache-cli - Ethereum test network
    and web3@1.0.0-beta.26

    $ npm install solc fs-extra mocha ganache-cli web3@1.0.0-beta.26 --save 

3. Make initial files and folders for Ethereum code 
    'ethereum/contracts/Campaign.sol'
    'ethereum/compile.js'
    'ethereum/deploy.js'

4. Copy our contract code from http://remix.ethereum.org/ to Campaign.sol

5. Compiled Contracts will be placed in 'ethereum/build' folders
   So everytime we run compile - we delete build folder and make new one

6. Start writing tests in 'test/Campaign.test.js'

7. Add "test": "mocha" into "scripts" to package.json 
    $ npm run test 

8. Now we need to deploy our contract. Install truffle-hdwallet-provider module.
    $ npm install truffle-hdwallet-provider --save

9. Contract deployed to:  0x8efbFdeBb1429120695d0051bE8ce1880E6ef02a

=================== REACT PART ======================================

10. Install some modules. NextJS for routing
    $ npm install next@4.1.4 react react-dom --save

11. Make 'pages' folder, NextJS will go there and will turn react components
    that are in that folder into routes

12. To start NEXT add into scripts in package.json -> "dev": "next dev"

13. Make 'ethereum/web3.js' so we can use web3 to connect client-side and ethereum network

14. Now let's make a file for our Factory -> 'ethereum/factory.js'

15. Make some Campaign at deployed Factory at 0x8efbFdeBb1429120695d0051bE8ce1880E6ef02a

16. Go to http://remix.ethereum.org/ and load CampaignFactory from the address
    run createCampaign with minimum 100 wei - don't forget to log in to Metamask

17. We will show all Campaigns in 'pages/index.js' so we must import 'ethereum/factory.js'

18. Install semantic-ui for react that we will use for components
    $ npm install semantic-ui-react --save

19. And install semantic-ui-css that goes together with this project
    $ npm install semantic-ui-css --save

20. Cancel $ npm install semantic-ui-css --save
    We will use a link to css cdn
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>

21. Making Layout in NextJS -> make 'components/Layout.js' and we will be importing
    this Layout to every page in NextJS

22. Install another module for routing inside NextJS
    $ npm install next-routes --save

23. Make routes.js in the root forlder to enable dynamic routing in NextJS
    see - https://github.com/fridays/next-routes

24. Make server.js that will manually start NextJS and import routes

25. Change "dev": "next dev" to "dev": "node server.js" so we start server 1st and it start everything else

26. Now we can use Link and Router helpers from next-routes module in our components and pages

27. Add function to Campaign.sol that will return summary info on some campaing and re-deploy the contract
    $ node ethereum/compile.js
    $ node ethereum/deploy.js
    address of new deployed contract 0xD5c93c1Ba303400EC574cBae28bfc4233EB25Ea9
    update address in 'config/dev.js' - address is used in ethereum/factory.js

28. Make ethereum/campaign.js for instance of Campaign contract. It will be similar to ethereum/factory.js

29. Make ContributeForm.js in Components.

30. Make 'pages/campaigns/requests' for routes that will handle view requests and add new request
    We also need to make a route into 'routes.js' to handle dynamic for requests
    Restart server everytime when you add new route to routes.js

31. Make separate component to render each request -> /components/RequestRow.js

