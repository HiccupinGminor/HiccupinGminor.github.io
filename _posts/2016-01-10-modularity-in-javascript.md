---
layout: post
title: Javascript Modularity
published: true
---
A module is an organizational unit of code, and usually represents code designed to do one task, or one function. If you store like-purposed code in its own bundle, you will always know where to come looking for it when bugs come up in the future. 

Modules are used in order to:
- Encourage single responsibility for code units
- Improve code maintainability / organization
- Namespace code so there are no collisions between modules

Modularity is a useful tool to create clean code, and thus modules can be found in most languages.

Modularity is not rigidly imposed by the Javascript language as it is with Java for example. Since Javascript is not a class based language and has no native namespace mechanism, modules must be improvised by using function and object primitives. A simple method is to use native objects:

{% highlight js startinline=true %}
var dog = {

  speak: function() {
    console.log("Woof!");
  },
};
dog.speak();  // Woof!
{% endhighlight %}

An improvement that allows private methods and properties is the following:

{% highlight js startinline=true %}
var dog = (function(){
     var exclamation = “Woof!”;
     return {
          speak: function() {
               console.log(exclamation);
          }
     }
})();
dog.speak(); // Woof!
dog.exclamation; // undefined
{% endhighlight %}

This method makes use of an instantaneously invoked function expression. (iife). Note however that this module is incapable of having a parent that establishes the module’s default functionality. Extensibility is easily added like so:

{% highlight js startinline=true %}
var dog = (function(animal){
     var exclamation = animal.exclamation || “Woof!”;
     return {
          speak: function() {
               console.log(exclamation);
          }
     }
})(parent);

dog.speak(); // Woof!
dog.exclamation; // undefined
{% endhighlight %}

In order to load asynchronously and resolve dependencies that don’t exist yet, the following pattern is required:

{% highlight js startinline=true %}
var module = (function(module){
    var exclamation = module.exclamation || "Woof!";

    module.speak = function() {
       console.log(exclamation);
    }

    return module;
})(module || {});

module.speak(); // Woof!;
module.speak = function() {
    console.log("HOOT!");
}
module.speak(); // HOOT!;
{% endhighlight %}

Two general conventions exist for javascript module frameworks: AMD (Asynchronous Model Definitions) and CommonJS (Used in Node and Browserify)

AMD requires the specification of module dependencies in an iife like above using the keyword define();

CommonJS uses the following syntax to establish a module:

{% highlight js startinline=true %}
// foo.js
module.exports = {};

//OR
module.exports.name = “Jonathan”;
{% endhighlight %}

The file name is what is required by client code using this invocation:

{% highlight js startinline=true %}
var foo = require(“foo”); // path to foo.js
console.log(foo.name); // Jonathan
{% endhighlight %}

Each file therefore forms its own module capable of its own namespace. For server-side code such a system is sensible, but when a browser requests multiple scripts that must then be returned separately, long delays may result. To solve this, Browserify pre-compiles all dependencies into one file which can then be returned to the client efficiently.

The require method here can be replicated by the following function:

{% highlight js startinline=true %}
function require(dependency) {
     var code = new Function(“exports", readFile(dependency + “.js”); // “exports” represent the argument names
     var module.exports = {};
     code(module.exports);
     return module.exports;
}
{% endhighlight %}

The ES2015 standard introduces native modules to Javascript which will enable all developers to use the same great standard. I hope to get some time shortly to talk about them in detail.