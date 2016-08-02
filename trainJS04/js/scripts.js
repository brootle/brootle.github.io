console.log(document.documentElement); // root element of HTML page

console.log(document.body); // points to body element

console.log(document.body.childNodes);

var htmlElement = document.getElementById('allMenu');

console.log(htmlElement);

var tagElements = document.getElementsByTagName('li');
console.log(tagElements);

var classElements = document.getElementsByClassName('menu');
console.log('element selected by name of class: ',classElements);

// get all elements by selector / classname as it's in css file
var selectorAllElements = document.querySelectorAll('.menu__item');
console.log(selectorAllElements);

console.log('=======================================================');
//  ак выбрать элементы класса class2 непосредственный родитель у которых принадлежит к классу class1
selectorAllElements = document.querySelectorAll('.menu > .menu__item');
console.log(selectorAllElements);
console.log('=======================================================');

console.log('=======================================================');
//  ак выбрать элементы класса class2 которые непосредственно следуют за элементами класса class1 на одном уровне
selectorAllElements = document.querySelectorAll('.menu ~ .some-class-for-test');
console.log(selectorAllElements);
console.log('=======================================================');

var firstElementBySelector = document.querySelector('.menu__item');
console.log('select 1st element by class name: ', firstElementBySelector);

firstElementBySelector = document.querySelector('.menu__item.other__class');
console.log('select 1st element by 2 class names: ', firstElementBySelector);

firstElementBySelector = document.getElementsByClassName('menu__item other__class');
console.log('select 1st element by 2 class names: ', firstElementBySelector);


// get all <a> that belong to '.menu__item'
var linkElements = document.querySelectorAll('.menu__item a');
console.log(linkElements);

// access link by index and set value using innerHTML
linkElements[2].innerHTML = 'hello world';

// get value of 'href' attribute of <a> with index 2 of '.menu__item' class
console.log(linkElements[2].getAttribute('href'));

// set attribute value
linkElements[2].setAttribute('href', 'new value');
console.log(linkElements[2].getAttribute('href')); // print new value

// remove attribute
linkElements[2].removeAttribute('href');

var myLink = linkElements[2];
console.log(myLink.className); // show name of class as string 
console.log(myLink.classList); // shows classes of the element as a list

// add class
myLink.classList.add('some_class');

// remove class
myLink.classList.remove('menu__link');

// set style of the element
myLink.style.color = 'red';

console.log('//////////////////////////////////////////////');

// create new element
var newElement = document.createElement('div');
newElement.classList.add('new-element-class');
newElement.innerHTML = 'we just created this DIV in JavaScript';

// locate the DIV where we will add new element
var wrapper = document.querySelector('.wrapper');
//wrapper.appendChild(newElement); // add element after last child

// insert element before first child
//wrapper.insertBefore(newElement, wrapper.firstChild);
//wrapper.insertBefore(newElement, wrapper.children[0]); //we can insert anywhere!

console.log(wrapper.children);

// removing a child
var listInsideWrapper = wrapper.querySelector('ul');
//wrapper.removeChild(listInsideWrapper);
//replacing the child
wrapper.replaceChild(newElement, listInsideWrapper);

//document.body.appendChild(newElement); // add element after last child

