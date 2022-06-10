import React from 'react';
import Chain from 'components/Chain/Chain';
import Transaction from 'components/Transaction/Transaction';
import Wallet from 'components/Wallet/Wallet';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { config } from 'config';
import './App.css';
import i18n from 'i18n';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" enableColorOnDark color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {i18n.t('dapp-title')}
              </Typography>
              <Wallet />
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </Stack>
  );
}

export default App;
