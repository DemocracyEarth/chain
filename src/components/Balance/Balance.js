import React from 'react';
import Chip from '@mui/material/Chip';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import SvgIcon from '@mui/material/SvgIcon';

const numeral = require('numeral');

const _getBalanceLabel = (quantity, decimals, format) => {
  const zeroes = (!decimals) ? 0 : Number(decimals);
  return numeral(new BigNumber(quantity).dividedBy(Math.pow(10, zeroes)).toNumber()).format(format);
}

const Balance = ({ address, token, abi, icon, provider }) => {

  const [balance, setBalance] = useState(0);

  async function getBalance() {
    const contractAddress = token;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balanceOf = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    console.log(decimals);
    setBalance(_getBalanceLabel(ethers.BigNumber.from(balanceOf).toString(), decimals, '0,0.00'));
  }

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (ethers.utils.getAddress(address)) {
      getBalance();
    }

  }, [balance])

  return (
    <Chip
      icon={<SvgIcon inheritViewBox={true} component={icon} />}
      label={balance}
    />
  )
}

export default Balance;