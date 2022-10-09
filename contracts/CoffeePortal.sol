// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

// import "hardhat/console.sol";


contract CoffeePortal {

    struct Coffee {
        address donator;
        string message;
        string name;
        uint256 timestamp;
    }

    event NewCoffee(
        address indexed from,
        uint256 timestamp,
        string message,
        string name
    );

    uint256 totalCoffee ;
    address payable public owner; 
    Coffee[] coffee;



    constructor() payable {
        owner = payable(msg.sender);
    }

    function getAllCoffee() public view returns (Coffee[] memory) {
        return coffee;
    }

    function getTotalCoffee() public view returns (uint256) {
        return totalCoffee;
    }

    function buyCoffee(string memory _name, string memory _message, uint256 _payAmount) public payable {
        uint256 cost = 0.001 ether;
        require(_payAmount >= cost, "Insufficient amount");
        totalCoffee = totalCoffee + 1;
        coffee.push (Coffee(msg.sender, _message, _name, block.timestamp));
        (bool success, ) = owner.call{value: _payAmount}("");
        require(success, "Failed to send Ether");

        emit NewCoffee(msg.sender, block.timestamp, _message, _name);
    }

}