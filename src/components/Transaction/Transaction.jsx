const SHA256 = require('crypto-js/sha256');

/**
* @summary displays the contents of a poll
*/
export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
