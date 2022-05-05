import Chain from 'components/Chain/Chain';
import Block from 'components/Block/Block';
import logo from 'images/logo.svg';
import './App.css';

function App() {

  let ubiChain = new Chain();
  console.log('mining block 1...');
  ubiChain.addBlock(new Block(1, new Date().toString(), { amount: 1 }));

  console.log('mining block 2...');
  ubiChain.addBlock(new Block(2, new Date().toString(), { amount: 200 }));
  
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
