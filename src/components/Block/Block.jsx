const SHA256 = require('crypto-js/sha256');

/**
* @summary Creates a block of transactions.
*/
export default class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // Calculates the hash for this block.
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  // Mines block according to set difficulty
  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce ++;
      this.hash = this.calculateHash();
    }

    console.log('block mined: ' + this.hash);
  }

  // Checks the validity of the transactions contained in this block.
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false
      }
    }

    return true;
  }
}
