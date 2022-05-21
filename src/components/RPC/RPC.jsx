const { JSONRPCServer } = require("json-rpc-2.0");

/**
* @summary Creates a block of transactions.
*/
export default class RPC {
  constructor() {
    this.server = new JSONRPCServer();
    console.log(this.server);

    this.server.addMethod("echo", ({ text }) => text);
    this.server.addMethod("log", ({ message }) => console.log(message));
  }
}
