pragma solidity ^0.4.17; // solidity version

// contract definition and name of the contract
contract Lottery{
    address public manager;
    address[] public players;
    
    function Lottery() public {
        // msg is global variable automatically created
        manager = msg.sender;
    }
    
    function enter() public payable {
        // require some amout of money to be sent to enter
        // see https://etherconverter.online/
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns(uint){
        // we hash block difficulty, current time and players 
        // to create pseudo-random number
        return uint(keccak256(block.difficulty, now, players));
    }
    
    // we add 'restricted' modifier to check if this was the manager who called the function
    function pickWinner() public restricted {

        uint index = random() % players.length;
        // 'this' refers to current transfer
        // 'transfer' is a function that sends ether to selected address
        players[index].transfer(this.balance);
        
        // clear players list so we can run athother round of Lottery
        // basically we asign dynamic array to players variable
        // and we initialize it with initial lenght of 0
        players = new address[](0);
    }

    // we can make function modifier to keep our code DRY
    modifier restricted(){
        // make sure that the person who runs this function is the manager
        // actually this is the person who created the contract        
        require(msg.sender == manager);
        _;
        // this means that anywhere modifier is used the code of that function
        // will be placed instead of '_'
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }

}