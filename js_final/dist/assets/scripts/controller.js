define(
    'controller',
    ['model', 'view'],
    function() {

        function Controller(id, model, view) {

            // this will be checking for screen size changes and will call function in View
            // window.addEventListener("resize", function(){
            //     view.updateDimensions(id); 
            // });            

            // view.goRight.addEventListener("click",glideNext);   
            // view.goLeft.addEventListener("click",glidePrevious);            

            if(window.addEventListener)
                window.addEventListener("resize", function(){
                    view.updateDimensions(id); 
                });
            else
                window.attachEvent("onresize", function(){
                    view.updateDimensions(id); 
                });            
           
           if(view.goRight.addEventListener){
                view.goRight.addEventListener("click",glideNext);   
                view.goLeft.addEventListener("click",glidePrevious);                
           }
           else{
                view.goRight.attachEvent("onclick",glideNext);   
                view.goLeft.attachEvent("onclick",glidePrevious);                   
           }
             

            var animationSpeed = view.sliderContainer.offsetWidth / 24;  

            function glideNext() {
                // we also must stop event listener to prevent click while slider is moving
                if(view.goRight.removeEventListener){
                    view.goRight.removeEventListener("click",glideNext); 
                    view.goLeft.removeEventListener("click",glidePrevious);              
                }
                else{
                    view.goRight.detachEvent("onclick",glideNext);   
                    view.goLeft.detachEvent("onclick",glidePrevious);                   
                }                
                var elem = view.sliderContainer.firstChild; 
                var pos = view.sliderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 15);
                function frame() {
                    if (pos - animationSpeed <= view.sliderContainer.offsetWidth * (-2)) {
                        clearInterval(id);
                        nextImage();
                        elem.style.left = view.sliderContainer.offsetWidth * (-1) + 'px';
                        // here we must return event listener
                        if(view.goRight.addEventListener){
                            view.goRight.addEventListener("click",glideNext);   
                            view.goLeft.addEventListener("click",glidePrevious);                
                        }
                        else{
                            view.goRight.attachEvent("onclick",glideNext);   
                            view.goLeft.attachEvent("onclick",glidePrevious);                   
                        }
                    } else {
                        pos = pos - animationSpeed; 
                        elem.style.left = pos + 'px'; 
                    }
                }
            }       

            function glidePrevious() {
                if(view.goRight.removeEventListener){
                    view.goRight.removeEventListener("click",glideNext); 
                    view.goLeft.removeEventListener("click",glidePrevious);              
                }
                else{
                    view.goRight.detachEvent("onclick",glideNext);   
                    view.goLeft.detachEvent("onclick",glidePrevious);                   
                }    
                var elem = view.sliderContainer.firstChild; 
                var pos = view.sliderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 15);
                function frame() {
                    if (pos + animationSpeed >= 0) {
                        clearInterval(id);
                        previousImage();
                        elem.style.left = view.sliderContainer.offsetWidth * (-1) + 'px';
                        if(view.goRight.addEventListener){
                                view.goRight.addEventListener("click",glideNext);   
                                view.goLeft.addEventListener("click",glidePrevious);                
                        }
                        else{
                                view.goRight.attachEvent("onclick",glideNext);   
                                view.goLeft.attachEvent("onclick",glidePrevious);                   
                        }
                    } else {
                        pos = pos + animationSpeed;  
                        elem.style.left = pos + 'px'; 
                    }
                }
            }                   
             

            function nextImage(){

                model.centralImageIndex++;
                if(model.centralImageIndex > (model.images.length - 1)){
                    model.centralImageIndex = 0;
                }

                view.render(id, model.images, model.centralImageIndex, model.texts);               
            }

            function previousImage(){

                model.centralImageIndex--;
                if(model.centralImageIndex < 0){
                    model.centralImageIndex = model.images.length - 1;
                }

                view.render(id, model.images, model.centralImageIndex, model.texts);                 
            }            

        }
        
        return Controller;
    }
);