const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001

// this is a string with all websocket connections separated by coma
// 1st we check is process.env.PEERS exists
// if yes we split string into array and assign to our variable
// if it doesn't exist we just assign empty array
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// define P2p class
class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new Websocket.Server({ port: P2P_PORT });
        // listen to some event and trigger callback function when event happens
        
        server.on('connection', socket => this.connectSocket(socket));   

        this.connectToPeers();

        console.log(`Listening for P2P connections on port: ${P2P_PORT}`);
    }

    // server started at 
    // HTTP_PORT=3001 P2P_PORT=5001

    // we manually connect to started server from another HTTP_PORT but to same host 5001
    // HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev    

    // and we can connect to all existing hosts
    // HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev     

    // HTTP_PORT=3006 P2P_PORT=5006 PEERS=ws://localhost:5001 npm run dev 

    // we create socket connection to existing host
    // check https://github.com/15Dkatz/sf-chain-guides/blob/master/app/p2p-server.js
    // see what is using the port: $ lsof -i :3001
    connectToPeers(){        
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            console.log("Trying to connect other peers......");
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    // just add socket to the list of sockets
    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket connected");

        this.messageHandler(socket);

        // transmit message as JSON string when socket gets connected
        // socket.send(JSON.stringify(this.blockchain.chain)); // we replace it with helper function
        this.sendChain(socket);
    }

    // when socket gets some message we handle it
    messageHandler(socket){
        socket.on('message', message =>{
            const data = JSON.parse(message); // convert JSON format message back to objet
            // console.log('data: ', data); // just printing data when our socket gets some message

            // replace chain with updated one
            this.blockchain.replaceChain(data);
        });
    }

    // helper function that send chain to connected socket
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    // send updated chain to all connected peers
    syncChains(){
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports = P2pServer;