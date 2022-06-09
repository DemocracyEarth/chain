import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { ethers } from "ethers";
import { abi } from 'abi/poh';
import { config } from 'config';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';

const makeBlockie = require('ethereum-blockies-base64');

const Account = ({ address, provider }) => {
  
  const [avatar, setAvatar] = useState("");
  const [publicAddress, setAddress] = useState("");
  const [human, setHuman] = useState(0);

  async function getAvatar() {
    const ensAddress = await provider.lookupAddress(address);
    const avatarURL = await provider.getAvatar(address);
    (avatarURL) ? setAvatar(avatarURL) : setAvatar(makeBlockie(address));
    (ensAddress) ? setAddress(ensAddress) : setAddress(_shortenCryptoName(ethers.utils.getAddress(address)));
  }

  async function isHuman() {
    const contractAddress = config.contract.proofofhumanity;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const humanBadge = (await contract.isRegistered(address)) ? '👍' : '🤖'
    setHuman(humanBadge);
  }
  
  const _shortenCryptoName = (publicAddress) => {
    if (publicAddress.length === 42 && publicAddress.slice(0, 2) === '0x') {
      return `${publicAddress.slice(0, 6)}...${publicAddress.slice(38, 42)}`.toUpperCase();
    }
    return publicAddress;
  };

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (ethers.utils.getAddress(address)) {
      getAvatar();
      isHuman();
    }

  }, [avatar, publicAddress])

  return (
    <Badge color="primary" badgeContent={human.toString()}>
      <Chip
        avatar={<Avatar alt={ethers.utils.getAddress(address)} src={avatar} />}
        label={publicAddress}
      />
    </Badge>
  )
}

export default Account;