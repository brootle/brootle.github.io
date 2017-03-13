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
  //buildTree(sortedData.instances,"subnet");

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


  function htmlBySubnetAndAvzone(avzone, subnet){
    var HTML = '';

    var VM_list = {};

// |---> VM1 NIC1.1 
// |---> VM2 NIC1 
// |---> VM2 NIC2     
 

    for(var i = 0; i < data.instances.length; i++){
      // scan nodes
      for(var j = 0; j < data.instances[i].nodes.length; j++){

        if((data.instances[i].nodes[j].aws.availability_zone === avzone) &&
         (data.instances[i].nodes[j].aws.subnet === subnet)){
           // we got our node!
           console.log("|--->", data.instances[i].text, data.instances[i].nodes[j].text, avzone,subnet);
           // here we create object with VMs and arrays of NICs for each of VM 
           var vm_name = data.instances[i].text;
           var vm_node = data.instances[i].nodes[j].text;

           if(VM_list[vm_name] === undefined){
             VM_list[vm_name] = [vm_node];
           }else if(VM_list[vm_name] !== undefined){
             VM_list[vm_name].push(vm_node);
           }           

         }

      }

    }

    // now we can finally make HTML based on VM_list object

    console.log("---------",VM_list);
    //console.log(Object.keys(VM_list)[0]);

    for(var i = 0; i < Object.keys(VM_list).length; i++){
      var vm_name = Object.keys(VM_list)[i];
      HTML += `
          <div class="instance-container">

            <div class="instance">
              <div class="instance-nav visible">
                <span class="nav">−</span>
                <span class="title">${vm_name}</span> 
                <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
              </div>
              <div class="instance-nodes">`

        for(var j = 0; j < VM_list[vm_name].length; j++){
          HTML +=`<span class="node">${VM_list[vm_name][j]}</span>`
        }

     HTML +=`
              </div>
            </div>


          </div>       
      `;      
    }
    
    return HTML;
  }


  function buildTreeAvzoneAndSubnet(arrayOfObjects){
    console.log("building data by available zone and subnet...");
    var root = document.getElementById("tree");

    var HTML = ""; // here we will put everything and will insert it into root

    // make not sorted list of AvZones
    var availabilityZoneList = getRangeOfValuesByKey("availability_zone");    

    // Group by Subnet for Zone 1 => "availability_zone" : "us-west-2c" availabilityZoneList[0]
    var key = "subnet";

    var selectedGroupValues = getRangeOfValuesByKey(key);
    selectedGroupValues.sort(); // sort values as we will need that - list of subnets

    var usedSubnets = [];

    console.log("selected group values: ",selectedGroupValues);

    for(var k = 0; k < availabilityZoneList.length; k++){
      filter = availabilityZoneList[k];
      //console.log(availabilityZoneList);

      HTML+=`
      
        <div class="avzone-container">

          <div class="border-avzone"></div>

          <div class="instances">

            <span class="avzone-title">${availabilityZoneList[k]}</span>`;

            // now we loop 
            // scan all data 
            // if subnet = 10 10 10 10 and avzone = us-west-2c - put them in one container
            // if subnet = 10 10 10 20 and avzone = us-west-2c - put the in another container

            for(var j = 0; j < selectedGroupValues.length; j++){


              // here we filter instances
              // OK, now we loop through all the data and filter only those that match zone and subnet
              for(var i = 0; i < arrayOfObjects.length; i++){


                // and here we also need to run through all nodes in each instance
                for(var m = 0; m < arrayOfObjects[i].nodes.length; m++){
                  if((arrayOfObjects[i].nodes[m].aws.availability_zone === availabilityZoneList[k])
                      && (arrayOfObjects[i].nodes[m].aws.subnet === selectedGroupValues[j])){

                    // check if this is new subnet
                    // if subnet is new - create new subnet-container
                    if(usedSubnets.includes(arrayOfObjects[i].nodes[m].aws.subnet)===false){
                      console.log("new subnet");
                      usedSubnets.push(arrayOfObjects[i].nodes[m].aws.subnet);

                      HTML+=`
                        <div class="subnet-container">
                          
                          <div class="subnet-instances">              
                      `;

                      // and here we should start writting data?
                      // make a function that will return HTML with all given subnet
                      // the function should take subnet and availability_zone
                      // arrayOfObjects[i].nodes[m].aws.subnet => 10.10.10.0/24
                      // availabilityZoneList[k] => us-west-2c

                      HTML+=htmlBySubnetAndAvzone(availabilityZoneList[k], arrayOfObjects[i].nodes[m].aws.subnet);


                      HTML+=`
                          </div>

                          <div class="subnet-border"></div>

                          <div class="subnet-text">
                            <span>${arrayOfObjects[i].nodes[m].aws.subnet}</span>
                          </div>                          

                        </div>                 
                      `;                  


                    }

                    // console.log(arrayOfObjects[i].text);
                    // console.log(arrayOfObjects[i].nodes[m].text);
                    // console.log(arrayOfObjects[i].nodes[m].aws.availability_zone);
                    // console.log(arrayOfObjects[i].nodes[m].aws.subnet);
                  }
                }

 

              }



            }

            // <div class="subnet-container">
              
            //   <div class="subnet-instances">

            //     <div class="instance-container">

            //       <div class="instance">
            //         <div class="instance-nav visible">
            //           <span class="nav">−</span>
            //           <span class="title">VM1</span> 
            //           <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
            //         </div>
            //         <div class="instance-nodes">
            //           <span class="node">NIC1.1</span>
            //           <span class="node">NIC2</span>
            //         </div>
            //       </div>

            //     </div>

            //     <div class="instance-container">

            //       <div class="instance">
            //         <div class="instance-nav visible">
            //           <span class="nav">−</span>
            //           <span class="title">VM0</span> 
            //           <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
            //         </div>
            //         <div class="instance-nodes">
            //           <span class="node">NIC1.1</span>
            //           <span class="node">NIC2</span>
            //         </div>
            //       </div>

            //     </div>

            //   </div>

            //   <div class="subnet-border"></div>

            //   <div class="subnet-text">
            //     <span>10.10.10.0/24</span>
            //     <span>us-west-2c</span>
            //   </div>

            // </div>

           
     HTML+=`
          </div>

        </div>      
      
      
      `;


    
    }    

    console.log(usedSubnets);

    root.innerHTML = HTML;

    // because there were no instances, we need to add event listenters again

    navInstances = document.querySelectorAll(".instance-nav");
    navInstances.forEach(instance => instance.addEventListener('click',switchNav));      
  }



  // function buildTree(arrayOfObjects, key){
  //   console.log("building a tree");
  //   var root = document.getElementById("tree");
    
  //   var HTML = ""; // here we will put everything and will insert it into root

  //   // put 1st instanse

  //   // go through instances
  //   for(var i = 0; i < arrayOfObjects.length; i++){
  //     HTML+= `
  //       <div class="instance-container">

  //         <div class="instance">
  //           <div class="instance-nav visible">
  //             <span class="nav">−</span>
  //             <span class="title">${arrayOfObjects[i].text}</span> 
  //             <span class="indicator"><i class="fa fa-circle opened" aria-hidden="true"></i></span> 
  //           </div>
  //           <div class="instance-nodes">`

  //           var borderType;
  //           if(i > 0){
  //             borderType = "border-middle";
  //           }   
  //           if(i === arrayOfObjects.length-1){
  //             borderType += " border-end";
  //           }                         

  //           //console.log(arrayOfObjects[i].nodes[0].aws.subnet);
  //           // if next subnet is different current border is end
  //           if(i<arrayOfObjects.length-1){
  //             if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key]){
  //               borderType = "border-end";
  //             }
  //           }

  //           // if previous is different start new
  //           if(i > 0 && i<arrayOfObjects.length-1){
  //             if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
  //               borderType = "border-start";
  //             }
  //           }         

  //           // if previous and next a different border is start and end
  //           if(i > 0 && i<arrayOfObjects.length-1){
  //             if((arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key])
  //                 && (arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i+1].nodes[0].aws[key])){
  //               borderType = "border-start border-end";
  //             }
  //           }      

  //           // if last one is different put start border there
  //           if(i === arrayOfObjects.length-1){
  //             if(arrayOfObjects[i].nodes[0].aws[key] !== arrayOfObjects[i-1].nodes[0].aws[key]){
  //               borderType += " border-start";
  //             }              
  //           }


  //           // here we must put another loop to add nodes
  //           for(var j = 0; j < arrayOfObjects[i].nodes.length; j++){
  //             HTML+=`<span class="node">${arrayOfObjects[i].nodes[j].text}</span>`
  //             //console.log(arrayOfObjects[i].nodes[j].aws.subnet);
  //           }

  //           // add border start to the 1st element by default
  //           if(i === 0){
  //             borderType += " border-start";
  //           }            

  //     HTML+= `              
  //           </div>
  //         </div>

  //         <div class="${borderType}"></div>

  //       </div>
  //     `
  //   }




  //   root.innerHTML = HTML;

  //   // because there were no instances, we need to add event listenters again

  //   navInstances = document.querySelectorAll(".instance-nav");
  //   navInstances.forEach(instance => instance.addEventListener('click',switchNav));    

  // }


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


