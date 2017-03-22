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

  function streamDataByChannelsList(channel){

    // WORKS https://api.twitch.tv/kraken/streams?channel=twitchpresents,rocketbeanstv,freecodecamp,ognglobal,basetradetv,lck1

    // Works for 1 stream - https://api.twitch.tv/kraken/streams/lck1    

    const myRequest = new Request(`https://api.twitch.tv/kraken/streams/${channel}`, myInit);                

    fetch(myRequest)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Error');    
    })
    .then(function(data) {
      console.log("STREAM: ",data); // iliakan
      
      // for(var i = 0; i < data.follows.length; i++){
      //   console.log(data.follows[i].channel.name);
      // }

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
      console.log("FETCH: ",data); // iliakan
      //console.log(data.follows[0].channel.name);
      // buttons.forEach(button => button.addEventListener('mouseout',stopPlayingSound));  

      // if user doesn't follow - show message that use doesn't follow anyone
      if(data.follows.length === 0){
        // this user doesn't follow anyone - dfsfsdf
        throw new Error("User doesn't follow anyone"); 
      }
      
      for(var i = 0; i < data.follows.length; i++){
        console.log(data.follows[i].channel.name);
      }

      // we must make request putting all channels in the list
      // if nothing for some channel, it means channel is offline
      // and we put other data
      streamDataByChannelsList("twitchpresents");
      // inside channel ->
      //    name : "towelliee"
      //    url : "https://www.twitch.tv/towelliee"
      //    display_name : "Towelliee"
      //    followers : 532333
      //    video_banner : "https://static-cdn.jtvnw.net/jtv_user_pictures/towelliee-channel_offline_image-3150e70fb21cd00f-640x360.jpeg"

      // get stream data by channel name

      // get past broadcasts https://api.twitch.tv/kraken/channels/george/videos?broadcasts=true

      // here we will get a list of accounts that we follow
      // check status of each account in a loop if it's streaming and so on 
      // so we basically create array of objects
      // and only after this we can display all data
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // show warning message
      document.querySelector('.warning-message > span').textContent = error.message;
      document.querySelector('.warning-message').classList.add('show');
    });   
  }


  // $('.search-button').on('click', function () {
  //         wikiSearch()
  // });
  
  // $("#search-field").keyup(function (e) {
  //     if (e.keyCode == 13) {
  //         wikiSearch()
  //     }
  // });
  

});











// document.addEventListener('DOMContentLoaded', function () {
//   console.log('DOM loaded with JavaScript');    

  // 228vrv5r23r977hm0q1ntnvefq6sge - ID
  // 'https://api.twitch.tv/kraken/streams/' + YOUR_CHANNEL_NAME
  // several channels https://api.twitch.tv/kraken/streams?channel=trick2g,beyondthesummit2,starladder1

  // how to use fetch https://learn.javascript.ru/fetch

  // const streams = ['freecodecamp', 'lck1', 'ognglobal', 'basetradetv', 'twitchpresents',
  //                   'comster404', 'riotgames','lirik','ogamingsc2','imaqtpie','cohhcarnage']; 

  // const parameters = {
  //   channel:streams
  // };     

  // //url: 'https://api.twitch.tv/kraken/streams',

  // var http = new XMLHttpRequest();
  // var url = "https://api.twitch.tv/kraken/streams";
  // var params = JSON.stringify(parameters);
  // //console.log(params);
  // http.open("GET", url, true);

  // http.setRequestHeader("Content-type", "application/json; charset=utf-8");
  // http.setRequestHeader('Client-ID', '228vrv5r23r977hm0q1ntnvefq6sge');

  // http.onreadystatechange = function(data) {
  //     if(this.readyState == 4 && this.status == 200) {
  //         data = JSON.parse(this.responseText);
  //         console.log("JavaScript: ",data);
  //     }
  // };
 
  // http.send(params);  

// });



// $(function () {

  // Hint: Here's an array of the Twitch.tv usernames of people who regularly stream: 
  // ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", 
  // "RobotCaleb", "noobs2ninjas"]  

  // ognglobal - basetradetv - lck1 - twitchpresents

  // works - https://api.twitch.tv/kraken/channels/freecodecamp
  
  // freecodecamp

  // /kraken/streams?game=Diablo+III&channel=test_channel,test_channel_2

  // https://api.twitch.tv/kraken/streams?channel=rocketbeanstv,freecodecamp

  // WORKS https://api.twitch.tv/kraken/streams?channel=twitchpresents,rocketbeanstv,freecodecamp,ognglobal,basetradetv,lck1

  // Works for 1 stream - https://api.twitch.tv/kraken/streams/lck1

  // MUST check for non-existing streams like comster404
  //  https://api.twitch.tv/kraken/channels/comster404

  // works for 1 channel https://api.twitch.tv/kraken/channels/lck1'

  // fuck.. looks like will need to loop to check each channel

  // ognglobal - basetradetv - lck1 - twitchpresents

    // get articles by a postal code in JSON format
    // var parameters = {
    //     geo: place["postal_code"]
    // };
    // $.getJSON("articles.php", parameters)  

    // https://api.twitch.tv/kraken/users/<user ID>/follows/channels
    // https://api.twitch.tv/kraken/users/${user}/follows/channels

    ///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    //// WORKS

    // var user = 'brootletv';

    // const streams = ['freecodecamp', 'lck1', 'ognglobal', 'basetradetv', 'twitchpresents',
    //                   'comster404', 'riotgames','lirik','ogamingsc2','imaqtpie','cohhcarnage']; 

    // const parameters = {
    //   //channel:streams
    // };    

    // $.getJSON({
    //   type: "GET",
    //   //url: 'https://api.twitch.tv/kraken/streams',
    //   url: `https://api.twitch.tv/kraken/users/${user}/follows/channels`,
    //   headers: {
    //     'Client-ID': '228vrv5r23r977hm0q1ntnvefq6sge'
    //   }
    // }, parameters)
    // .done(function(data, textStatus, jqXHR) {
    //   console.log(data);
    // })
    // .fail(function(jqXHR, textStatus, errorThrown) {
    //   // log error to browser's console
    //   console.log("fdssssssssssssssssssssssssssssss");
    //   console.log(errorThrown.toString());
    // });  

    // /////////////////// getting stream details

    // $.getJSON({
    //   type: "GET",
    //   url: 'https://api.twitch.tv/kraken/streams',
    //   //url: `https://api.twitch.tv/kraken/users/${user}/follows/channels`,
    //   headers: {
    //     'Client-ID': '228vrv5r23r977hm0q1ntnvefq6sge'
    //   }
    // }, parameters)
    // .done(function(data, textStatus, jqXHR) {
    //   console.log(data);
    // })
    // .fail(function(jqXHR, textStatus, errorThrown) {
    //   // log error to browser's console
    //   console.log("fdssssssssssssssssssssssssssssss");
    //   console.log(errorThrown.toString());
    // });     

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ///////////////////////////////////////////////



  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api.twitch.tv/kraken/channels/comster404',
  //   headers: {
  //     'Client-ID': '228vrv5r23r977hm0q1ntnvefq6sge'
  //   },
  //   success: function(data) {
  //     console.log(data);

  //     //var html = 'dsfdsfds';

  //     // for(var i = 0; i < data[1].length; i++){
        
  //     //   html += "<a href='" + data[3][i] + "' target='_blank'>";

  //     //   html +="<h2>" + data[1][i] + "</h2>";

  //     //   html +="<p>" + data[2][i] + "</p>";

  //     //   html += "</a>";

  //     // }

  //     //$(".search-result").html(html);

  //   }
  // });  


// });