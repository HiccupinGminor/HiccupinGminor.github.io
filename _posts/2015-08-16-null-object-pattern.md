---
layout: post
title: Null Object Pattern
published: true
tags: design patterns, PHP
---

The Null Object pattern is a simple strategy to remove existence checks from code. 

Take a look at the following php classes:
{% highlight php startinline=true%}	
class AnimalFactory {

	public static function create($name) {
		
		if($name == 'Napoleon') {
			return new Pig();
		}
		else if($name == 'Boxer') {
			return new Horse();
		}
		else if($name == 'Benjamin') {
			return new Donkey();
		}
	}
}

class Pig {

	public function speak() {
		
		return "Oink!";
	}
}

class Horse {
	
	public function speak() {
		
		return "Neigh!";
	}
}

class Donkey {

	public function speak() {
		
		return "Hee Haw!";
	}
}
{% endhighlight %}
	
With just the name of the animal that we want to hear, we can create dynamic instances. These classes allow us to write this simple implementation:

{% highlight php startinline=true%}
$animal = AnimalFactory::create('Napoleon'); // Instance of Pig class returned
$animal->speak(); // "Oink!"
{% endhighlight %}

We run into a bit of trouble however, when we want to hear from an animal whose class has not been defined.

{% highlight php startinline=true %}
$animal2 = AnimalFactory::create('Moses'); // null
$animal2->speak(); // PHP Fatal error:  Call to a member function speak() on null
{% endhighlight %}	

There are a couple of solutions to this problem. Amending the animal factory class in the following way would be a slight improvement:

{% highlight php startinline=true%}		
class AnimalFactory {

	public static function create($name) {
		
		if($name == 'Napoleon') {
			return new Pig();
		}
		else if($name == 'Boxer') {
			return new Horse();
		}
		else if($name == 'Benjamin') {
			return new Donkey();
		}
		else {
			throw new Exception('Animal class not found');
		}
	}
}
{% endhighlight %}

The result would be more helpful to the developer implementing the class:

{% highlight php startinline=true%}
$animal2->speak(); // PHP Fatal error:  Uncaught exception 'Exception' with message 'Animal class not found'
{% endhighlight %}	
	
Now the error message is less generic. Also, this approach outputs a stack trace so the problem can be tracked down more easily.  Although an improvement over the unmodified AnimalFactory class, the exception still results in a fatal error which halts the program's execution. In some cases this is undesirable.

To avoid stopping the script we can change our implementation by adding a check for the existance of the animal instance:

{% highlight php startinline=true%}
$animal2 = AnimalFactory::create('Moses'); // NULL

if($animal2) {
	echo $animal2->speak(); // Never gets called
}
{% endhighlight %}	

But what if we want to avoid adding this conditional to our code? Instead of asking if the animal instance exists can we simply expect the output of the factory class to say something even if no proper animal class has been established yet? In this situation the Null Object pattern can prove useful. A Null Object is designed to be substitable for instances of other objects but only outputs the default or base case behavior. 

It's essential that the Null Object has the same interface as the other classes:

{% highlight php startinline=true%}
class NullAnimal {
	
	public function speak() {
		return "I am an animal";
	}
}
{% endhighlight %}	

To use it, we modify the AnimalFactory like so:

{% highlight php startinline=true%}
class AnimalFactory {

	public static function create($name) {
		
		if($name == 'Napoleon') {
			return new Pig();
		}
		else if($name == 'Boxer') {
			return new Horse();
		}
		else if($name == 'Benjamin') {
			return new Donkey();
		}
		else {
			return new NullAnimal();
		}
	}
}
{% endhighlight %}	
	
Now nothing will go wrong when we try and run the program with the unaccounted for name:

{% highlight php startinline=true%}
$animal2->speak(); // "I am an animal"
{% endhighlight %}	
	
Traditionally, Null Objects are so named because they return a literal null value:

{% highlight php startinline=true%}
class NullAnimal {
	
	public function speak() {
		return null;
	}
}

$animal2->speak(); // NULL
{% endhighlight %}	
	
Whether or not this is needed in your program is up to you.