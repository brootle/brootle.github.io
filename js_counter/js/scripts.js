document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    function countNotRepeatedPermutations(str){

        var arr = getStringPermutations(str);

        var counter = 0;
        for(var i = 0; i < arr.length; i++){

            var regExp = /^((\w)(?!\2))+$/i;

            if(regExp.exec(arr[i]) !== null){
               counter++; 
            }

        }
        return counter;
    }

    console.log(countNotRepeatedPermutations("aab"));


    function getStringPermutations(str){   

        if(str.length === 1){
            // if there is only 1 letter left we return it 
            return [str];
        } else {

            // this is going to be the result array of all permutations
            var AllStringPermutations = [];           

            // here we should go through string and swap letters
            for(var i = 0; i < str.length; i++){
                // get each letter of a string
                var letter = str[i];
                // get shorter string
                var cutString = str.substr(0, i) + str.substr(i + 1, str.length - 1);

                var cutStringdArray = getStringPermutations(cutString);

                for (var j = 0; j < cutStringdArray.length; j++) {
                    AllStringPermutations.push(letter + cutStringdArray[j]);
                }              

            }

            return AllStringPermutations;

        }

        
    }
    
    console.log(getStringPermutations("aab"));

});        




    // solution for this challenge https://www.freecodecamp.com/challenges/no-repeats-please

    // function permAlone(str) {

    //     var totalCombination = 0;

    //     var positions = [];
    //     for(var i = 0; i < str.length; i++){
    //         positions.push(i);
    //     }
    //     console.log(positions + " : " + convertPositionsToString(str, positions));
    //     //console.log(convertPositionsToString(str, positions));
        
    //     var variants = [];
    //     variants.push(positions);

    //     // swap elements of the array till we get to the same we had at the start
    //     var counter = 0;
        
    //     do{
            
    //         for(var i = 0; i < positions.length-1; i++){

    //             swapElements(positions, i, i+1);

    //             // check if this position is ok
    //             // console.log(positions);
    //             // console.log(convertPositionsToString(str, positions));
    //             console.log(positions + " : " + convertPositionsToString(str, positions));
    //             totalCombination++;
    //         }
            
    //         counter++;
            
    //     }while(counter < str.length);

        
    //     return totalCombination;
    // }

  

    // function swapElements(positions, pos1, pos2){
    
    //     var temp = positions[pos1];
    //     positions[pos1] = positions[pos2];
    //     positions[pos2] = temp; 

    // }

    // function convertPositionsToString(str, positions){
    //     var resultString = '';
    //     for(var i = 0; i < positions.length; i++){
    //         resultString+=str[positions[i]];
    //     }
    //     return resultString;
    // }


    // var result = permAlone('aabb');
    
    // console.log(result);

    // var html = '';

    // for(var i = 0; i < result.length; i++){
    //     html+="<div>" + result[i] +  "</div>"
    // }

    // var container = document.getElementById("resultArray");
    // container.innerHTML = html;
    ///////////////////////////////////////////////////////////////////////









