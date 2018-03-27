import web3 from './web3';
// we get interface from compiled contract
import Campaign from './build/Campaign.json';

// we will get address from 'pages/campaigns/show.js'
export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
}; 