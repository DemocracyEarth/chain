import Block from 'components/Block/Block';

/**
* @summary displays the contents of a poll
*/
export default class Chain {
  constructor() {
    this.chain = [];
    this.chain.push(this.createGenesisBlock());
  }

  createGenesisBlock() {
    return new Block(0, new Date().toString(), 'Genesis', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    if (this.getLatestBlock()) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
