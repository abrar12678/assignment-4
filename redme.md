1.1 Find elements with id. Only one element can have that id. It is used when we have to do any work or to do customize only one element. 
1.2 Find elements with class. It is used when we have to customize or to do same thing on many same elements.
1.3 Returns the first element from same css selector.
1.4 Returns all elements which have same css selector.

2. I use document.creatElement() and then append it by methods like append.child or insertBefore

Example ---->

let newParagraph = document.createElement("p");
newParagraph.textContent = "Hello, I am new!";

let container = document.getElementById("container");
container.appendChild(newParagraph);

let referenceNode = document.getElementById("reference");
container.insertBefore(newParagraph, referenceNode);


3. Event Bubbling is a way by which events propagate in the DOM. When an event happens on an element, it bubbles up through it's parent elements until it reaches the <html> element.

4. Event Delegation is a pattern where you attach a single event listener to a parent element instead of multiple child elements.

It is useful becuase ---->

a. Less memory consumption
b. Handles dynamically added elements without adding listeners again




5.1 Prevents the browser’s default behavior
5.2 Stops the event from bubbling up