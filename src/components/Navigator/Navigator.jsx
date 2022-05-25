import React from 'react';
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { useState, useEffect } from 'react';

export default function Navigator(props) {

  const [web3Modal, setWeb3Modal] = useState(null)

  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'YOUR_INFURA_KEY',
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])

  async function connectWallet() {
    console.log('test');
    const provider = await web3Modal.connect();
  }

  return <button onClick={connectWallet}>Connect wallet</button>
}