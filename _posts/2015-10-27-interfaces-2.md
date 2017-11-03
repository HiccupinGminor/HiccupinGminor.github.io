---
layout: post
title: The Value of Interfaces Part 2
published: true
---
In the [last article](/2015/08/20/interfaces-1/) I wrote about interfaces and polymorphism, I reviewed their definition, usefulness, and some basic strategies of implementation. In this article, I show some examples of powerful interfaces in action.

## Explicit vs. implicit interfaces

Some programming languages give you the ability to write real interfaces with definite consequences of non-compliance. For example, PHP uses an interface construct which will deliver a run time error if you implement an interface without respecting its terms.

{% highlight php startinline=true %}
interface CarInterface() {
	public function getMake();
	public function getModel();
}

// Fatal error: Class HondaCivic contains 2 abstract methods
// and must therefore be declared abstract 
// or implement the remaining methods
class HondaCivic implements CarInterface { 
	
}
{% endhighlight %}

Many object oriented languages like Java also feature similar enforcement. 
Other languages like Javascript are not so strict. In these languages, an interface is one which *you* enforce for yourself. Self-enforcement of an interface still carries the same benefits as strict enforcement, but it lacks the built-in and convenient warnings if you forget an implementation.

If you build an implicit interface in Javascript you won't need the extra keystrokes that Java would require to build an interface, but you might find it more difficult later on when a bug spawned from a faulty implementation causes you to split from the world of technology in frustration and live as a hermit. Rather, the terms of the agreement will be a matter of agreement between all of the implementations and clients of the interface. Clearly, it's a matter of preference.

## Some interface patterns

Despite the cloud of mysticism, design patterns are simply common solutions to common programming problems. I often think that people are a bit too dogmatic about strict adherence to these patterns. There is no need to feel confined to this restricted set of tools for the sake of best practices, nonetheless you may consider them valuable because:

* They solve frequently occurring problems.
* They make your code easier to maintain and improve. 
* They help you name classes and methods.
* Knowing the principles underlying classic patterns reveals the fundamentals of good code.

The two patterns I talk about below are notable because of their dependence on strong interfaces (either implicit or explicit).

### Adapter pattern

The adapter pattern acts as a bridge between an interface and its implementation code. Let's say you'd like to change billing providers because your current provider started charging more or something. You search for a new billing solution, and come up with a likely candidate. It's rare that a library you want to use in your project obeys your interface perfectly. Indeed, there's no reason to expect it to obey your interface at all. In these cases, you'll need to write code to *adapt* the library's api to the interface you expect. For a concrete example, take a look at the following code:

{% highlight php startinline=true %}
// Interface
interface BillingInterface { 
	public function charge(Customer $customer, $amount, $isRecurring = false);
}

// Client code
class BillingClient { 
	
	protected $billing;
	
	public function __construct( BillingImplementation $billing ) {
		$this->billing = $billing;
	}
	
	public function buyWidget() {
		
		// Bill the customer for the widget. using $this->billing->charge() method
		
	}
}

class LibraryBiller { // Library class
	
	protected $amount;
	
	public function pay(Customer $customer) {
		// Transacts a payment from the Customer	
	}
	
	public function subscribe(Customer $customer) {
		// Subscribes a customer to a recurring payment
	}
	
	public function setAmount($amount) {
		$this->amount = $amount
	}
}
{% endhighlight %}

Note how the new LibraryBiller class doesn't obey the interface that the client code expects. On first instinct it might seem logical to change the client code so it can use the LibraryBiller directly, but it would mean intimately coupling your client code to the 3rd party library. This would teach your program the bad habit of neediness, because when that library you depend on changes, your code will need to change as well. 

A more sustainable solution would be to adapt the LibraryBiller to your old interface. That way, using the new library will be a simple drop-in replacement for the old billing implementation. In the future, if you want to switch to a separate billing library, your transition will be easy. Your code will no longer depend on a specific billing implementation, and everything will be clean, maintainable, and happy.

Keep in mind that although in this example we are using an explicit interface thanks to PHP 5, this interface could just as easily be an implicit one. The same principles still apply.

Let's write the adapter class for the LibraryBiller:

{% highlight php startinline=true %}
class LibraryBillerAdapter implements BillingInterface {
	
	public function __construct(LibraryBiller $biller) {
	
		$this->biller = $biller;
	}
	
	public function charge(Customer $customer, $amount, $isRecurring = false) {

		$this->biller->setAmount($amount);
		
		if($isRecurring) {
			$this->biller->subscribe($customer)
		}
		else {
			$this->biller->pay($customer);
		}
	}
}
{% endhighlight %}

Note how the conflict between the interface of the LibraryBiller class and the established BillingInterface can be neatly corrected by injecting the LibraryBiller into a wrapper or adapter class (LibraryBillerAdapter) that is purpose-built to obey the BillingInterface. If the LibraryBiller class changes in the future, the necessary updates will be restricted to the LibraryBillerAdapter class only.

### Strategy pattern

The strategy pattern allows you to choose algorithms / strategies / implementations at run time. Each strategy obeys the same interface and is thus completely interchangeable.

{% highlight php startinline=true %}
class DepthFirstStrategy implements SearchInterface {
	
	public function search($graph, $item) {
		// Choose
	}
}

class BreadthFirstStrategy implements SearchInterface {
	
	public function search($graph, $start, $end) {
		// Look thee in the brambles and bushes
		// in front of the forest
	}
}

interface SearchInterface {
	
	public function search($graph, $start, $end);
}

{% endhighlight %}

Note that whatever client code we write could just as well use one search strategy as the other, thanks to the nice interface. Cool, but we are familiar with this by now. The real benefit of the Strategy Pattern is that these two implementations can be swapped out on the fly during execution. Look at this client code:

{% highlight php startinline=true %}
class MapResource {
	
	public function route($graph, $pointA, $pointB, $needForSpeed) {
		
		if($needForSpeed < .5) {
			$strategy = new BreadthFirstStrategy();
		}
		else {
			$strategy = new DepthFirstStrategy();
		}
		
		$strategy->search($graph, $pointA, $pointB)
	}
}
{% endhighlight %}

Based on this made-up measure of "$needForSpeed", we can now prioritize one search strategy over the other. And thanks to interfaces, we can simply call the search method on the strategy without knowing exactly which implementation we have selected. Note that this relieves us of asking our program "What search strategy are you?". Instead, we can just say "Since I know you obey the SearchInterface and you have a search() method, call your search() method". In other words, we don't ask what the code is capable of with conditionals, we command it to do what we know it is able to do.

Interfaces are a great way to make your code maintainable and future proof. If you want to switch something out in the future, a sturdy, well-enforced interface will make that possible. Interfaces allow your modules to live independently from each other and furthermore, gives them the ability to talk through comunicate through approved channels with other modules. The less your module knows about what lies beyond the interfaces to other modules, the better your code will be. With whatever language or paradigm you choose, put the universal benefits of good interfaces to use.