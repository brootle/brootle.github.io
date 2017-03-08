
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Albert', last: 'Einstein', year: 1479, passed: 1555 },
      { first: 'Bruno', last: 'Einstein', year: 1520, passed: 1585 },
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Albert', last: 'Einstein', year: 1379, passed: 1455 },
      { first: 'Kopernik', last: 'Einstein', year: 1500, passed: 1555 },
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 }
    ];

    const people = ['Aeck, Glen', 'Neck, Glen', 'Oeck, Glen' ,'Beck, Glen', 'Xeck, Glen',
    'Geck, Glen', 'Neck, Glen', 'Ceck, Ylen', 'Zeck, Glen', 'Keck, Glen', 'Leck, Glen',
    'Qeck, Glen'];

    // Array.prototype.filter()
    // 1. Get inventors who were born in 1500
    // var inventors1500 = inventors.filter(function(val) {
    //   return val.year >= 1500 && val.year <=1600;
    // });    

    // we can also write same thing in such way
    var inventors1500 = inventors.filter(val => val.year >= 1500 && val.year <=1600);        

    console.table(inventors1500);

    // Array.prototype.map()
    // 2. return array of 1st and last names
    // var inventorsFirstLastNames = inventors.map(function(val){
    //   return `${val.first}, ${val.last}`;
    // });

    var inventorsFirstLastNames = inventors.map(val => `${val.first}, ${val.last}`);    
    
    console.log(inventorsFirstLastNames);

    // Array.prototype.sort()
    // 3. sort by birthdate, oldest to youngest
    // inventors.sort(function(a, b) {
    //   return a.year - b.year;
    // });    

    inventors.sort((a, b) => a.year - b.year);       

    console.table(inventors);

    // Array.prototype.reduce()
    // 4. how many years did all inventors lived together  
    var yearsLivedTotal = inventors.reduce((total, val) => {
      return total + (val.passed - val.year);
    }, 0); // when we do '}, 0);' we actually give initial value to 'total'

    console.log(yearsLivedTotal);

    // 5. sort by years lived from oldest to youngest
    inventors.sort((a, b) => (b.passed - b.year) - (a.passed - a.year)); 
    console.table(inventors);

    // 6. get boulvards in Paris that have 'de' in their names
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // do this in console on the wikipedia article

    // const category = document.querySelector('.mw-category');
    // const links = Array.from(category.querySelectorAll('a')); // convert nodeList to Array
    // // const links = [...category.querySelectorAll('a')]; // this is called spread 

    // const de = links
    //             .map(link => link.textContent)
    //             .filter(streetName => streetName.includes('de'));

    
    // 7. sort people by last names
    const alpha = people.sort((lastOne, nextOne) => {
      // here we declare new array and assign values of splitted last and first names
      const [aLast, aFirst] = lastOne.split(', ');
      const [bLast, bFirst] = nextOne.split(', ');
      return aLast > bLast ? 1 : -1;
    });
     
    console.log(alpha);    

    // 8. reduce
    // sum up instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike',
    'walk', 'car', 'van', 'bike', 'truck'];

    const transportation = data.reduce(function(obj,item){

      //console.log(item);

      // add key to the object if it doesn't exist yet and set its value to zero
      if(!obj[item]){
        obj[item] = 0;
      }

      obj[item]++; // this will icrement a value of object key

      return obj;

    }, {}); // here ', {}' is a blank object, we declared variable 'obj' for it

    console.log(transportation);

});