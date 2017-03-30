
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    const people = [
      { name: 'Jon', year: 1988},
      { name: 'Daniel', year: 1992},
      { name: 'Eric', year: 1976},
      { name: 'Brad', year: 1993}
    ];

    const comments = [
      { text: 'Oh, wow!', id: 56372},
      { text: 'You are the best', id: 87362},
      { text: 'I was there too', id: 98372},
      { text: 'Where did you get that?', id: 97326},
      { text: 'That\'s all!', id: 12832}
    ];


    // Array.prototype.some() - to check if at least one thing in array match
    // const isAdult = people.some(function(person){
    //   const currentYear = (new Date()).getFullYear();
    //   if(currentYear - person.year >= 19){
    //     return true;
    //   }
    // });

    // OR

    // const isAdult = people.some(person => {
    //   const currentYear = (new Date()).getFullYear();
    //   return currentYear - person.year >= 19;
    // });

    // OR
    // use explicit return
    const isAdult = people.some(person => (new Date()).getFullYear() - person.year >= 19);   
    console.log({isAdult}); // this way we retur variable as object with it's value 

    // Array.prototype.every() - to check if all values of array equal to something
    const allAdults = people.every(person => (new Date()).getFullYear() - person.year >= 19);   
    console.log({allAdults}); // this way we retur variable as object with it's value 

    
    // Array.prototype.find() - returns 1st item that it finds
    // const comment = comments.find(function(comment){
    //   if(comment.id === 97326){
    //     return true;
    //   }
    // });

    // OR

    const comment = comments.find(comment => comment.id === 97326);
    console.log(comment); 

    // Array.prototype.findIndex()
    const index = comments.findIndex(comment => comment.id === 98372);
    console.log(index);

    // if we want to delete comment with that index
    // comments.splice(index,1);
    // OR
    console.table(comments);
    const newComments = [
      ...comments.splice(0,index), // use ... to spread items, so they are separate values
      ...comments.splice(index-1)  // otherwise we just push it as array into array
    ];

    console.table(comments);
    console.table(newComments);
});