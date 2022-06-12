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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import WaterDamageTwoToneIcon from '@mui/icons-material/WaterDamageTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import EmergencyShareTwoToneIcon from '@mui/icons-material/EmergencyShareTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const drawerWidth = 240;

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

  const iconList = [<ChatBubbleTwoToneIcon />, <WaterDamageTwoToneIcon />, <EmergencyShareTwoToneIcon />, <SavingsTwoToneIcon />];

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {i18n.t('dapp-title')}
              </Typography>
              <Wallet />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {[i18n.t('chat'), i18n.t('node'), i18n.t('streams'), i18n.t('vaults')].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {iconList[index]}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </Box>
      </ThemeProvider>
    </Stack>
  );
}

export default App;
