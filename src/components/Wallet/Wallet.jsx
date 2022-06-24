import React from 'react';
import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal'
import { config } from 'config'
import { useState, useEffect, useCallback } from 'react';
import { Fab } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import i18n from 'i18n';

import Node from 'components/Node/Node';

export default function Wallet() {

  const [web3Modal, setWeb3Modal] = useState(null);
  const [nativeWallet, setNativeWallet] = useState(false);
  const [mnemonic, setMnemonic] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState("");
  const [walletSetup, setWalletSetup] = useState(false);

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload()
    });
  }

  // Connects to an existing Web3 Wallet
  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect();
    console.log(provider);

    addListeners(provider);

    console.log(`provider:`);
    console.log(provider);
    
    const ethersProvider = new providers.Web3Provider(provider)

    console.log(`ethersProvider:`);
    console.log(ethersProvider);

    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)

  }, [web3Modal]);

  // Generates a native wallet
  const generateWallet = useCallback(async () => {
    if (nativeWallet === false) {
      const wallet = ethers.Wallet.createRandom()
      console.log(wallet);
      console.log('address:', wallet.address)
      console.log('mnemonic:', wallet.mnemonic.phrase)
      console.log('privateKey:', wallet.privateKey)
      setNativeWallet(true);
      setMnemonic(wallet.mnemonic.phrase);
      setPrivateKey(wallet.privateKey);
      setAddress(wallet.address);
    }
  });

  useEffect(() => {
    console.log(`newWeb3Modal...`);
    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions: config.provider,
    });

    setWeb3Modal(newWeb3Modal)
    setWalletSetup(true);
  }, [])

  useEffect(() => {
    console.log(`walletSetup:`);
    console.log(walletSetup);
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      console.log(`running connectWallet`)
      connectWallet()
    } else if (walletSetup) {
      console.log('running GenerateWallet')
      generateWallet();
    }
  }, [web3Modal, connectWallet, walletSetup])
 
  return (
    <div>
      {(!address) ? 
        <Fab variant="extended" onClick={connectWallet}>
          <AccountBalanceWalletIcon sx={{ mr: 1 }} />
          {i18n.t('connect-wallet')}
        </Fab>
        :
        <Node address={address} />
      }
    </div>
  )
}