import Peer from 'peerjs';

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
      port: 9000,
      path: '/myapp'
    });

    console.log(`List connected peers obtained from relayer:`)
    console.log(this.peer);
    await this.peer.listAllPeers(list => console.log(list));
  }

  // Compose message to be transmitted to a peer
  produceMessage(type, data) {
    return { type, data };
  }
}
