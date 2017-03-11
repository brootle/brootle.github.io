var data = {
  "instances": [
    {
      "text": "VM1",
      "nodes": [
        {
          "text": "NIC1.1",
          "aws": {
            "availability_zone" : "us-west-2c",
            "subnet": "10.10.10.0/24"
          }
        },
      ] 
    },
    {
      "text": "VM2",
      "nodes": [
        {
          "text": "NIC1",
          "aws": {
            "availability_zone" : "us-west-2c",
            "subnet": "10.10.10.0/24"
          }
        },
        {
          "text": "NIC2",
          "aws": {
            "availability_zone" : "us-west-2c",
            "subnet": "10.10.10.0/24"
          }
        },
        {
          "text": "NIC3",
          "aws": {
            "availability_zone" : "us-west-2c",
            "subnet": "10.10.30.0/24"
          }
        },
      ]
    },
    {
      "text": "VM3",
      "nodes": [
        {
          "text": "NIC3.1",
          "aws": {
            "availability_zone" : "us-west-2a",
            "subnet": "10.10.20.0/24"
          }
        },
      ]
    },
    {
      "text": "VM4",
      "nodes": [
        {
          "text": "NIC4.1",
          "aws": {
            "availability_zone" : "us-west-2c",
            "subnet": "10.10.30.0/24"
          }
        },
      ]
    },
  ]
}


$(function () {

  // inital data
  $('#tree').treeview({data: data.instances});

  var sortedData = {"instances": []};

  // when we select 'subnet' we should regroup data in data object and refresh the tree
  var dropDown = document.querySelector("select");

  dropDown.addEventListener('change', function() {
    console.log(this.value);

    // reset data
    sortedData = {"instances": []};

     groupBy(this.value);

    
    // refresh tree after data changed
    $('#tree').treeview({data: sortedData.instances});

  });  

  // data.insances.nodes -> aws.subnet = "10.10.10.0/24"

  groupBy("subnet");

  function groupBy(key){

    // get all values of subnet
    var selectedGroupValues = [];
    for(var j = 0, length = data.instances.length; j < length; j++){
      var obj = data.instances[j];
      for(var i = 0; i < obj.nodes.length; i++){
        // only add unique values
        if(selectedGroupValues.indexOf(obj.nodes[i].aws[key]) === -1){
          selectedGroupValues.push(obj.nodes[i].aws[key]);
        }
      }
    }  
    selectedGroupValues.sort(); // sort values as we will need that
    console.log(selectedGroupValues);

    //pushInstancesToData("10.10.10.0/24");
    
    for(var i = 0; i < selectedGroupValues.length; i++){
      pushInstancesToData(key,selectedGroupValues[i]);
    }    

  }

  //var key = "subnet";



  function pushInstancesToData(key,value){
    for(var j = 0, length = data.instances.length; j < length; j++){
      var obj = data.instances[j];

      // now let's return only elements of obj that have aws.subnet = "10.10.10.0/24"
      for(var i = 0; i < obj.nodes.length; i++){

        if(obj.nodes[i].aws[key] === value){
          var textValue = data.instances[j].text;
          var sortedObject = {};    

          // if such textValue already exists
          // and aws.subnet = "10.10.10.0/24"
          // we must push node to existing      

          var index = hasKeyAlready(textValue);
          if(index!==false && obj.nodes[index].aws[key] === value){
            sortedData.instances[index].nodes.push(obj.nodes[i]);
          } else{
            // otherwise create new object and push it to instances
            sortedObject.text = textValue;
            sortedObject.nodes = [obj.nodes[i]];
            sortedData.instances.push(sortedObject);
          }

        }

      }

    }
  }

  function hasKeyAlready(text){
      for(var i = 0; i < sortedData.instances.length; i++){
        if(sortedData.instances[i].text === text){
          return i;
        }
      }  
      return false;
  }
 

  //console.log(sortedData);

  $('#tree').treeview({data: sortedData.instances});




});
