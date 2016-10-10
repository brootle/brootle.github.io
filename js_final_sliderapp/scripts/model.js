define(
    'model',
    function() {

        function Model() {

            this.Init = function(images){
                this.images = images;
                this.centralImageIndex = 0;
            }            

        }
        
        return Model;
    }
);