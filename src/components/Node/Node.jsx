import React, { Component } from 'react';
import { ethers } from "ethers";
import { abi } from 'abi/ubi';
import { config } from 'config';
import Peer from 'peerjs';
import Account from 'components/Account/Account';
import Balance from 'components/Balance/Balance';
import { ReactComponent as Logo } from 'images/logo.svg';

export default class Node extends Component {

  constructor(props) {
    super();
 
    this.address = props.address;
    this.relayServer = config.relay.server;
    this.peer = new Peer();
    this.peerList = [];
    this.provider = new ethers.providers.InfuraProvider("mainnet", config.provider.walletconnect.options.infuraId);

    this.state = {
      isHuman: false,
      verified: false,
      peers: []
    }

    console.log(Logo);
  }

  async componentDidMount() {
    this.setState({ peers: await this.getPeers() });
  }

  // Connects to a relay server to obtain the address of other peers.
  async getPeers() {
    this.peer = new Peer(this.address, {
      host: this.relayServer,
      port: config.relay.port,
      path: config.relay.path
    });

    const peerList = await this.peer.listAllPeers(res => this.setState({ peers: res }));
    return peerList;
  }

  render() {
    return (
      <>
        <Balance address={this.props.address} token={config.contract.ubi} abi={abi} icon={Logo} provider={this.provider} />
        <Account address={this.props.address} provider={this.provider} />
        {/** <p>
          Connected Peers:
          {JSON.stringify(this.state.peers)}
        </p> **/}
      </>
    )
  }
}

