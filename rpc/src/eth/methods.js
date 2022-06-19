const methods = {
  eth_chainId: (params, schema) => {
    return "0x388"; // 904 is closest looking number to PoH
  },

  eth_blockHeight: (params, schema) => {
    return "0x0";
  },

  // The chainId number in string format
  net_version: (params, schema) => {
    return "904";
  },

  // Returns the number of most recent block.
  eth_blockNumber: (params, schema) => {
    return "0x0";
  },

  // Returns the balance of the account of given address.
  eth_getBalance: (params, schema) => {
    return "0x0";
  },

  // Returns information about a block by number.
  eth_getBlockByNumber: (params, schema) => {
    console.log('--> eth_getBlockByNumber');
    console.log(params);
    console.log(schema);

    return {
      parentHash: "0x0",
      sha3Uncles: "0x0",
      miner: "0x0",
      stateRoot: "0x0",
      transactionsRoot: "0x0",
      receiptsRoot: "0x0",
      logsBloom: "0x0",
      totalDifficulty: "0x0",
      number: "0x0",
      gasLimit: "0x0",
      gasUsed: "0x0",
      timestamp: "0x0",
      extraData: "0x0",
      mixHash: "0x0",
      nonce: "0x0",
      size: "0x0",
      transactions: "0x0",
      uncles: "0x0",
    }
  }
}

module.exports = methods;
