define(
    'controller',
    ['jquery', 'model', 'view'],
    function() {

        function Controller(id, model, view) {
        
            view.goRight.addEventListener("click",glideNext);   
            view.goLeft.addEventListener("click",glidePrevious);   

            var animationSpeed = 1;  

            function glideNext() {
                // we also must stop event listener to prevent click while slider is moving
                view.goRight.removeEventListener("click",glideNext); 
                view.goLeft.removeEventListener("click",glidePrevious); 
                var elem = view.silderContainer.firstChild; 
                var pos = view.silderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 5);
                function frame() {
                    if (pos <= view.silderContainer.offsetWidth * (-2)) {
                        clearInterval(id);
                        nextImage();
                        elem.style.left = view.silderContainer.offsetWidth * (-1) + 'px';
                        // here we must return event listener
                        view.goRight.addEventListener("click",glideNext); 
                        view.goLeft.addEventListener("click",glidePrevious);
                    } else {
                        pos = pos - animationSpeed; 
                        elem.style.left = pos + 'px'; 
                    }
                }
            }       

            function glidePrevious() {
                view.goLeft.removeEventListener("click",glidePrevious); 
                view.goRight.removeEventListener("click",glideNext); 
                var elem = view.silderContainer.firstChild; 
                var pos = view.silderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 5);
                function frame() {
                    if (pos >= 0) {
                        clearInterval(id);
                        previousImage();
                        elem.style.left = view.silderContainer.offsetWidth * (-1) + 'px';
                        view.goRight.addEventListener("click",glideNext); 
                        view.goLeft.addEventListener("click",glidePrevious);
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