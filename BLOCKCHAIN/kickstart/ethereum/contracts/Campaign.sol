pragma solidity ^0.4.17; // solidity version

// define contract that will have info on all deployed Campaigns
// this contract will be creating and deploying Campaign contracts
contract CampaignFactory {
    // array of addresses of deployed Campaigns
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

// define contract
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // track number of YES vote
        mapping(address => bool) approvals; // track who approved
    }
    
    Request[] public requests;
    
    address public manager;
    uint public minimumContribution;
    
    uint public aproversCount; // let's count how many people joined
    
    // we use mapping to match addresses and value
    // instead of array -> address[] public approvers;
    mapping(address => bool) public approvers;
    
    // modifiers can extend functions with some code
    modifier restricted() {
        require(msg.sender == manager); 
        _; // the code of the function that we extend will be here
    }
    
    // define contructor function for the contract
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    // payable means that function can receive money
    function contribute() public payable {
        // check if person sends minimim required money
        require(msg.value > minimumContribution);
        
        // approvers.push(msg.sender);
        // we will use mapping, defaul value is false
        // so if the user is not in the mapping it wiil return false when we look up
        approvers[msg.sender] = true;
        
        aproversCount++;
    }
    
    // function will use restricted modifier
    function createRequest(string description, uint value, address recipient) public restricted {
        // 'memory' means variable as a copy
        // 'storage' means variable as a pointer like in C 
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            // mapping is a reference type so we don't need to initialize it
        });
        
        // alternative syntax
        // Request newRequest = Request(description, value, recipient, false);
        
        
        // also add new request to the list of requests
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        // make sure we don't make a copy
        // but manipulate with that request
        // so we basically make a pointer
        Request storage request = requests[index];
        
        // make sure this person donated money
        require(approvers[msg.sender]);
        
        // now check that this persoin hasn't voted yet
        // on the specified request
        // approvals field is a mapping that saves true or false
        // for specified address
        require(!request.approvals[msg.sender]);
        
        
        // now we just add true in the mapping for this sender
        request.approvals[msg.sender] = true;
        // if all is ok we increment the count
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        // make sure that >50% voted YES
        require(request.approvalCount > (aproversCount/2));        
        
        // make sure that request is not finalized yet
        require(!request.complete);
        
        // send money from this aproved request to some address
        request.recipient.transfer(request.value);
        
        // now let's change complete status to true
        request.complete = true;
    }

    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            aproversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint) {
        return requests.length;
    }

}