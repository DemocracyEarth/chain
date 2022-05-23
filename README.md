<p align="center">
<img src="src/images/logo.svg" width="200" title="UBI">
</p>

# UBI Chain

A very tiny blockchain for browsers. 

## Features

  - [X] Spin up a node from a browser.
  - [X] One node per human via [Proof of Humanity](https;//github.com/Proof-of-Humanity)
  - [X] [UBI](https://github.com/DemocracyEarth/ubi) for gas and fees.
  
## Available Scripts

In the project directory, you can run:

### `npm run dev`

Recommended. Will run the JSON RPC Server, the Peer Relayer and the UBI Chain all at once.\
Open [http://localhost:3000](http://localhost:3000) to interact with UBI Chain. 
Configure your Metamask to connect with a new network on [http://localhost:8585](http://localhost:8585).
Peers will be able discover other connected nodes on the network using port 9000.

### `npm run rpc`

Runs the JSON RPC Server for Ethereum-compatible wallets.\

### `npm run relayer`

Runs Relay Server that will connect with other peers on the network.\

### `npm start`

Runs the chain on the browser in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
