import Peer from 'peerjs';
import { config } from 'config';

/**
* @summary Creates a block of transactions.
*/
export default class Socket {
  constructor(id, relayServer) {
    this.id = id;
    this.relayServer = relayServer;
    this.peer = new Peer();
    this.peerList = [];
  }

  // Connects to a relay server to obtain the address of other peers.
  async getPeers() {
    this.peer = new Peer(this.id, {
      host: this.relayServer,
      port: config.relay.port,
      path: config.relay.path
    });

    console.log(`List connected peers obtained from relayer:`)
    const peerList = await this.peer.listAllPeers(list => console.log(list));
    return peerList;
  }

  // Compose message to be transmitted to a peer
  produceMessage(type, data) {
    return { type, data };
  }
}
