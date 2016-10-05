define(
    'model',
    function() {

        function Model() {

            this.Init = function(data){
                this.data = data;
            }

            this.addItem = function(item){
                this.data.push(item);
                return this.data;
            }

            this.removeItem = function(item){
                this.data.splice(this.data.indexOf(item),1);
                return this.data;
            }       

            this.editItem = function(oldItem,newItem){
                this.data[this.data.indexOf(oldItem)] = newItem;
                return this.data;
            }                   

        }
        
        return Model;
    }
);