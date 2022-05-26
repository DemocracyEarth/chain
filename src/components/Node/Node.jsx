import React, { Component } from 'react';
import { ethers } from "ethers";
import { abi } from 'abi/poh';
import { config } from 'config';

export default class Node extends Component {

  constructor(props) {
    super();

    this.state = {
      isHuman: false,
      verified: false
    }

    // Connect to the network
    let provider = new ethers.providers.InfuraProvider("mainnet", config.provider.walletconnect.options.infuraId);

    // The address from the above deployment example
    let contractAddress = config.contract.proofofhumanity;

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    this.contract = new ethers.Contract(contractAddress, abi, provider);
  }

  async componentDidMount() {
    await this.isHuman();
  }

  async isHuman() {
    // Get the current value
    this.setState({ isHuman: await this.contract.isRegistered(this.props.address), verified: true });
  }

  render() {

    return (
      <>
        {(this.state.isHuman) ?
          <p>Human</p>
          :
          <p>
            {(this.state.verified) ?
              'Not Human'
              :
              '...'
            }
          </p>
        }
        {this.props.address}
      </>
    )
  }
}

