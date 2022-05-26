import React from 'react';
import { ethers, providers } from "ethers";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { config } from 'config'
import { useState, useEffect } from 'react';

import Node from 'components/Node/Node';

export default function Wallet() {

  const [web3Modal, setWeb3Modal] = useState(null)
  const [address, setAddress] = useState("")

  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: config.api.infura,
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
    const provider = await web3Modal.connect();
    
    addListeners(provider);

    const ethersProvider = new providers.Web3Provider(provider)
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)

  }

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      window.location.reload()
    });
  }

  return (
    <div>
      {(!address) ? 
        <button onClick={connectWallet}>Connect wallet</button>
        :
        <Node address={address} />
      }
    </div>
  )
}