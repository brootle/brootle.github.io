$(function () {
  
  //var url = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?";
  //var url = "https://en.wikipedia.org/w/api.php?action=query&titles=alex&format=json&callback=?";

// with images and text https://en.wikipedia.org/w/api.php?format=xml&action=query&generator=search&gsrnamespace=0&gsrsearch=alex&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max

// with titles and snippets https://en.wikipedia.org/w/api.php?action=query&list=search&format=xml&srsearch=alex&srnamespace=0&srprop=snippet&srlimit=10

// with full url https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=alex&format=xml&gsrprop=snippet&prop=info&inprop=url

// title + url + desctiption https://en.wikipedia.org/w/api.php?action=opensearch&search=alex&format=xml&limit=20


  $('.search-button').on('click', function () {
          wikiSearch()
  });
  
  $("#search-field").keyup(function (e) {
      if (e.keyCode == 13) {
          wikiSearch()
      }
  });

  function wikiSearch(){

    var query = $("#search-field").val();
    if (query === ''){
      query = "null";
    }

    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&format=json&limit=20&callback=?";

    $.getJSON({
      type: "POST",
      url: url,
      dataType: "json"
    })
    .done(function(data, textStatus, jqXHR) {

      console.log(data);

      var html = '';

      for(var i = 0; i < data[1].length; i++){
        
        html += "<a href='" + data[3][i] + "' target='_blank'>";

        html +="<h2>" + data[1][i] + "</h2>";

        html +="<p>" + data[2][i] + "</p>";

        html += "</a>";

      }

      $(".search-result").html(html);

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // log error to browser's console
      console.log(errorThrown.toString());
    });
  }   

});