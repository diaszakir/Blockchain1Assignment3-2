// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
    }
    
    Transaction[] public transactions;
    
    constructor() ERC20("AITUSE-2320", "ATE") Ownable(msg.sender) {
        _mint(msg.sender, 2000 * 10**18);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        bool success = super.transfer(to, amount);
        if (success) {
            transactions.push(Transaction({
                sender: msg.sender,
                receiver: to,
                amount: amount,
                timestamp: block.timestamp
            }));
        }
        return success;
    }
  
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        bool success = super.transferFrom(from, to, amount);
        if (success) {
            transactions.push(Transaction({
                sender: from,
                receiver: to,
                amount: amount,
                timestamp: block.timestamp
            }));
        }
        return success;
    }
    
    function getLatestTransactionTime() public view returns (string memory) {
        require(transactions.length > 0, "No transactions yet");
        
        uint256 timestamp = transactions[transactions.length - 1].timestamp;
        
        uint256 year = 1970;
        uint256 month = 1;
        uint256 day = 1;
        uint256 hour = 0;
        uint256 minute = 0;
        uint256 second = timestamp;
        
        year += second / 31536000;
        second = second % 31536000;
        
        month += second / 2592000;
        second = second % 2592000;
        
        day += second / 86400;
        second = second % 86400;
        
        hour = second / 3600;
        second = second % 3600;
        
        minute = second / 60;
        second = second % 60;
        
        return string(abi.encodePacked(
            toString(year), "-",
            toString(month), "-",
            toString(day), " ",
            toString(hour), ":",
            toString(minute), ":",
            toString(second)
        ));
    }
    
    function getLatestTransactionSender() public view returns (address) {
        require(transactions.length > 0, "No transactions yet");
        return transactions[transactions.length - 1].sender;
    }
    
    function getLatestTransactionReceiver() public view returns (address) {
        require(transactions.length > 0, "No transactions yet");
        return transactions[transactions.length - 1].receiver;
    }
    
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}