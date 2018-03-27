import web3 from './web3';
// we get address from deplyed contract and interface from compiled contract
import CampaignFactory from './build/CampaignFactory.json';

const keys = require('../config/keys');

// create new instance of deplyed contract
const instance =  new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    keys.deployedContractAddress
);

// and export it
export default instance; 