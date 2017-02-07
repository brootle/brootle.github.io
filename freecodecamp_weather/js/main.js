$(function () {
  
  var coordinates = '';
  var url;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      coordinates+=position.coords.latitude + ',' + position.coords.longitude;
      console.log(coordinates);
      
      url = 'https://api.wunderground.com/api/7f0451b8da14a202/conditions/forecast/q/' + coordinates + '.json'     
      
      // send request to the weather server
      $.ajax( {
        url: url,
        success: function(data) {
          $(".temp").html(data.current_observation.temp_c);
          console.log(data.current_observation.temp_c);
        },
        cache: false
      });       
      
    });
  }    

});