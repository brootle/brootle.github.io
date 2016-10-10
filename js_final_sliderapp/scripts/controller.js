define(
    'controller',
    ['jquery', 'model', 'view'],
    function() {

        function Controller(id, model, view) {
        
            view.goRight.addEventListener("click",nextImage);   
            view.goLeft.addEventListener("click",previousImage);           

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