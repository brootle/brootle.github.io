const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

app.use(bodyParser.json());

app.get('/blocks', (req, res)=>{
    res.json(blockchain.chain);
});

app.post('/mine', (req, res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    // sync chain with all connected peers everytime new block added to the chain
    p2pServer.syncChains();

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, function () {
  console.log(`app listening on port ${HTTP_PORT}! if locally, that's at http://localhost:${HTTP_PORT}/`)
});

// now let's also start websocket server
p2pServer.listen(); 

// start app with env variables
// $ HTTP_PORT=8080 P2P_PORT=5080 PEERS=ws:localhost:5081 npm run dev                                             


// used localy before
// const PORT = process.env.PORT || 8080
// app.listen(PORT, function () {
//   console.log(`app listening on port ${PORT}! if locally, that's at http://localhost:8080/`)
// });


// in cloud9
// app.listen(process.env.PORT,process.env.IP, function () {
//   console.log(`app listening on port ${process.env.PORT} and IP ${process.env.IP}!`)
// })