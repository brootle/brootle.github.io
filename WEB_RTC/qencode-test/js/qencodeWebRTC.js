import {
    ERRORS,
    PLAYER_WEBRTC_WS_ERROR,
    PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR,
    PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR,
    PLAYER_WEBRTC_CREATE_ANSWER_ERROR,
    PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR,
    PLAYER_WEBRTC_NETWORK_SLOW,
    PLAYER_WEBRTC_UNEXPECTED_DISCONNECT,
    OME_P2P_MODE
} from "./constants.js";

export function QencodeWebRTC(webSocketUrl) {

    let that = {};

    let ws = null;  
    //closed websocket by ome or client.
    let wsClosedByPlayer = false;
    // used for getting media stream from OME or host peer
    let mainPeerConnectionInfo = null;    

    function initialize(){
        // console.log("Initialize connection")
        // console.log("Init params: ", params)

        // initWebSocket()

        console.log("WebRTCLoader connecting...");

        return new Promise(function (resolve, reject) {

            console.log("WebRTCLoader url : " + webSocketUrl);

            initWebSocket(resolve, reject);
        });        

    }

    function closePeer(error){
        console.log("Close Peer connection")

        if (!error) {
            wsClosedByPlayer = true;
        }        

        if (ws) {
            console.log('Closing websocket connection...');
            console.log("Send Signaling : Stop.");
            /*
            0 (CONNECTING)
            1 (OPEN)
            2 (CLOSING)
            3 (CLOSED)
            */
            if (ws.readyState === 0 || ws.readyState === 1) {

                wsClosedByPlayer = true;

                if (mainPeerConnectionInfo) {
                    sendMessage(ws, {
                        command: 'stop',
                        id: mainPeerConnectionInfo.id
                    });
                }

                console.log("Closing socket connection...")
                ws.close();
            }

        } else {
            wsClosedByPlayer = false;
        }

        ws = null;   
        
        
        if (error) {
            //errorTrigger(error, provider);
            console.log("Error: ", error)
        }        

    }    

    // used for getting media stream from OME or host peer 
    function sendMessage(ws, message) {

        if (ws) {
            ws.send(JSON.stringify(message));
        }

    }        


    function initWebSocket(resolve, reject){
        try {            
            // Create WebSocket connection.
            ws = new WebSocket(webSocketUrl);

            ws.onopen = function(e) {
                console.log("[open] Connection established");
                sendMessage(ws, {
                    command: "request_offer"
                });            
            }        

            ws.onmessage = function(e) {
                console.log(`[message] Data received from server: ${e.data}`)

                const message = JSON.parse(e.data);

                if (message.command === 'offer') {

                    let iceServers =  message.iceServers || message.ice_servers;

                    console.log("createMainPeerConnection...")

                    console.log("message.id: ", message.id)
                    console.log("message.peer_id: ", message.peer_id)
                    console.log("message.sdp: ", message.sdp)
                    console.log("message.candidates: ", message.candidates)
                    console.log("iceServers: ", iceServers)

                    //createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, iceServers, resolve);
                    //createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, iceServers);
                }

                
            }

            ws.onclose = function(event) {
                if (event.wasClean) {
                    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    console.log('[close] Connection died')
                }
            }

            ws.onerror = function(error) {
                //console.log(`[error] ${error.message}`)

                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    let tempError = ERRORS.codes[PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                }                
            }  


        } catch (error) {
            closePeer(error);
        }
      
    }



    that.connect = () => {
        return initialize();
    };

    that.destroy = () => {
        closePeer();
    };

    return that;
}
