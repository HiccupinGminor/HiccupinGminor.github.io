---
layout: post
title: Prototypal Inheritance in Javascript
published: true
---
As mentioned in my last post, I am trying to learn about interesting topics by writing a little summary about them. This is one of the “one-pagers” that I wrote a while ago:

Javascript does not use a class-based structure for objects, rather it makes use of object prototypes. Javascript is the only major programming language that uses the prototypal inheritance paradigm.

### Prototype Chain
Each object, function, or array has a prototype. A prototype contains properties that are accessible by its implementers. In essence, a prototype operates similarly to a parent class with some key differences.

     function Cat() {
          this.speak = function() {
               console.log(“meow”);
          }
     }

     Object.getPrototypeOf(Cat) // “Function"

Objects inherit functionality from their constructor’s prototype property and not their own.

     var coolArray = new Array();

     coolArray.prototype.foo = “bar”; // This will result in an error;

Instead:

     Array.prototype.foo = “bar”;

     coolArray.foo; // “bar"

If B has a property and B is the prototype of A, A will also have access to that property. When a property is called on A, javascript will look for the property within A. If it is unsuccessful, the prototype of A will be searched of the property. If the property is still not found the result of the search will be undefined or null. Because of this searching process, there is a performance penalty for using long prototype chains.

### What Prototypes Do
Prototypes provide run-time composition for objects. Objects that “extend” from a common prototype will all be able to share that prototypes methods. Even after the child objects have been created, new prototype properties will automatically be available on all of the prototype’s children. This is a very powerful ability and is not paralleled in traditional class-based object oriented languages. Methods and properties can be added to prototypes on the fly.

### Declaring a Prototype
     var newObject = Object.create(prototype); // Creates a new object with the provided prototype

     newObject.__proto__ = prototype; // Deprecated

     class newObject extends prototype { // ES6 Syntatic Sugar

     }

### Prototyping Pitfalls
There is nothing stopping a programmer from carelessly overwriting a much-used prototype method. Extending the base prototypes (Array, Function, {}) is considered a bad practice as this may unexpectedly change the API for implementers.

To create an object with no prototype, the following method can be used:

     var newObject = Object.create(null);

This technique will ensure that an object will not be at the mercy of its prototypes' functionality.

Determining whether an object has a property on its own is achieved in the following way:

     var oldObject = {foo: “bar”};

     var newObject = Object.create(oldObject);

     newObject.fizz = “buzz”;

     newObject.hasOwnProperty(“foo”) // false
     newObject.hasOwnProperty(“fizz”) // true