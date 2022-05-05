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
}
