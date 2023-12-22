export const CONTRACT_ADDRESS = "0x90aCbe46edF5bC61532549e9338966090Fd5BAD5";
export const ABI = [
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "reason",
				type: "string",
			},
			{
				internalType: "address[]",
				name: "participants",
				type: "address[]",
			},
		],
		name: "createSplit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "recipient",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "FundsTransferred",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "makePayment",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "participant",
				type: "address",
			},
		],
		name: "PaymentMade",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "RewardTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "participants",
				type: "address[]",
			},
		],
		name: "SplitCreated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address payable",
				name: "recipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transferToAddress",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "cashback",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getAmount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getAmountLeft",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getCashBack",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getContractBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getParticipants",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getPerShare",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getReason",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
		],
		name: "getSplitCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getSplitOwner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
		],
		name: "getSplitStatus",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "groupId",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "participant",
				type: "address",
			},
		],
		name: "hasPaid",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "splits",
		outputs: [
			{
				internalType: "uint256",
				name: "splitId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "reason",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "amountLeft",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "perShare",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "splitClose",
				type: "bool",
			},
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
