import React, { Component } from 'react';
import { ethers } from "ethers";
import { abi } from 'abi/poh';

export default class Node extends Component {

  constructor(props) {
    super();

    this.state = {
      isHuman: false,
      verified: false
    }

    // Connect to the network
    let provider = ethers.getDefaultProvider();

    // The address from the above deployment example
    let contractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb";

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
      <p>
        {(this.state.isHuman) ?
          <p>Human</p>
          :
          <p>
            {(this.state.verified) ?
              <p>Not Human</p>
              :
              <p>...</p> 
            }
          </p>
        }
        {this.props.address}
      </p>
    )
  }
}

