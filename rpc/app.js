const express = require('express')
const bodyParser = require("body-parser");
const { JSONRPC, JSONRPCServer } = require("json-rpc-2.0");

const server = new JSONRPCServer();

console.log('Starting JSON-RPC server...')

// First parameter is a method name.
// Second parameter is a method itself.
// A method takes JSON-RPC params and returns a result.
// It can also return a promise of the result.
server.addMethod("echo", ({ text }) => text);
server.addMethod("log", ({ message }) => console.log(message));

const eth_chainId = (next, request, serverParams) => {
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

// Middleware will be called in the same order they are applied
server.applyMiddleware(eth_chainId, exceptionMiddleware);

server.addMethodAdvanced('eth_chainId', () => { 
  return {
    jsonrpc: JSONRPC,
    result: "0x1dcd65000",
  };
});

const app = express();
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const jsonRPCRequest = req.body;
  console.log('--> req.body')
  console.log(req.body);
  // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
  // It can also receive an array of requests, in which case it may return an array of responses.
  // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).
  server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
    console.log(`--> jsonRPCResponse:`);
    console.log(jsonRPCResponse);
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      // If response is absent, it was a JSON-RPC notification method.
      // Respond with no content status (204).
      res.sendStatus(204);
    }
  });
});

app.listen(8585);