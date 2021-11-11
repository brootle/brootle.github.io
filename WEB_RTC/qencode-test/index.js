// export function qPlayer() {
//     console.log("Hello")
// }

export function QencodeWebRTC(params) {

    let that = {};

    function initialize(){
        console.log("Initialize connection")
        console.log("Init params: ", params)
    }

    function closePeer(){
        console.log("Close Peer connection")
    }    

    that.connect = () => {
        return initialize();
    };

    that.destroy = () => {
        closePeer();
    };

    return that;
}

// const QencodeWebRTCLoader = function () {
//     console.log("Loading....")
// }

// export default QencodeWebRTCLoader;
