import React from 'react';
import Chain from 'components/Chain/Chain';
import Transaction from 'components/Transaction/Transaction';
import Wallet from 'components/Wallet/Wallet';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { config } from 'config';
import logo from 'images/logo.svg';
import './App.css';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function App() {

  const myKey = ec.keyFromPrivate('4ad4dd68e2109ef52f08c7439c11c62cb60daddbcdd9cd82f197d3dcbe5fba2c');
  const myWalletAddress = myKey.getPublic('hex');
  let ubiChain = new Chain();
  const tx1 = new Transaction(myWalletAddress, 'XXXXXXXXX', 7);
  tx1.signTransaction(myKey);
  ubiChain.addTransaction(tx1);

  console.log('Starting the miner...');

  ubiChain.minePendingTransactions(myWalletAddress);

  console.log(`Balance of my wallet is: ${ubiChain.getBalanceOfAddress(myWalletAddress)}`);
  console.log(`Is chain valid? ${ubiChain.isChainValid()}`);
  console.log(ubiChain.chain);



  console.log('Checking configuration settings...');
  let configure = false;
  if (!config.provider.walletconnect.options.infuraId) {
    console.log('🚨 Ethereum node provider settings is not configured.');
    configure = true;

  }
  if (config.contract.proofofhumanity === '') {
    console.log('🚨 Proof of Humanity contract address was not found.')
    configure = true;
  }
  if (configure) {
    console.log("Please configure app settings on src/config.js.")
  } else {
    console.log("Configuration settings OK.")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ubi.eth
          </Typography>
          <Button color="inherit">
            <Wallet />
          </Button>
        </Toolbar>
      </AppBar>
      {/*<div className="App">
      <header className="App-header">
        <Wallet />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          UBI Chain.
        </p>
      </header>
    </div>*/}
    </Box>
  );
}

export default App;
