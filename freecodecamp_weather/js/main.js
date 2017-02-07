$(function () {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("lat");
      $(".data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    });
  }  
  

  requestData();
 
  function updateData(data){
    $(".temp").html(data.main.temp);
    console.log(data.main.temp);
  }
  
  function requestData() {

    var parameters = {
      //APPID: 'a2ce32793e8c42f241c8406454237456',
      //units: 'metric',
      //lat: 35,
      //lon: 139
      //q: "London"
      //q: $("#q").val()
    };

    $.getJSON("https://api.darksky.net/forecast/d1a585bda5231adf962f8274b9a44cff/37.8267,-122.4233", parameters)
      .done(function (data, textStatus, jqXHR) {
      
      updateData(data);
      // here we analyze data and add search results to the page
      console.log(data);

    })
      .fail(function (jqXHR, textStatus, errorThrown) {

      // log error to browser's console
      console.log(errorThrown.toString());
    });
  }  

//   function requestData() {

//     var parameters = {
//       APPID: 'a2ce32793e8c42f241c8406454237456',
//       units: 'metric',
//       //lat: 35,
//       //lon: 139
//       q: "London"
//       //q: $("#q").val()
//     };

//     $.getJSON("http://api.openweathermap.org/data/2.5/weather", parameters)
//       .done(function (data, textStatus, jqXHR) {
      
//       updateData(data);
//       // here we analyze data and add search results to the page
//       console.log(data);

//     })
//       .fail(function (jqXHR, textStatus, errorThrown) {

//       // log error to browser's console
//       console.log(errorThrown.toString());
//     });
//   }
  
  
});