import React from 'react';
import { providers } from "ethers";
import Web3Modal from 'web3modal'
import { config } from 'config'
import { useState, useEffect, useCallback } from 'react';
import { Fab } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import i18n from 'i18n';

import Node from 'components/Node/Node';

export default function Wallet() {

  const [web3Modal, setWeb3Modal] = useState(null)
  const [address, setAddress] = useState("")

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect();
    
    addListeners(provider);

    const ethersProvider = new providers.Web3Provider(provider)
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)

  }, [web3Modal]);

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload()
    });
  }

  useEffect(() => {
    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions: config.provider,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [web3Modal, connectWallet])
 
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