// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Register {
    function register(address _recipient) public returns (uint256 tokenId) {}
}

contract ModePay {

    address public owner;
    mapping(string => Split[]) public splits;
    mapping(address => uint256) public cashback;

    event SplitCreated(string groupId, uint256 splitId, uint256 amount, address[] participants);
    event PaymentMade(string groupId, uint256 splitId, address participant);
    event FundsTransferred(address indexed sender, address indexed recipient, uint256 amount);
    event RewardTransferred(address indexed sender, uint256 amount);


    struct Split {
        uint256 splitId;
        uint256 amount;
        string reason;
        uint256 amountLeft;
        uint256 perShare;
        bool splitClose;
        address owner;
        address[] participants;
        mapping(address => bool) hasPaid;
    }

    constructor() {
        Register sfsContract = Register(0xBBd707815a7F7eb6897C7686274AFabd7B579Ff6);
        owner = msg.sender;
        sfsContract.register(owner); 
    }

    modifier splitExists(string memory groupId, uint256 splitId) {
        require(splitId <= splits[groupId].length, "Split does not exist");
        _;
    }

    modifier notPaid(string memory groupId, uint256 splitId, address participant) {
        require(!splits[groupId][splitId].hasPaid[participant], "Participant has already paid");
        _;
    }

    function transferToAddress(address payable recipient, uint256 amount) public payable {
        require(msg.value == amount, "Amount sent must match the specified amount");
        recipient.transfer(amount);
        emit FundsTransferred(msg.sender, recipient, amount);
        uint256 reward = getRandomNumber();
        address payable sender = payable(msg.sender);
        if(address(this).balance>reward)
            sender.transfer(reward);
        else
            reward = 0;
        cashback[msg.sender] = cashback[msg.sender] + reward;
        emit RewardTransferred(msg.sender, reward);   
        
    }

    receive() external payable {
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getRandomNumber() internal view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender)));
        return randomNumber % 65595826461684; // Add 1 to the upper bound to include it in the range
    }


    function createSplit(string memory groupId, uint256 amount, string memory reason ,address[] calldata participants) external {
        require(amount > 0, "Amount must be greater than 0");
        require(participants.length > 0, "Participants list must not be empty");

        uint256 splitId = splits[groupId].length;

        splits[groupId].push();
        Split storage newSplit = splits[groupId][splitId];
        newSplit.splitId = splitId;
        newSplit.amount = amount;
        newSplit.reason = reason;
        newSplit.owner = msg.sender;
        newSplit.perShare = amount / participants.length;
        newSplit.amountLeft = newSplit.perShare*(participants.length-1);
        newSplit.participants = participants;

        emit SplitCreated(groupId, splitId, amount, participants);
    }

    function makePayment(string memory groupId, uint256 splitId) external splitExists(groupId, splitId) notPaid(groupId, splitId, msg.sender) payable {
        require(msg.value == splits[groupId][splitId].perShare, "Incorrect payment amount");

        require(splits[groupId][splitId].hasPaid[msg.sender] == false,"Already paid");

        transferToAddress(payable(splits[groupId][splitId].owner), msg.value);

        splits[groupId][splitId].amountLeft = splits[groupId][splitId].amountLeft - msg.value;

        splits[groupId][splitId].hasPaid[msg.sender] = true;

        if(splits[groupId][splitId].amountLeft == 0)
        {
            splits[groupId][splitId].splitClose = true;
        }

        emit PaymentMade(groupId, splitId, msg.sender);
    }

    function getSplitCount(string memory groupId) external view returns (uint256) {
        return splits[groupId].length;
    }

    function getParticipants(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (address[] memory) {
        return splits[groupId][splitId].participants;
    }

    function getAmount(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (uint256) {
        return splits[groupId][splitId].amount;
    }

    function getAmountLeft(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (uint256) {
        return splits[groupId][splitId].amountLeft;
    }


    function getPerShare(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (uint256) {
        return splits[groupId][splitId].perShare;
    }


    function getReason(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (string memory) {
        return splits[groupId][splitId].reason;
    }

    function hasPaid(string memory groupId, uint256 splitId, address participant) external view splitExists(groupId, splitId) returns (bool) {
        return splits[groupId][splitId].hasPaid[participant];
    }

    function getSplitStatus(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (bool) {
        return splits[groupId][splitId].splitClose;
    }

    function getSplitOwner(string memory groupId, uint256 splitId) external view splitExists(groupId, splitId) returns (address) {
        return splits[groupId][splitId].owner;
    }

    function getCashBack() external view returns(uint256){
        return cashback[msg.sender];

    }

}
