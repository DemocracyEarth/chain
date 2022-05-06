import Chain from 'components/Chain/Chain';
import Transaction from 'components/Transaction/Transaction';
import logo from 'images/logo.svg';
import './App.css';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function App() {

  const myKey = ec.keyFromPrivate('4ad4dd68e2109ef52f08c7439c11c62cb60daddbcdd9cd82f197d3dcbe5fba2c');
  const myWalletAddress = myKey.getPublic('hex');

  let ubiChain = new Chain();

  const tx1 = new Transaction(myWalletAddress, 'XXXXXXXXX', 10);
  tx1.signTransaction(myKey);
  ubiChain.addTransaction(tx1);

  console.log('Starting the miner...');
  ubiChain.minePendingTransactions(myWalletAddress);

  console.log(`Balance of my wallet is: ${ubiChain.getBalanceOfAddress(myWalletAddress)}`);

  console.log(`Is chain valid? ${ubiChain.isChainValid()}`);
  console.log(ubiChain.chain);




  /* console.log('mining block 1...');
  ubiChain.addBlock(new Block(1, new Date().toString(), { amount: 1 }));

  console.log('mining block 2...');
  ubiChain.addBlock(new Block(2, new Date().toString(), { amount: 200 }));
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          UBI Chain.
        </p>
      </header>
    </div>
  );
}

export default App;
