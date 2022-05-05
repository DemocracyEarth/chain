import Chain from 'components/Chain/Chain';
import Block from 'components/Block/Block';
import logo from 'images/logo.svg';
import './App.css';

function App() {

  let ubiChain = new Chain();
  ubiChain.addBlock(new Block(1, new Date().toString(), { amount: 1 }));
  ubiChain.addBlock(new Block(2, new Date().toString(), { amount: 200 }));
  
  // console.log(JSON.stringify(ubiChain, null, 4));

  console.log('Is blockchain valid? ' + ubiChain.isChainValid());
  
  ubiChain.chain[1].data = { amount: 666 };
  ubiChain.chain[1].hash = ubiChain.chain[1].calculateHash();
  
  console.log('Is blockchain valid? ' + ubiChain.isChainValid());


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
