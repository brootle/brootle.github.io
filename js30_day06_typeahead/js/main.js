
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

    const cities = [];
    
    // fetch goes and gets stream of data from the link
    // we convert that stream of data to json
    // and after that we can iterate over that data
    // this '...' is called spread
    // cities.push(...data) - data is an array, so if we simply push it to cities
    // citis will be an array with data as another array in it...
    // when we use 'push(...data)' it breaks array into separate values and push then in one by one
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data));

    console.log(cities);

    // replace 550440 with 550,440
    function numberWithComas(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
    }

    function findMatches(wordToMatch, cities){
      // now we filter, it means we iterate over array
      // each element of an array is an object
      return cities.filter(place => {
        // here we will return matched
        const regex = new RegExp(wordToMatch, 'ig');
        // we just check in city parameter of an object match regular expression
        // or return state
        return place.city.match(regex) || place.state.match(regex);
      })
    }
    
    function displayMatches(){
      // show value of element that called this function
      // that is input value in our case
      // console.log(this.value);
      const matchArray = findMatches(this.value,cities);
      //console.log(matchArray);
      const html = matchArray.map(place => {

        // we can also highlight part of the matched city name
        const regex = new RegExp(this.value,'gi');
        const cityName = place.city.replace(regex,`<span class="h1">${this.value}</span>`);
        // and do same thing for state name
        const stateName = place.state.replace(regex,`<span class="h1">${this.value}</span>`);

        return `
            <li>
              <span class="name">${cityName}, ${stateName}</span>
              <span class="population">${numberWithComas(place.population)}</span>
            </li>
          `;
      }).join(''); // the .map will return array, and we join it into single string
      
      suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    // 'change' even will be triggered after we change input and click somewhere out of input
    searchInput.addEventListener('change',displayMatches);
    // 'keyup' will be triggered when we unpress a key on a keyboard
    searchInput.addEventListener('keyup',displayMatches);

});