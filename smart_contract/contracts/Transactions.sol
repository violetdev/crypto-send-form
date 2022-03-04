// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {

    event Transfer(address sender, address receiver, uint amount, uint256 timestamp);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function addToBlockChain(address payable receiver, uint amount) public {
        transactions.push(TransferStruct(msg.sender, receiver, amount, block.timestamp));

        emit Transfer(msg.sender, receiver, amount, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

}