import React from 'react';
import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { useState, useEffect } from 'react';

export default function Wallet(props) {

  const [web3Modal, setWeb3Modal] = useState(null)
  const [address, setAddress] = useState("")

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

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if(web3Modal && web3Modal.cachedProvider){
      connectWallet()
    }
  }, [web3Modal])


  async function connectWallet() {
    console.log(`connectWallet`);
    const provider = await web3Modal.connect();
    const ethersProvider = new providers.Web3Provider(provider)
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect wallet</button>
      <p>{address}</p>
    </div>
  )
}