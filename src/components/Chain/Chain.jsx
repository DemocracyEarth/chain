import Block from 'components/Block/Block';
import Transaction from 'components/Transaction/Transaction';

/**
* @summary A blockchain that verifies the validity of its blocks.
*/
export default class Chain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  // Creates first block of the chain.
  createGenesisBlock() {
    return new Block(new Date().toString(), 'Genesis', '0');
  }

  // Provides information of the latest block in the chain.
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  
  // Mines all the pending transactions found on the mempool.
  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    this.chain.push(block);

    this.pendingTransactions = [];
  }
  
  // Adds a transaction to the Mempool.
  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address');
    }

    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain')
    }

    this.pendingTransactions.push(transaction);
  }

  // Returns the balance of any given address.
  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  // Verifies the validity of the chain.
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (!currentBlock.hasValidTransactions()) {
        console.log(`The block ${currentBlock.hash} has no valid transactions.`);
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`The hash of block ${currentBlock.hash} does not coincide with the calculated hash ${currentBlock.calculateHash()}.`);
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`The previous hash of current block ${currentBlock.previousHash} does not coincide with hash of the previous block ${previousBlock.hash}.`);
        return false;
      }
    }

    return true;
  }
}
