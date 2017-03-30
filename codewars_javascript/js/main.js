
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    // https://www.codewars.com/kata/52b7ed099cdc285c300001cd/train/javascript
    var intervals = [
      [1,8],
      [12, 15],
      [3, 5],
      [5,10]
    ]

    // sort elements from lowest to highest
    intervals.sort((a,b) => a[0]-b[0]);

    // =>         [1,8],
    //            [3, 5],
    //            [5,10]
    //            [12, 15],

    // catch overlapping intervals
    // there are 2 cases
    // 1. element is inside the previous element, so we don't return it
    // 2. element is out of border -> so we return element 1 border left and element 2 border right

    var reducedInternvals = [];
    for(var i = 0, length = intervals.length; i < length - 1; i++){
      if(intervals[i+1][0] > intervals[i][0] && intervals[i+1][1] < intervals[i][1]){
        // do nothing
      } else {
        reducedInternvals.push(intervals[i+1]);
      }
      
    }
 

    console.log(reducedInternvals);


});