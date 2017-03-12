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

  // wrap to move scroll bar to the left
  $( ".main" ).wrap( "<div class='scroll col-md-2'></div>" );

  // inital data
  $('#tree').treeview({data: data.instances});

  var sortedData = {"instances": []};

  // when we select 'subnet' we should regroup data in data object and refresh the tree
  var dropDown = document.querySelector("select");

  dropDown.addEventListener('change', function() {
    console.log(this.value);

      // reset data
      sortedData = {"instances": []};         

      // "availability_zone" : "us-west-2c",
      // "subnet": "10.10.10.0/24"
      if(this.value === "subnet" || this.value === "availability_zone"){
        groupBy(this.value);
        // refresh tree after data changed     
      }
      
      if(this.value === "availability_zone/subnet"){
        groupByAvailabilityZoneAndSubnet("availability_zone/subnet");
      }

      $('#tree').treeview({data: sortedData.instances}); 
    

  

  });  

  // data.insances.nodes -> aws.subnet = "10.10.10.0/24"

  // initially group by subnet
  groupBy("subnet");

  function drawSelectionBrackets(){
    
  }

  function groupByAvailabilityZoneAndSubnet(keys){
    console.log("group by: " + keys);
    // get the keys in separate variables
    keys = keys.split('/');
    var keyAvZone = keys[0]; // => availability_zone
    var keySubnet = keys[1]; // => subnet

    // make not sorted list of AvZones
    var availabilityZoneList = getRangeOfValuesByKey(keyAvZone);
    console.log(availabilityZoneList);

    // Group by Subnet for Zone 1 => "availability_zone" : "us-west-2c" availabilityZoneList[0]
    var key = keySubnet;

    var selectedGroupValues = getRangeOfValuesByKey(key);
    selectedGroupValues.sort(); // sort values as we will need that

    var filter;

    // add filtered nodes sorted by subnet for each available zone
    for(var j = 0; j < availabilityZoneList.length; j++){
      filter = availabilityZoneList[j];
      //console.log(filter);
      for(var i = 0; i < selectedGroupValues.length; i++){
        pushFilteredInstancesToData(key,selectedGroupValues[i],filter);
      }         
    }


  }

  function groupBy(key){

    // get all values of subnet

    var selectedGroupValues = getRangeOfValuesByKey(key);

    selectedGroupValues.sort(); // sort values as we will need that
    console.log(selectedGroupValues);

    //pushInstancesToData("10.10.10.0/24");
    
    for(var i = 0; i < selectedGroupValues.length; i++){
      pushInstancesToData(key,selectedGroupValues[i]);
    }    

  }

  function getRangeOfValuesByKey(key){
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
    //selectedGroupValues.sort(); // sort values as we will need that
    //console.log(selectedGroupValues);    
    return selectedGroupValues;
  }




  function pushFilteredInstancesToData(key,value,filter){

    for(var j = 0, length = data.instances.length; j < length; j++){
      var obj = data.instances[j];

      // now let's return only elements of obj that have aws.subnet = "10.10.10.0/24"
      for(var i = 0; i < obj.nodes.length; i++){

        if(obj.nodes[i].aws[key] === value && obj.nodes[i].aws.availability_zone === filter){
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
