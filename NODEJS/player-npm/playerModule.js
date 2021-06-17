export function player(id, params) {

    // let url = "https://player-static.qencode.com/release/qencode-bootstrapper.min.js"

    // function dynamicallyLoadScript(url) {
    //     var script = document.createElement("script");  // create a script DOM node
    //     script.src = url;  // set its src to the provided URL
    
    //     document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    // }

    // dynamicallyLoadScript(url)

    let url = "https://player-static.qencode.com/qa/qencode-bootstrapper.min.js"

    function loadScript(url, callback){
        // Adding the script tag to the head as suggested before
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
    
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;
    
        // Fire the loading
        head.appendChild(script);
    }

    var myPrettyCode = function() {
        console.log("Player id: ", id);
        console.log("Player params: ", params);  
        console.log("qPlayer: ", qPlayer);   

        qPlayer(id, params);          
    };    

    loadScript(url, myPrettyCode);

    //qPlayer(id, params);  
}

// https://javascript.info/modules-intro
// https://hackernoon.com/converting-your-js-boiler-plate-into-npm-modules-the-definitive-guide-3dfa0f9f0a9c


{/* <script src='https://player-static.qencode.com/release/qencode-bootstrapper.min.js'></script>
<div id='player'></div>
<script>
    qPlayer('player', {
        licenseKey: 'f2234b90-8d26-6b9e-637c-eb62a5e79edb',
        videoSources: { src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" }
    });  
</script>   */}