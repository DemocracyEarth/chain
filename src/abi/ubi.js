export const abi = 
  [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [],
      name: "accruedPerSecond",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "accruedSince",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_human",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_governor",
          type: "address"
        }
      ],
      name: "changeGovernor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "contract IProofOfHumanity",
          name: "_proofOfHumanity",
          type: "address"
        }
      ],
      name: "changeProofOfHumanity",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_subtractedValue",
          type: "uint256"
        }
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_human",
          type: "address"
        }
      ],
      name: "getAccruedValue",
      outputs: [
        {
          internalType: "uint256",
          name: "accrued",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "governor",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_addedValue",
          type: "uint256"
        }
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_initialSupply",
          type: "uint256"
        },
        {
          internalType: "string",
          name: "_name",
          type: "string"
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string"
        },
        {
          internalType: "uint256",
          name: "_accruedPerSecond",
          type: "uint256"
        },
        {
          internalType: "contract IProofOfHumanity",
          name: "_proofOfHumanity",
          type: "address"
        }
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "proofOfHumanity",
      outputs: [
        {
          internalType: "contract IProofOfHumanity",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_human",
          type: "address"
        }
      ],
      name: "reportRemoval",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_human",
          type: "address"
        }
      ],
      name: "startAccruing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address"
        },
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]