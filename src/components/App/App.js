import Chain from 'components/Chain/Chain';
import Block from 'components/Block/Block';
import Transaction from 'components/Transaction/Transaction';
import logo from 'images/logo.svg';
import './App.css';

function App() {

  let ubiChain = new Chain();

  ubiChain.createTransaction(new Transaction('address1', 'address2', 100));
  ubiChain.createTransaction(new Transaction('address2', 'address1', 23));
  
  console.log('Starting the miner...');
  ubiChain.minePendingTransactions('minerAddress');

  console.log(`balance of miner: ${ubiChain.getBalanceOfAddress('minerAddress')}`);

  console.log('Starting the miner...');
  ubiChain.minePendingTransactions('minerAddress');

  console.log(`balance of miner: ${ubiChain.getBalanceOfAddress('minerAddress')}`);

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
