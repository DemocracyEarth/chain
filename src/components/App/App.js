import Chain from 'components/Chain/Chain';
import Block from 'components/Block/Block';
import logo from 'images/logo.svg';
import './App.css';

function App() {

  let ubiChain = new Chain();
  ubiChain.addBlock(new Block(1, new Date().toString(), { amount: 1 }));

  console.log(JSON.stringify(ubiChain, null, 4));

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
