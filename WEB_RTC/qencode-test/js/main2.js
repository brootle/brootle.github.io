import {QencodeWebRTC} from './qencodeWebRTC.js'

        // Get camera and microphone
        const videoElement = document.querySelector("video");
        const audioSelect = document.querySelector("select#audioSource");
        const videoSelect = document.querySelector("select#videoSource");

   

        audioSelect.onchange = getStream;
        videoSelect.onchange = getStream;

        getStream()
            .then(getDevices)
            .then(gotDevices);

        function getDevices() {
            return navigator.mediaDevices.enumerateDevices();
        }

        function gotDevices(deviceInfos) {
            window.deviceInfos = deviceInfos;
            for (const deviceInfo of deviceInfos) {
                    const option = document.createElement("option");
                    option.value = deviceInfo.deviceId;
                if (deviceInfo.kind === "audioinput") {
                    option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
                    audioSelect.appendChild(option);
                } else if (deviceInfo.kind === "videoinput") {
                    option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
                    videoSelect.appendChild(option);
                }
            }
        }

        function getStream() {
            if (window.stream) {
                window.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
            const audioSource = audioSelect.value;
            const videoSource = videoSelect.value;
            const constraints = {
                audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
                video: { deviceId: videoSource ? { exact: videoSource } : undefined }
            };
            return navigator.mediaDevices
                .getUserMedia(constraints)
                .then(gotStream)
                .catch(handleError);
        }

        function gotStream(stream) {
            window.stream = stream;
            audioSelect.selectedIndex = [...audioSelect.options].findIndex(
                option => option.text === stream.getAudioTracks()[0].label
            );
            videoSelect.selectedIndex = [...videoSelect.options].findIndex(
                option => option.text === stream.getVideoTracks()[0].label
            );
            videoElement.srcObject = stream;

            //console.log("STREAM WAS RECEIVED: ", stream)
            enableStreaming(stream)
        }

        function handleError(error) {
            console.error("Error: ", error);
        }            


function enableStreaming(stream){
    let webSocketUrl = "wss://webrtc2.qencode.com:3334/qlive/obs?direction=send&transport=tcp"

    let connectBtn = document.querySelector('#connect')
    let disconnectBtn = document.querySelector('#disconect')

    let options = {
        stream,
        webSocketUrl
    }

    let qencodeWebRTC = new QencodeWebRTC(options)

    connectBtn.addEventListener('click', () => {
        qencodeWebRTC.connect()
    })

    disconnectBtn.addEventListener('click', () => {
        qencodeWebRTC.destroy()
    })       
}

//document.querySelector('#showVideo').addEventListener('click', e => init(e));