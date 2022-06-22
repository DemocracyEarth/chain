import React from 'react';
import Chip from '@mui/material/Chip';
import { ethers, utils } from "ethers";
import { useEffect, useState, useCallback } from 'react';
import BigNumber from 'bignumber.js/bignumber';
import { config } from 'config';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const numeral = require('numeral');

const _getBalanceLabel = (quantity, decimals, format) => {
  const zeroes = (!decimals) ? 0 : Number(decimals);
  return numeral(new BigNumber(quantity).dividedBy(Math.pow(10, zeroes)).toNumber()).format(format);
}

const Balance = ({ address, token, abi, provider }) => {

  const [balance, setBalance] = useState(0);
  const [symbolIcon, setIcon] = useState('');
  const [labelName, setLabel] = useState('');

  const getBalance = useCallback(async () => {
    const contractAddress = token;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balanceOf = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const ticker = await contract.symbol();
    const number = _getBalanceLabel(ethers.BigNumber.from(balanceOf).toString(), decimals, '0,0.00');
    const image = `${config.api.icons.replace('{{publicAddress}}', utils.getAddress(token))}`;
    setLabel(await contract.name())
    setIcon(image);
    setBalance(`${number} ${ticker}`);
  }, [abi, address, provider, token]);

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (ethers.utils.getAddress(address)) {
      getBalance();
    }

  }, [getBalance, address]);

  return (
    <Tooltip title={labelName} arrow>
      <Chip
        avatar={<Avatar src={symbolIcon} />}
        label={balance}
      />
    </Tooltip>
  )
}

export default Balance;