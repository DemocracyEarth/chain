

const { JsonRpcSigner } = require("@ethersproject/providers");
const { JSONRPC, JSONRPCServer } = require("json-rpc-2.0");
const fs = require('fs').promises;

async function loadRPC() {
  // const data = await fs.readFile("monolitic.txt", "binary");
  const data = await fs.readFile("./rpc/src/openrpc.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Open JSON RCP read failed:", err);
      return;
    }
    console.log("Open JSON RCP successfully opened.");
    return jsonString;
  });
  console.log('data:')
  return JSON.parse(data);
}

const ubiChain = (next, request, serverParams) => {
  console.log(`Received ${JSON.stringify(request)}`);
  return next(request, serverParams).then((response) => {
    console.log(`Responding ${JSON.stringify(response)}`);
    return {
      jsonrpc: JSONRPC,
      id: request.id,
      result: response.result,
    };
  });
}

const exceptionMiddleware = async (next, request, serverParams) => {
  try {
    return await next(request, serverParams);
  } catch (error) {
    if (error.code) {
      return createJSONRPCErrorResponse(request.id, error.code, error.message);
    } else {
      throw error;
    }
  }
};

async function mapRPC() {
  const openRPC = await loadRPC();
  const rpc = new JSONRPCServer();

  // Middleware will be called in the same order they are applied
  rpc.applyMiddleware(ubiChain, exceptionMiddleware);

  rpc.addMethodAdvanced('eth_chainId', () => {
    return {
      jsonrpc: JSONRPC,
      result: "0x388", //904 or closest looking number to POH
    };
  });

  rpc.addMethodAdvanced('eth_blockNumber', () => {
    return {
      jsonrpc: JSONRPC,
      result: "0x0",
    };
  });
  
  return rpc;
}

const server = mapRPC();


// First parameter is a method name.
// Second parameter is a method itself.
// A method takes JSON-RPC params and returns a result.
// It can also return a promise of the result.
// server.addMethod("echo", ({ text }) => text);
// server.addMethod("log", ({ message }) => console.log(message));


module.exports = server;
