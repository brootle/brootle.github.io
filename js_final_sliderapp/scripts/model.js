define(
    'model',
    function() {

        function Model() {

            this.Init = function(images, texts){
                this.images = images;
                this.centralImageIndex = 0;
                this.texts = texts;
            }            

        }
        
        return Model;
    }
);