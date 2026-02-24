1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById selects one element using a unique id.
getElementsByClassName selects all elements with the same class and returns a live collection.
querySelector selects the first element that matches a CSS selector.
querySelectorAll selects all matching elements and returns a static NodeList.

2. How do you create and insert a new element into the DOM?
First create an element using createElement(), then add content, and insert it using appendChild().

3. What is Event Bubbling? And how does it work?
Event bubbling means an event starts from the target element and moves upward to its parent elements automatically.

4. What is Event Delegation in JavaScript? Why is it useful?
Event delegation means using one event listener on a parent to handle events from its child elements.
It is useful because it reduces code and improves performance.

5. What is the difference between preventDefault() and stopPropagation()?
preventDefault() stops the browser’s default action.
stopPropagation() stops the event from bubbling to parent elements.