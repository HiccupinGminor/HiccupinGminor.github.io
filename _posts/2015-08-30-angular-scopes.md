---
layout: post
title: Scopes in Angular
published: true
tags: AngularJS, Javascript
---

A scope in Angular is a glue layer between controllers and views. The purpose of the scope is principally to watch properties and propagate events. For those who have used Angular, the scope is recognizable as the **$scope** argument that is often passed into controllers.

Scope also allows the decoupling of controller from the view which prevents either from being dependent on the specific implementation of the other. In angular, a scope is considered to be a model, and occupies the "M" spot in the "MVC" acronym of "Model, View, Controller". 

Decoupling from the view layer makes controllers very trivial to test, as a mocked scope can be injected into a test method without having to worry about DOM interactions. Likewise the view layer does not need to know anything about the controller that is providing its data. 

##Isolate Scopes

There is such a thing as an isolate scope (such as a scope within a directive) that does not inherit prototypically from its context scopes. This enables reusable elements which are not bound to certain implementation patterns.

##Properties of Scopes
* All scopes inherit via prototypical inheritance from the **$rootScope**. 
* All scopes are plain javascript objects. 
* Child scopes inherit the properties of parent scopes. 
* Parent scope properties can be accessed with the **$scope.$parent** interface. 
* Actions can be bubbled up for parent controllers to handle with the **$emit** API
* Actions can be broadcast to children using **$broadcast**. $scope events must be handled with the use of the $scope.$on(event, handler) api

##$scope.$apply

$scope.$apply(function) is used to introduce a value into the angular context from something outside of it. For example, if a jQuery DOM selector is used in a directive to change some text, angular will be unaware of this change unless notified via $scope.$apply(). $scope.$apply actually evaluates the argument function within a try catch and activates the $digest() function and cycle. Most of the angular api is automatically executed from within $apply() (ng-model, $http, $resource, controller initialization) so it shouldn’t be used except in a few cases. This function is commonly called within a directive’s “link()” method to bring changes from outside of the Angular universe back in. 

##$watch
The $watch(valueToWatch / watchFunction, listenerFn) function registers a value to watch, and a listener function to execute if that value is changed. For example, let’s say $HTTP service watched $scope property is modified. Once the digest cycle runs and identifies the change, the watch’s listener function will be triggered and will fire. 

Watch functions are automatic and ubiquitous throughout the angular ecosystem but it is occasionally necessary to use one’s own. Watch functions must be kept very lean and idempotent as they will be run quite often. 

##$watchCollection
$watchCollection accomplishes the same thing as $watch but is capable of checking the values of arrays or objects for changes. As a consequence, it is less thorough than a simple watch operation which merely examines if the reference has changed. With $watchCollection, detection is shallow and does not modify deeply nested data.

$watch(valueToWatch, listenerFn, true) is capable of deep, value-based comparisons of collection objects. This is the most time consuming (and memory devouring) of the operations within the watch family. The full nested data structure is traversed and a copy of the structure must be held in memory.

##$digest
The $digest() function is angular’s heartbeat, and is responsible for checking all watched values. It examines if the watched values have become “dirty”, and executes a scope update of any listener functions associated with any values that have become dirty. To know what is dirty the digest is aware of the previous value of the watched property. 

The digest function will run until all watched values have stabilized up to a maximum of 10 times before throwing an exception. The digest function does not poll the watchers on any regular interval, rather a digest must be triggered. The digest function can be called manually, but calling **$scope.$apply** is considered a better practice as code is evaluated in a try catch loop. 

##In Conclusion...
Understanding Angular's concept of scope has been critical to my understanding on Angular in general. If you are intent on learning more about Angular, internalize scope and you will demystify what gives Angular its pointy Angularity :)