import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { providers } from "ethers";

const makeBlockie = require('ethereum-blockies-base64');

const Account = ({ address, provider }) => {
  
  const [avatar, setAvatar] = useState("")
  const [publicAddress, setAddress] = useState("")

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (ethers.utils.getAddress(address)) {
      getAvatar();
    }
    
  }, [avatar, publicAddress])

  async function getAvatar() {
    const ensAddress = await provider.lookupAddress(address);
    const avatarURL = await provider.getAvatar(address);

    if (avatarURL) {
      setAvatar(avatarURL)
    } else {
      setAvatar(makeBlockie(address));
    }
    
    if (ensAddress) {
      setAddress(ensAddress);
    } else {
      setAddress(_shortenCryptoName(ethers.utils.getAddress(address)));
    }
  }
  
  const _shortenCryptoName = (publicAddress) => {
    if (publicAddress.length === 42 && publicAddress.slice(0, 2) === '0x') {
      return `${publicAddress.slice(0, 6)}...${publicAddress.slice(38, 42)}`.toUpperCase();
    }
    return publicAddress;
  };

  return (
    <Chip
      avatar={<Avatar alt={ethers.utils.getAddress(address)} src={avatar} />}
      label={publicAddress}
    />
  )
}

export default Account;