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
  
  buildHtmlTree(data.instances,"subnet");

  // add event listenter to open and close
  var navInstances = document.querySelectorAll(".instance-nav");
  navInstances.forEach(instance => instance.addEventListener('click',switchNav));

  function switchNav(e){
    //drawLines();

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

    drawLines();  

  }

  // when we select 'subnet' we should regroup data in data object and refresh the tree
  var dropDown = document.querySelector("select");

  dropDown.addEventListener('change', function() {
    console.log(this.value);
    
      // "availability_zone" : "us-west-2c",
      // "subnet": "10.10.10.0/24"
      if(this.value === "subnet" || this.value === "availability_zone"){
        // refresh tree after data changed     
        buildHtmlTree(data.instances,this.value);
        drawLines();
      }
      
      if(this.value === "availability_zone/subnet"){
        buildTreeAvzoneAndSubnet(data.instances);
        drawLines();
      }

  });

////////////////////////////////////////////////////////////////////////////////////////
  // http://stackoverflow.com/a/5912283/6261255
  function createLineElement(x, y, length, angle,lineID) {
      var line = document.createElement("div");
      var styles = 'border: 1px solid black; '
                + 'width: ' + length + 'px; '
                + 'height: 0px; '
                + '-moz-transform: rotate(' + angle + 'rad); '
                + '-webkit-transform: rotate(' + angle + 'rad); '
                + '-o-transform: rotate(' + angle + 'rad); '  
                + '-ms-transform: rotate(' + angle + 'rad); '  
                + 'position: absolute; '
                + 'top: ' + y + 'px; '
                + 'left: ' + x + 'px; ';
      line.setAttribute('style', styles);  
      line.setAttribute('id', "line"+lineID);
      line.setAttribute('class', "line"); 
      return line;
  }

  function createLine(x1, y1, x2, y2,lineID) {
      var a = x1 - x2,
          b = y1 - y2,
          c = Math.sqrt(a * a + b * b);

      var sx = (x1 + x2) / 2,
          sy = (y1 + y2) / 2;

      var x = sx - c / 2,
          y = sy;

      var alpha = Math.PI - Math.atan2(-b, a);

      return createLineElement(x, y, c, alpha,lineID);
  }

  //document.body.appendChild(createLine(247, 188, 340, 220));


  var scrolledArea = document.querySelector(".scroll");
  scrolledArea.addEventListener("scroll", drawLines);

  //var scrolledY = window.scrollY;

  // draw lines initially
  var spanLines = document.querySelectorAll('.subnet-text span:first-child');
  var rect;
  var lineID;
  //document.body.appendChild(createLine(rect.right, rect.top+17, 340, 220,lineID));
  // var root = document.documentElement;
  // console.log(root.scrollTop);
  //console.log(window.scrollY);
  var scrollRect;

  var scrollContainer = document.querySelector(".scroll");
  //var scrollContainer = document.querySelector("#tree");

  for(var i = 0; i < spanLines.length; i++){
    rect = spanLines[i].getBoundingClientRect();
    lineID = i;  
    // here we must check if we get out of scroll container
    // so we don't draw line below scroll
    scrollRect = scrollContainer.getBoundingClientRect();
    console.log("scroll: ",scrollRect.bottom+window.scrollY);
    console.log("line: ", rect.top+18+window.scrollY);
    if(rect.top+18+window.scrollY <= scrollRect.bottom+window.scrollY && rect.top+18+window.scrollY >= scrollRect.top+window.scrollY){
      scrollContainer.appendChild(createLine(rect.right, rect.top+20+window.scrollY, 340, 233,lineID));
    }    
    //scrollContainer.appendChild(createLine(rect.right, rect.top+20+window.scrollY, 340, 233,lineID))
  }
  
  function drawLines(){

    // get all span elements that have a line
    
    // get coordinates
    spanLines = document.querySelectorAll('.subnet-text span:first-child');
    rect = spanLines[0].getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);   
    // 170.375 246.5 189.375 146.5   

    // delete all lines
    var lines = document.querySelectorAll(".line")
    //console.log(lines);
    for(var i = 0; i < lines.length; i++){
      var element = lines[i];
      element.outerHTML = "";
      delete element;  
    }    

    // draw new lines
    for(var i = 0; i < spanLines.length; i++){
      rect = spanLines[i].getBoundingClientRect();
      lineID = i;
      // here we must check if we get out of scroll container
      // so we don't draw line below scroll    
      scrollRect = scrollContainer.getBoundingClientRect();
      console.log("scroll: ",scrollRect.bottom+window.scrollY);
      console.log("line: ", rect.top+18+window.scrollY);
      if(rect.top+18+window.scrollY <= scrollRect.bottom+window.scrollY && rect.top+18+window.scrollY >= scrollRect.top+window.scrollY){
        scrollContainer.appendChild(createLine(rect.right, rect.top+18+window.scrollY, 340, 233,lineID));
      }

      //scrollContainer.appendChild(createLine(rect.right, rect.top+18+window.scrollY, 340, 233,lineID));
    }

  }


  //////////////////////////////////////////////////////////////////////////////////

  function htmlByKey(key,value){

    var HTML = '';

    var VM_list = {};

    for(var i = 0; i < data.instances.length; i++){
      // scan nodes
      for(var j = 0; j < data.instances[i].nodes.length; j++){

        if(data.instances[i].nodes[j].aws[key] === value){
           // we got our node!
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

  function buildHtmlTree(arrayOfObjects,key){
    
    var root = document.getElementById("tree");

    var HTML = ""; // here we will put everything and will insert it into root

    var selectedGroupValues = getRangeOfValuesByKey(key);
    selectedGroupValues.sort(); // sort values as we will need that - list of subnets

    var usedSubnets = [];

    for(var j = 0; j < selectedGroupValues.length; j++){

      // here we filter instances
      // OK, now we loop through all the data and filter only those that match zone and subnet
      for(var i = 0; i < arrayOfObjects.length; i++){


        // and here we also need to run through all nodes in each instance
        for(var m = 0; m < arrayOfObjects[i].nodes.length; m++){
          if(arrayOfObjects[i].nodes[m].aws[key] === selectedGroupValues[j]){

            // check if this is new subnet
            // if subnet is new - create new subnet-container
            if(usedSubnets.includes(arrayOfObjects[i].nodes[m].aws[key])===false){

              usedSubnets.push(arrayOfObjects[i].nodes[m].aws[key]);

              HTML+=`
                <div class="subnet-container">
                  
                  <div class="subnet-instances">              
              `;

              // and here we should start writting data?
              // make a function that will return HTML with all given subnet
              // the function should take subnet and availability_zone
              // arrayOfObjects[i].nodes[m].aws.subnet => 10.10.10.0/24
              // availabilityZoneList[k] => us-west-2c

              HTML+=htmlByKey(key,arrayOfObjects[i].nodes[m].aws[key]);


              HTML+=`
                  </div>

                  <div class="subnet-border"></div>

                  <div class="subnet-text">
                    <span>${arrayOfObjects[i].nodes[m].aws[key]}</span>`;
              if(key === "subnet"){
                HTML+=`<span>${arrayOfObjects[i].nodes[m].aws.availability_zone}</span>`;
              }

              HTML+=`</div>                          

                </div>                 
              `;                  


            }

          }
        }


      }




           
     HTML+=`
          </div>

        </div>      
      
      
      `;


    
    }    

    //console.log(usedSubnets);

    root.innerHTML = HTML;

    // because there were no instances, we need to add event listenters again

    navInstances = document.querySelectorAll(".instance-nav");
    navInstances.forEach(instance => instance.addEventListener('click',switchNav));  


  }

  function htmlBySubnetAndAvzone(avzone, subnet){
    //console.log("availability_zone/subnet");
    var HTML = '';

    var VM_list = {};

    for(var i = 0; i < data.instances.length; i++){
      // scan nodes
      for(var j = 0; j < data.instances[i].nodes.length; j++){

        if((data.instances[i].nodes[j].aws.availability_zone === avzone) &&
         (data.instances[i].nodes[j].aws.subnet === subnet)){
           // we got our node!
           //console.log("|--->", data.instances[i].text, data.instances[i].nodes[j].text, avzone,subnet);
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

    var root = document.getElementById("tree");

    var HTML = ""; // here we will put everything and will insert it into root

    // make not sorted list of AvZones
    var availabilityZoneList = getRangeOfValuesByKey("availability_zone");    

    // Group by Subnet for Zone 1 => "availability_zone" : "us-west-2c" availabilityZoneList[0]
    var key = "subnet";

    var selectedGroupValues = getRangeOfValuesByKey(key);
    selectedGroupValues.sort(); // sort values as we will need that - list of subnets

    var usedSubnets = [];

    //console.log("selected group values: ",selectedGroupValues);

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
                      //console.log("new subnet");
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



           
     HTML+=`
          </div>

        </div>      
      
      
      `;


    
    }    

    //console.log(usedSubnets);

    root.innerHTML = HTML;

    // because there were no instances, we need to add event listenters again

    navInstances = document.querySelectorAll(".instance-nav");
    navInstances.forEach(instance => instance.addEventListener('click',switchNav));      
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
    


});


