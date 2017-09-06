
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    // if items exist in local storage we take them there, otherwise use empty array
    const items = JSON.parse(localStorage.getItem('items')) || [];

    function addItem(e){
      e.preventDefault();

      const text = (this.querySelector('[name=item]')).value;
      const item = {
        text,         // this is same as text: text
        done: false
      }

      items.push(item);
      populateList(items, itemsList); // call the function that will add data to the page
      localStorage.setItem('items', JSON.stringify(items)); // save data to local storage as string
      this.reset();   // to clear the input after we submitted item

      console.table(items);
    }

    // make empty array by default to prevent from bugs
    // and we give html element where we will put the list
    function populateList(plates = [], platesList){
      platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
            <input
              type="checkbox" 
              data-index=${i} 
              id="item${i}" 
              ${plate.done ? 'checked' : ''}
            />
            <label for="item${i}">${plate.text}</label>
          </li>
        `;
      }).join('');  // map function will return array and we need to
                    // join it into String 
    }

    function toggleDone(e){
      // if we click anything exept checkbox - do nothing
      if(!e.target.matches('input')) return;
      const element = e.target;
      // we can get index from data that we set before creating element
      const index = element.dataset.index
      console.log(index);
      // now just set the opposit to current 'done' property
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items)); // save data to local storage as string
      populateList(items, itemsList); // call the function that will add data to the page
    }

    addItems.addEventListener('submit', addItem);
    // we attach listener to <ul>, because <li> do not exist yet
    itemsList.addEventListener('click', toggleDone);

    // get initial items if they exist in local storage
    populateList(items, itemsList); // call the function that will add data to the page
  
});