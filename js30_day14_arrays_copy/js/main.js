
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    const players = ['alex','jack','steven','harry'];
    console.log(players);

    // this way we just create a pointer from 'team' to 'players'
    const team = players;
    console.log(team,players);

    // when we change element in reference array it's changed in array it points to as well
    team[3] = 'sam';
    console.log(team,players);

    // OK, now we copy content of original array to new array
    const team2 = players.slice();
    console.log(team2);
    const team3 = [].concat(players);
    console.log(team3);
    // or use ES6 spread function
    const team4 = [...players];
    console.log(team4);
    const team5 = Array.from(players);
    console.log(team5);


    // NOW SAME THING WITH OBJECTS
    const person = {
      name:'alex',
      age: 37
    }
    console.log(person);

    // here we actually make a reference (pointer)
    const captain = person;
    captain.number = 80;
    console.log(person);

    // now let's make a copy, but this only  works with 1 level objects
    const cap2 = Object.assign({}, person, {number:99, age:12});
    console.log(person,cap2);

    const cap3 = Object.assign({}, person);
    console.log(cap3);

    // now copy objects with many levels deep
    const dev = {
      name:'kevin',
      age:23,
      social:{
        twitter:'brootledev',
        facebook:'brootle'
      }
    }
    console.log(dev);
    
    // first we convert object to string and convert string to object
    const dev2 = JSON.parse(JSON.stringify(dev));
    dev2.social.twitter='crazylog';
    console.log(dev,dev2);
  
});