const assert = require('assert');

// get local etherium network
const ganache = require('ganache-cli');

// this is a construction function so we use capital letter
const Web3 = require('web3');

// create an instance of Web3
// constructor takes provider as an aurgument that connects to locat test network
// that we are hosting, ganache creates several unlocked accounts that we can use in our test network
// const web3 = new Web3(ganache.provider());
const provider = ganache.provider();
const web3 = new Web3(provider);

// get interface and bytecode fields from previously compiled contracts
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
    // get a list of available account
    accounts = await web3.eth.getAccounts();

    // deploy Factory contract
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    // now let's create Campaign using Factory contract
    // createCampaign requires minimum contribution and it's in wei
    await factory.methods.createCampaign('100').send({ 
        from: accounts[0], 
        gas: '1000000' 
    });

    // now we need to get address of created Campaign
    // ES6 syntax, 1st element of array will be assigned to campaignAddress
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();    

    // now let's get Contract from the address and we need to pass ABI that we get from compiled contract
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});


describe('Campaigns', () => {

    // check if the contract gets actually deployed to the network
    // if it was deployed - it should have an address
    it('Factory and Contract was deployed', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address); // checks if value is defined, not null or undefined
    });

    it('Caller is marked as Campaign manager', async () => {
        // when we make public variable inside contract get method is automatically created
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('People can contribute money and they are added to aprovers list', async () => {
        // send some wei that is more than minimum from some account
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        // now let's check if this address is in approvers list
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        // now let's check if the value is true
        assert(isContributor);
    });    

    it('Requires minimum contribution', async () => {
        // use try and catch to see if we get error when we send
        // below minimum amount of money
        try{
            await campaign.methods.contribute().send({ 
                value: '90',
                from: accounts[1]
            });
            assert(false);
        } catch(err){
            // make sure we get error
            assert(err);
        }        
    });    

    it('Manager can make payment request', async () => {
        // use try and catch to see if we get error when we send
        // below minimum amount of money
        await campaign.methods.createRequest('Buy tools', '87', accounts[1]).send({ 
            from: accounts[0],
            gas: '1000000' 
        });    

        // now let's get request that was added into requests list
        // we pass 0 to get request at 0 index
        const request = await campaign.methods.requests(0).call();

        // let's check if description field is same as we passed when we created request
        assert.equal('Buy tools', request.description);
    });       

    it('Request gets processed', async () => {
        // first we contribute some money to campaign
        await campaign.methods.contribute().send({ 
            value: web3.utils.toWei('20', 'ether'),
            from: accounts[0]
        });        

        // now create request to send money to some address
        await campaign.methods
            .createRequest('Buy tools', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ 
                from: accounts[0],
                gas: '1000000' 
            });       

        // before we finalize we must approve request  
        await campaign.methods.approveRequest(0).send({ 
            from: accounts[0],
            gas: '1000000' 
        });          

        // now we can finalize request      
        await campaign.methods.finalizeRequest(0).send({ 
            from: accounts[0],
            gas: '1000000' 
        });           

        // now let's check balance at the accoun where we sent money
        // we got the balance as string and it's in wei
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether'); // convert balance to ether
        balance = parseFloat(balance); // convert to float from string
        
        assert(balance > 104); // it will be a little less than 105
    });         

});