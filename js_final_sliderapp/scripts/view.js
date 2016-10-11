define(
    'view',
    ['jquery'],  // dependency on jquery module and js-template
    function() {

        function View() {

            this.Init = function(id, model){
                // here we must initiate slider and add all navigation buttons
                var images = model.images;

                // 1. create container inside id-element
                this.silderContainer = document.createElement('div');
                this.silderContainer.className = 'slider-container';
                this.silderContainer.id = 'slider-container-' + id;
                document.getElementById(id).appendChild(this.silderContainer);

                // 2. calculate width of inside <ul> must be 3 widths of slider-container width
                var ulElement = document.createElement('ul');
                ulElement.style.width = this.silderContainer.offsetWidth * 3 + 'px';
                // shift position of <ul> to left so the central image will be in the middle
                ulElement.style.left = this.silderContainer.offsetWidth * (-1) + 'px';
                this.silderContainer.appendChild(ulElement);

                // 3. now we must add 3 <li> elements with pictures set as backgounds
                // there must be at least 1 image, but we still add 3 <li>
                // add last image to 1st <li>
                var liElement1 = document.createElement('li');
                liElement1.style.width = this.silderContainer.offsetWidth + 'px';
                liElement1.style.background = "url('"+ images[images.length-1] +"') no-repeat center center";   
                liElement1.style.backgroundSize = "cover";
                ulElement.appendChild(liElement1);             
                // add 1st image to 2nd <li>
                var liElement2 = document.createElement('li');
                liElement2.style.width = this.silderContainer.offsetWidth + 'px';
                liElement2.style.background = "url('"+ images[0] +"') no-repeat center center";   
                liElement2.style.backgroundSize = "cover";
                ulElement.appendChild(liElement2);                   
                // add 2nd, last of 1st image to 3rd <li>
                switch (images.length) {
                    case 1:
                        ulElement.appendChild(liElement1);
                    case 2:
                        ulElement.appendChild(liElement2);
                    default:
                        var liElement3 = document.createElement('li');
                        liElement3.style.width = this.silderContainer.offsetWidth + 'px';
                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
                        liElement3.style.backgroundSize = "cover";
                        ulElement.appendChild(liElement3);                          
                }              

                // 4. Add navigation buttons Left and Right
                //    Event listeners will be added in Controllers
                this.goRight = document.createElement('div');
                this.goRight.className = 'slider-container__navigation--right';
                this.silderContainer.appendChild(this.goRight);       

                this.goLeft = document.createElement('div');
                this.goLeft.className = 'slider-container__navigation--left';
                this.silderContainer.appendChild(this.goLeft);                           
            }


            // we update pictures in the slider based on new centralImageIndex
            // we must get index of the central image from Model
            // the index of central image must be changed by Controller
            this.render = function(id, images, centralImageIndex){

                var liElements = document.getElementById('slider-container-'+id).firstChild.childNodes;
                //console.log(liElements);

                // in any case we set cetral image based on centralImageIndex
                liElements[1].style.background = "url('"+ images[centralImageIndex] +"') no-repeat center center";
                liElements[1].style.backgroundSize = "cover";     

                if(centralImageIndex >= images.length - 1){
                    liElements[2].style.background = "url('"+ images[centralImageIndex-(images.length-1)] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";                       
                } else {
                    liElements[2].style.background = "url('"+ images[centralImageIndex+1] +"') no-repeat center center";
                    liElements[2].style.backgroundSize = "cover";                                        
                }

                if(centralImageIndex-1 < 0){
                    liElements[0].style.background = "url('"+ images[images.length-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";  
                } else {
                    liElements[0].style.background = "url('"+ images[centralImageIndex-1] +"') no-repeat center center";
                    liElements[0].style.backgroundSize = "cover";                      
                }                      
             
            }

            this.updateDimentions = function(id, images, centralImageIndex){
                
            }

        }
        
        return View;
    }
);