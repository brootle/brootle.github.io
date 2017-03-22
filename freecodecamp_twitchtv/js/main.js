document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript : Using Fetch');    

  const myHeaders = new Headers({'Client-ID': '228vrv5r23r977hm0q1ntnvefq6sge'});

  const myInit = { method: 'GET', headers: myHeaders};  

  document.querySelector('.search-button').addEventListener('click',function(){
    console.log("searching....");
    // remove any error message
    document.querySelector('.warning-message').classList.remove('show');

    var user = document.getElementById('search-field').value;
    channelsByUser(user);
  })

  //channelsByUser('brootletv');

  // this user doesn't follow anyone - dfsfsdf

  function buildInitialHTML(channelsArray){
    var searchResult = document.querySelector('.search-result');

    var html = '';

    for(var i = 0; i < channelsArray.length; i++){
      html+=`
        <a id="${channelsArray[i].name}" href="${channelsArray[i].url}" target="_blank" data-channel="twitchpresents" data-status="online"
            style="background-image: url(${channelsArray[i].video_banner});">
            <div class="result-header">
                <span class="result-header-name">${channelsArray[i].display_name}</span><span class="result-header-followers">${channelsArray[i].followers} followers</span>
            </div>
            <div class="result-title">
                <span>${channelsArray[i].game}</span>
            </div>
            <div id="${channelsArray[i].name}_result-footer" class="result-footer loading">
                <span class="result-footer-status">Loading...</span>
            </div>
        </a>    
      `;
    }    


    searchResult.innerHTML = html;
  }

  function updateChannelHTML(channel,dataObject){
    var channelHTML = document.getElementById(channel);
    var footerToUpdate = document.getElementById(channel+'_result-footer');

    channelHTML.style.backgroundImage = `url('${dataObject.preview}')`;

    // just set class without loading or offline
    footerToUpdate.className = "result-footer";

    footerToUpdate.innerHTML = `
      <span class="result-footer-status">online</span><span class="result-footer-viewers">${dataObject.viewers} viewers</span>
    `;
  }

  function changeLoadingToOffline(){
    var allLoadingElements = document.querySelectorAll('.loading');

    allLoadingElements.forEach(element => {
      element.className = 'result-footer offline';
      element.innerHTML = `<span class="result-footer-status">offline</span>`;      
    });
   
  }

  function streamDataByChannelsList(channels){

    // WORKS https://api.twitch.tv/kraken/streams?channel=twitchpresents,rocketbeanstv,freecodecamp,ognglobal,basetradetv,lck1

    // Works for 1 stream - https://api.twitch.tv/kraken/streams/lck1    

    const myRequest = new Request(`https://api.twitch.tv/kraken/streams?channel=${channels}`, myInit);                

    fetch(myRequest)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Error');    
    })
    .then(function(data) {
      console.log("STREAM: ",data); // iliakan
      
      // data has array of online streams
      // so we get data-channel="twitchpresents"
      // and get
      //    viewers : 26142
      //    game : "League of Legends"
      //    preview.large : "https://static-cdn.jtvnw.net/previews-ttv/live_user_lck1-640x360.jpg"

      for(var i = 0; i < data.streams.length; i++){
        var channelName = data.streams[i].channel.name;
        var dataObject = {};
        dataObject.viewers = data.streams[i].viewers;
        dataObject.preview = data.streams[i].preview.large;

        updateChannelHTML(channelName,dataObject);
      }

      changeLoadingToOffline();


    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });   
  }

  function channelsByUser(user){
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    const myRequest = new Request(`https://api.twitch.tv/kraken/users/${user}/follows/channels`, myInit);                

    fetch(myRequest)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Account not found');    
    })
    .then(function(data) {

      // if user doesn't follow - show message that use doesn't follow anyone
      if(data.follows.length === 0){
        // this user doesn't follow anyone - dfsfsdf
        throw new Error("User doesn't follow anyone"); 
      }
      
      var channels = [];

      var channelObjArray = [];
      
      for(var i = 0; i < data.follows.length; i++){
        channels.push(data.follows[i].channel.name);
        var singleChannelObj = {};
        singleChannelObj.name = data.follows[i].channel.name;
        singleChannelObj.display_name =  data.follows[i].channel.display_name;
        singleChannelObj.followers = data.follows[i].channel.followers;
        singleChannelObj.game = data.follows[i].channel.game;
        singleChannelObj.url = data.follows[i].channel.url;
        if(data.follows[i].channel.video_banner !== null){
          singleChannelObj.video_banner = data.follows[i].channel.video_banner;
        }else{
          singleChannelObj.video_banner = 'http://techgirl.co.za/wp-content/uploads/2016/08/Twitch-logo-720p.jpg'
        }
        channelObjArray.push(singleChannelObj);
      }

      console.log("channelObjArray",channelObjArray);
      buildInitialHTML(channelObjArray);

      console.log(channels);
      // after we got channels we can build elements on a page
      // and after we got info on streams we just update elements

      // we must make request putting all channels in the list
      // if nothing for some channel, it means channel is offline
      // and we put other data
      
      streamDataByChannelsList(channels);    

    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // show warning message
      document.querySelector('.warning-message > span').textContent = error.message;
      document.querySelector('.warning-message').classList.add('show');
    });   
  }

});