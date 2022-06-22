const puppeteer = require('puppeteer');


function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function fetchRetry(url, delay, tries, fetchOptions = {}) {
  function onError(err) {
    triesLeft = tries - 1;
    if (!triesLeft) {
      console.log(`Could not fetch node server due to following error:`);
      console.log(err);
      throw err;
    }
    return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
  }
  console.log(`Connecting to node server on ${url}`);
  return await fetch(url, fetchOptions).catch(onError);
}

(async function () {
  const express = require('express')
  const bodyParser = require("body-parser");
  const server = await require('./src/build.js')

  // const PeerJS = require('peerjs').default;
  // const peer = new PeerJS();
  // console.log(peer);

  const app = express();

  /*
  const interval = setInterval(async function () {
    console.log('Reaching out local server from RPC node...')
    try {
      await fetch('http://127.0.0.1:3000/').then(async (res) => {
        console.log('Connected to local server.')
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // console.log(await page.goto('http://127.0.0.1:3000'));
        console.log(res);
        return res.json();
      });
      clearInterval(this);
    } catch (error) {
      console.log('error on connection');
      console.log(error);
    }
  }, 5000);*/
  await fetchRetry('http://127.0.0.1:3000', 5000, 10);
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000');

  console.log(page);
  


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

