const methods = {
  eth_chainId: (params, schema) => {
    return "0x388"; // 904 is closest looking number to PoH
  },

  eth_blockHeight: (params, schema) => {
    return "0x0";
  }
}

module.exports = methods;
