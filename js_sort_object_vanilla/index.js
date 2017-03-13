document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded with JavaScript');

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


  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  
  // we will keep it global as data, original data will not be changed
  var sortedData = {"instances": []};

  // initially group by subnet
  groupBy("subnet");    
  console.log(sortedData);
  buildTree(sortedData.instances,"subnet");

  // add event listenter to open and close
  var navInstances = document.querySelectorAll(".instance-nav");
  navInstances.forEach(instance => instance.addEventListener('click',switchNav));

  function switchNav(e){

    if(e.currentTarget.classList.contains("visible")){

      e.currentTarget.classList.remove("visible");
      e.currentTarget.className += " hidden"; 
      e.currentTarget.nextElementSibling.style.display = "none";

      e.currentTarget.getElementsByClassName("nav")[0].innerHTML = "+";
      e.currentTarget.getElementsByClassName("indicator")[0].innerHTML = `<i class="fa fa-play closed" aria-hidden="true"></i>`;

    } else if(e.currentTarget.classList.contains("hidden")){

      e.currentTarget.classList.remove("hidden");
      e.currentTarget.className += " visible"; 
      e.currentTarget.nextElementSibling.style.display = "block";

      e.currentTarget.getElementsByClassName("nav")[0].innerHTML = "−";
      e.currentTarget.getElementsByClassName("indicator")[0].innerHTML = `<i class="fa fa-circle opened" aria-hidden="true"></i>`;

    }      

  }

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
        buildTree(sortedData.instances,this.value);
      }
      
      if(this.value === "availability_zone/subnet"){
        // sort data by two parameters
        groupByAvailabilityZoneAndSubnet("availability_zone/subnet");
        // draw brackets for subnet
        //buildTree(sortedData.instances,"subnet");
        // draw brackets for av zone
        buildTreeAvzoneAndSubnet(sortedData.instances);
      }

      //$('#tree').treeview({data: sortedData.instances}); 
    
      // build the tree
      console.log(sortedData.instances);
      //buildTree(sortedData.instances);
  

  });

  function buildTreeAvzoneAndSubnet(arrayOfObjects){
    console.log("building data by available zone and subnet...");
    var root = document.getElementById("tree");

    var HTML = ""; // here we will put everything and will insert it into root

    // make not sorted list of AvZones
    var availabilityZoneList = getRangeOfValuesByKey("availability_zone");    

    // Group by Subnet for Zone 1 => "availability_zone" : "us-west-2c" availabilityZoneList[0]
    var key = "subnet";

    var selectedGroupValues = getRangeOfValuesByKey(key);
    selectedGroupValues.sort(); // sort values as we will need that    

    for(var k = 0; k < availabilityZoneList.length; k++){
      filter = availabilityZoneList[k];
      //console.log(availabilityZoneList);

      HTML+= `
      
          <div class="avzone-container">

            <div class="border-avzone"></div>

            <div class="instances">

              <span class="avzone-title">${availabilityZoneList[k]}</span>`

          // run through all array of instance and add only those that are equal to filter

          //console.log(selectedGroupValues); // => ["10.10.10.0/24", "10.10.20.0/24", "10.10.30.0/24"]
          // filter = us-west-2c - 1st round
          // filter = us-west-2a - 2ns round

///////////////////////////////////////////////////////////////////////////////////////////////////////////

          for(var i = 0; i < arrayOfObjects.length; i++){

            if(arrayOfObjects[i].nodes[0].aws.availability_zone === filter){

            HTML+= `
              <div class="instance-container">

                <div class="instance">
                  <div class="instance-nav visible">
                    <span class="nav">−</span>
                    <span class="title">${arrayOfObjects[i].text}</span> 
                    <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
                  </div>
                  <div class="instance-nodes">`

                  var borderType;
                  if(i > 0){
                    borderType = "border-middle";
                  }   
                  if(i === arrayOfObjects.length-1){
                    borderType += " border-end";
                  }                         

                  //console.log(arrayOfObjects[i].nodes[0].aws.subnet);
                  // if next subnet is different current border is end
                  if(i<arrayOfObjects.length-1){
                    if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key]){
                      borderType = "border-end";
                    }
                  }

                  // if previous is different start new
                  if(i > 0 && i<arrayOfObjects.length-1){
                    if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
                      borderType = "border-start";
                    }
                  }         

                  // if previous and next a different border is start and end
                  if(i > 0 && i<arrayOfObjects.length-1){
                    if((arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key])
                        && (arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key])){
                      borderType = "border-start border-end";
                    }
                  }      

                  // if last one is different put start border there
                  if(i === arrayOfObjects.length-1){
                    if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
                      borderType += " border-start";
                    }              
                  }


                  // here we must put another loop to add nodes
                  for(var j = 0; j < arrayOfObjects[i].nodes.length; j++){
                    HTML+=`<span class="node">${arrayOfObjects[i].nodes[j].text}</span>`
                    //console.log(arrayOfObjects[i].nodes[j].aws.subnet);
                  }

                  // add border start to the 1st element by default
                  if(i === 0){
                    borderType += " border-start";
                  }            

            HTML+= `              
                  </div>
                </div>

                <div class="${borderType}"></div>

              </div>
            `
            }
          }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

      HTML+= `   
            </div>

          </div>    
      
      `;      
    
    }    

    root.innerHTML = HTML;

    // because there were no instances, we need to add event listenters again

    navInstances = document.querySelectorAll(".instance-nav");
    navInstances.forEach(instance => instance.addEventListener('click',switchNav));      
  }

  function buildTree(arrayOfObjects, key){
    console.log("building a tree");
    var root = document.getElementById("tree");
    
    var HTML = ""; // here we will put everything and will insert it into root

    // put 1st instanse

    // go through instances
    for(var i = 0; i < arrayOfObjects.length; i++){
      HTML+= `
        <div class="instance-container">

          <div class="instance">
            <div class="instance-nav visible">
              <span class="nav">−</span>
              <span class="title">${arrayOfObjects[i].text}</span> 
              <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
            </div>
            <div class="instance-nodes">`

            var borderType;
            if(i > 0){
              borderType = "border-middle";
            }   
            if(i === arrayOfObjects.length-1){
              borderType += " border-end";
            }                         

            //console.log(arrayOfObjects[i].nodes[0].aws.subnet);
            // if next subnet is different current border is end
            if(i<arrayOfObjects.length-1){
              if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key]){
                borderType = "border-end";
              }
            }

            // if previous is different start new
            if(i > 0 && i<arrayOfObjects.length-1){
              if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
                borderType = "border-start";
              }
            }         

            // if previous and next a different border is start and end
            if(i > 0 && i<arrayOfObjects.length-1){
              if((arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key])
                  && (arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key])){
                borderType = "border-start border-end";
              }
            }      

            // if last one is different put start border there
            if(i === arrayOfObjects.length-1){
              if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
                borderType += " border-start";
              }              
            }


            // here we must put another loop to add nodes
            for(var j = 0; j < arrayOfObjects[i].nodes.length; j++){
              HTML+=`<span class="node">${arrayOfObjects[i].nodes[j].text}</span>`
              //console.log(arrayOfObjects[i].nodes[j].aws.subnet);
            }

            // add border start to the 1st element by default
            if(i === 0){
              borderType += " border-start";
            }            

      HTML+= `              
            </div>
          </div>

          <div class="${borderType}"></div>

        </div>
      `
    }




    root.innerHTML = HTML;

    // because there were no instances, we need to add event listenters again

    navInstances = document.querySelectorAll(".instance-nav");
    navInstances.forEach(instance => instance.addEventListener('click',switchNav));    

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


  // need to refactor two functions below as they duplicate a lot

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


});


