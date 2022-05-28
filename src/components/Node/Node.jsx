import React, { Component } from 'react';
import { ethers } from "ethers";
import { abi } from 'abi/poh';
import { config } from 'config';
import Peer from 'peerjs';

export default class Node extends Component {

  constructor(props) {
    super();
 
    this.id = props.address;
    this.relayServer = config.relay.server;
    this.peer = new Peer();
    this.peerList = [];
    
    this.state = {
      isHuman: false,
      verified: false,
      peers: []
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
    this.setState({ peers: await this.getPeers() });
  }

  // Connects to a relay server to obtain the address of other peers.
  async getPeers() {
    this.peer = new Peer(this.id, {
      host: this.relayServer,
      port: config.relay.port,
      path: config.relay.path
    });

    console.log(`List connected peers obtained from relayer:`)
    const peerList = await this.peer.listAllPeers(res => this.setState({ peers: res }));
    return peerList;
  }

  render() {
    return (
      <>
        {(this.state.isHuman) ?
          <p>Human Node — Can Validate</p>
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
        <p>
          Connected Peers:
          {JSON.stringify(this.state.peers)}
        </p>
      </>
    )
  }
}

