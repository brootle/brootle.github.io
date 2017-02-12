$(function () {
  
// https://api.wunderground.com/api/7f0451b8da14a202/conditions/forecast/q/49.5638034,34.4923746.json

  var url = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json';

  // send request to the weather server
  $.ajax( {
      url: url,
      //data: queryData,
      //dataType: 'json',
      type: 'POST',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(data) {

        console.log(data);
      }

  } );    

});