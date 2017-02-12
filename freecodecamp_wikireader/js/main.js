$(function () {
  
// https://api.wunderground.com/api/7f0451b8da14a202/conditions/forecast/q/49.5638034,34.4923746.json

  $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data, textStatus, jqXHR) {

          var markup = data.parse.text["*"];
          var blurb = $('<div></div>').html(markup);

          // remove links as they will not work
          blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

          // remove any references
          blurb.find('sup').remove();

          // remove cite error
          blurb.find('.mw-ext-cite-error').remove();
          $('#article').html($(blurb).find('p'));

      },
      error: function (errorMessage) {
      }
  });
   

});