const SHA256 = require('crypto-js/sha256');

/**
* @summary displays the contents of a poll
*/
export default class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce ++;
      this.hash = this.calculateHash();
    }

    console.log('block mined: ' + this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false
      }
    }

    return true;
  }
}
