import React from 'react';
import { ethers, providers } from "ethers";
import abi from 'abi/poh';

export default function Node(props) {
  return (
    <p>
      {props.address}
    </p>
  )
}
