define(
    'view',
    function() {

        function View() {

            this.Init = function(id, model){
                // here we must initiate slider and add all navigation buttons
                var images = model.images;
                var texts = model.texts;

                //console.log(texts);

                // 1. create container inside id-element
                this.sliderContainer = document.createElement('div');
                this.sliderContainer.className = 'slider-container';
                this.sliderContainer.id = 'slider-container-' + id;
                document.getElementById(id).appendChild(this.sliderContainer);

                // 2. calculate width of inside <ul> must be 3 widths of slider-container width
                var ulElement = document.createElement('ul');
                ulElement.style.width = this.sliderContainer.offsetWidth * 3 + 'px';
                // shift position of <ul> to left so the central image will be in the middle
                ulElement.style.left = this.sliderContainer.offsetWidth * (-1) + 'px';
                this.sliderContainer.appendChild(ulElement);

                // 3. now we must add 3 <li> elements with pictures set as backgounds
                // there must be at least 1 image, but we still add 3 <li>
                // add last image to 1st <li>

                // here we just create empty div used as a filter for background image of li
                // plus we make empty div for text block
                var textBlock = "<div style='width: 100%; height:100%; padding:0;margin:0; background-color: rgba(0, 0, 0, 0.2);'></div>";
                textBlock+="<div></div>";                       

                var liElement1 = document.createElement('li');
                liElement1.style.width = this.sliderContainer.offsetWidth + 'px';
                liElement1.style.background = "url('"+ images[images.length-1] +"') no-repeat center center";   
                liElement1.style.backgroundSize = "cover";
                liElement1.innerHTML = textBlock;

                // add image counter to text block
                var divWithText1 = liElement1.childNodes[1];  
                divWithText1.innerHTML = "<a>photo "+ (images.length) +"</a>";
                divWithText1.innerHTML+= "<h1>"+ texts[texts.length - 1].tittle +"</h1>";
                divWithText1.innerHTML+= "<p>"+ texts[texts.length - 1].description +"</>";

                ulElement.appendChild(liElement1);             
                // add 1st image to 2nd <li>
                var liElement2 = document.createElement('li');
                liElement2.style.width = this.sliderContainer.offsetWidth + 'px';
                liElement2.style.background = "url('"+ images[0] +"') no-repeat center center";   
                liElement2.style.backgroundSize = "cover";
                liElement2.innerHTML = textBlock;

                var divWithText2 = liElement2.childNodes[1];  
                divWithText2.innerHTML = "<a>photo "+ 1 +"</a>";
                divWithText2.innerHTML+= "<h1>"+ texts[0].tittle +"</h1>";
                divWithText2.innerHTML+= "<p>"+ texts[0].description +"</p>";

                ulElement.appendChild(liElement2);                   
                // add 2nd, last of 1st image to 3rd <li>                           

                //something is wrong in this block
                switch (images.length) {
                    case 1:
                        ulElement.appendChild(liElement1);
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = this.sliderContainer.offsetWidth + 'px';
                        liElement3.style.background = "url('"+ images[0] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";
                        liElement3.innerHTML = textBlock;

                        var divWithText3 = liElement3.childNodes[1];  
                        divWithText3.innerHTML = "<a>photo "+ 1 +"</a>";
                        divWithText3.innerHTML+= "<h1>"+ texts[0].tittle +"</h1>";
                        divWithText3.innerHTML+= "<p>"+ texts[0].description +"</p>";
                        ulElement.appendChild(liElement3); 
                        break;
                    case 2:
                        ulElement.appendChild(liElement2);
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = this.sliderContainer.offsetWidth + 'px';
                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";
                        liElement3.innerHTML = textBlock;

                        var divWithText3 = liElement3.childNodes[1];  
                        divWithText3.innerHTML = "<a>photo "+ 2 +"</a>";
                        divWithText3.innerHTML+= "<h1>"+ texts[1].tittle +"</h1>";
                        divWithText3.innerHTML+= "<p>"+ texts[1].description +"</p>";
                        ulElement.appendChild(liElement3);                         
                        break;
                    default:
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = this.sliderContainer.offsetWidth + 'px';
                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";
                        liElement3.innerHTML = textBlock;

                        var divWithText3 = liElement3.childNodes[1];  
                        divWithText3.innerHTML = "<a>photo "+ 2 +"</a>";
                        divWithText3.innerHTML+= "<h1>"+ texts[1].tittle +"</h1>";
                        divWithText3.innerHTML+= "<p>"+ texts[1].description +"</p>";

                        ulElement.appendChild(liElement3);   
                       
                }                         

                // 4. Add navigation buttons Left and Right
                //    Event listeners will be added in Controllers
                this.goRight = document.createElement('div');
                this.goRight.className = 'slider-container__navigation--right';
                this.sliderContainer.appendChild(this.goRight);       

                this.goLeft = document.createElement('div');
                this.goLeft.className = 'slider-container__navigation--left';
                this.sliderContainer.appendChild(this.goLeft);                                          
            }


            // we update pictures in the slider based on new centralImageIndex
            // we must get index of the central image from Model
            // the index of central image must be changed by Controller
            this.render = function(id, images, centralImageIndex, texts){

                // centralImageIndex + 1 will be the actual number of the image
                //console.log(centralImageIndex);

                var liElements = document.getElementById('slider-container-'+id).firstChild.childNodes;

                // in any case we set cetral image based on centralImageIndex
                liElements[1].style.background = "url('"+ images[centralImageIndex] +"') no-repeat center center";
                liElements[1].style.backgroundSize = "cover";  

                liElements[1].childNodes[1].childNodes[0].innerHTML = "photo "+ (centralImageIndex + 1);
                liElements[1].childNodes[1].childNodes[1].innerHTML = texts[centralImageIndex].tittle;
                liElements[1].childNodes[1].childNodes[2].innerHTML = texts[centralImageIndex].description;

                if(centralImageIndex >= images.length - 1){
                    liElements[2].style.background = "url('"+ images[centralImageIndex-(images.length-1)] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";        

                    liElements[2].childNodes[1].childNodes[0].innerHTML = "photo "+ (centralImageIndex-(images.length-1) + 1); 
                    liElements[2].childNodes[1].childNodes[1].innerHTML = texts[centralImageIndex-(images.length-1)].tittle;  
                    liElements[2].childNodes[1].childNodes[2].innerHTML = texts[centralImageIndex-(images.length-1)].description;           
                } else {
                    liElements[2].style.background = "url('"+ images[centralImageIndex+1] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";   

                    liElements[2].childNodes[1].childNodes[0].innerHTML = "photo "+ (centralImageIndex + 1 + 1); 
                    liElements[2].childNodes[1].childNodes[1].innerHTML = texts[centralImageIndex + 1].tittle; 
                    liElements[2].childNodes[1].childNodes[2].innerHTML = texts[centralImageIndex + 1].description;                                     
                }

                if(centralImageIndex-1 < 0){
                    liElements[0].style.background = "url('"+ images[images.length-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";  

                    liElements[0].childNodes[1].childNodes[0].innerHTML = "photo "+ (images.length);
                    liElements[0].childNodes[1].childNodes[1].innerHTML = texts[texts.length-1].tittle;  
                    liElements[0].childNodes[1].childNodes[2].innerHTML = texts[texts.length-1].description; 
                } else {
                    liElements[0].style.background = "url('"+ images[centralImageIndex-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";  

                    liElements[0].childNodes[1].childNodes[0].innerHTML = "photo "+ (centralImageIndex);  
                    liElements[0].childNodes[1].childNodes[1].innerHTML = texts[centralImageIndex-1].tittle;    
                    liElements[0].childNodes[1].childNodes[2].innerHTML = texts[centralImageIndex-1].description;             
                }                  
             
            }

            // this will allow to re-size dimentions of slider if parent element is not fixed
            // so we just change dimentions here, that's all
            this.updateDimensions = function(id){

                var sliderContainer = document.getElementById('slider-container-'+id);
                var ulElement = sliderContainer.firstChild;
                var liElements = sliderContainer.firstChild.childNodes;

                // recalculate ul width and position
                ulElement.style.width = sliderContainer.offsetWidth * 3 + 'px';
                ulElement.style.left = sliderContainer.offsetWidth * (-1) + 'px';
                
                // we also need to recalculate li width
                for(var i = 0; i < liElements.length; i++){
                    liElements[i].style.width = sliderContainer.offsetWidth + 'px';
                }
            }          

        }
        
        return View;
    }
);