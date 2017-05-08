
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript');    

  // http://stackoverflow.com/a/43571053/6261255

  // just get elements that we will work with
  var originalTextArea = document.querySelector('#original');

  // 1. split content of text areas into lines
  // 2. make objects with key - value pairs 

  var originalConent = document.querySelector('#original').textContent.split('\n');
  // console.log(originalConent);

  var listOriginal = {};

  originalConent.forEach(line => {
      var key_value = line.split('=');
      // just make sure we don't catch empty line
      if(key_value.length > 1){
        var key = key_value[0];
        var value = key_value[1];
        listOriginal[key] = value;
        // console.log(key_value);
      }
  });

  console.log(listOriginal);

  var modifiedConent = document.querySelector('#mod').textContent.split('\n');
  // console.log(modifiedConent);

  var listModified = {};

  modifiedConent.forEach(line => {
      var key_value = line.split('=');
      // just make sure we don't catch empty line
      if(key_value.length > 1){
        var key = key_value[0];
        var value = key_value[1];
        listModified[key] = value;
        // console.log(key_value);
      }
  });

  console.log(listModified);  

  // 3. check if values in modified are different
  //    if values are different - update them in original objects
  //    update content of text area with original data

  document.querySelector('#update').addEventListener('click', updateOriginal);

  function updateOriginal(){

    // iterate listModified object and update listOriginal
    for (var key in listModified) {
        // just assing value of modified to original
        // in this case even new key - value pairs will be added
        listOriginal[key] = listModified[key];
    }

    // update data of original text area
    var textData = '';
    for (var key in listOriginal) {
        textData+=`${key}=${listOriginal[key]}\n`;
    }    

    originalTextArea.textContent = textData;
  }

});


