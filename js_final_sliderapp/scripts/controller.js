define(
    'controller',
    ['jquery', 'model', 'view'],
    function() {

        function Controller(id, model, view) {
        
            view.goRight.addEventListener("click",glideNext);   
            view.goLeft.addEventListener("click",glidePrevious);     

            function glideNext() {
                var elem = view.silderContainer.firstChild; 
                var pos = view.silderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 5);
                function frame() {
                    if (pos == view.silderContainer.offsetWidth * (-2)) {
                        clearInterval(id);
                        nextImage();
                        elem.style.left = view.silderContainer.offsetWidth * (-1) + 'px';
                    } else {
                        pos--; 
                        elem.style.left = pos + 'px'; 
                    }
                }
            }       

            function glidePrevious() {
                var elem = view.silderContainer.firstChild; 
                var pos = view.silderContainer.offsetWidth * (-1);
                var id = setInterval(frame, 5);
                function frame() {
                    if (pos == 0) {
                        clearInterval(id);
                        previousImage();
                        elem.style.left = view.silderContainer.offsetWidth * (-1) + 'px';
                    } else {
                        pos++; 
                        elem.style.left = pos + 'px'; 
                    }
                }
            }                   
             

            function nextImage(){

                model.centralImageIndex++;
                if(model.centralImageIndex > (model.images.length - 1)){
                    model.centralImageIndex = 0;
                }

                view.render(id, model.images, model.centralImageIndex);               
            }

            function previousImage(){

                model.centralImageIndex--;
                if(model.centralImageIndex < 0){
                    model.centralImageIndex = model.images.length - 1;
                }

                view.render(id, model.images, model.centralImageIndex);                 
            }            


        }
        
        return Controller;
    }
);