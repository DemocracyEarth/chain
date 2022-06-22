const puppeteer = require('puppeteer');

(async function () {
  const express = require('express')
  const bodyParser = require("body-parser");
  const server = await require('./src/build.js')

  // const PeerJS = require('peerjs').default;
  // const peer = new PeerJS();
  // console.log(peer);

  const app = express();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // console.log(await page.goto('https://localhost:3000'));
  const interval = setInterval(async function () {
    console.log('Reaching out local server from RPC node...')
    try {
      await fetch('http://127.0.0.1:3000/').then((res) => {
        console.log('Connected to local server.')
        console.log(res);
        offline = false;
        return res.json();
      });
    } catch (error) {
      console.log(error);
      console.log('... offline.');
    }
  }, 5000);

  // await browser.close();


  app.use(bodyParser.json());

  app.post("/", (req, res) => {
    const jsonRPCRequest = req.body;
    console.log(`Request: ${req.body.method}`);
    // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
    // It can also receive an array of requests, in which case it may return an array of responses.
    // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
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
  // var foo = await require("./theuppercode");
  // console.log(foo);
})();

