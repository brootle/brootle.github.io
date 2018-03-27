pragma solidity ^0.4.17; // solidity version

// contract definition and name of the contract
contract Inbox{
    // this automatically creates a function that returns 'message'
    string public message; // definition of the storage variable
    
    // constructor function has same name as contract
    function Inbox(string initialMessage) public{
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public{
        message = newMessage;
    }
    
    // public view - function type, "veiw" was "constant" in previous versions
    // returns (string) - return types
    // we don't really need this function
    // function getMessage() public view returns (string){
    //     return message;
    // }
}