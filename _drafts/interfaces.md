---
layout: post
title: The Value of Interfaces
published: true
---
The strategy pattern addresses a fundamental principle of good programming which is known as *Polymorphism*. In a nutshell, polymorphism is when multiple implementations can be used interchangeably provided that each agrees with the same interface or contract.

To clarify, consider that many companies manufacture batteries. Acting on their own and without consulting each other, each battery manufacturer may choose to make batteries to different technical specifications of shape, size, and voltage. 

There would be no assurance that the batteries would be uniform in any way at all.
Bob's Batteries might build a battery with a larger diameter than the batteries built by Barbara's Batteries. Whatever device uses Barabara's Batteries, would not be able to use Bob's. 

	                                                               
	 Bob's Batteries     <------------------>  Derren's Devices   
	                                                               
	                                                               
	 Barbara's Batteries <------------------>  Diedra's Devices   
	                                                               
	                                                               
	 Bill's Batteries    <------------------>  Delia's Devices    
                                                               

This would be a big problem as it would be unlikely that a given customer would be in possession of the batteries that match the exact type that their device requires.

Thankfully batteries and battery holders are built according to defined standards (AA, AAA, D, etc). By designing batteries that match one of these standards, manufacturers are assured that their batteries can be inserted into many different types of devices. Similarly, device manufacturers rest easy knowing there will always be plenty of batteries lying around in their customers' houses that fit into their battery holders. Nice!

	                           +------+                       
	                           |      |                       
	Bob's Batteries     +----> |      | +-->  Derren's Devices
	                           |      |                       
	                           |      |                       
	Barbara's Batteries +----> |  AA  | +-->  Diedra's Devices
	                           |      |                       
	                           |      |                       
	Bill's Batteries    +----> |      | +-->  Delia's Devices 
	                           |      |                       
	                           +------+                       


The standards of size and voltage that define an AA battery can be considered an *interface* or a *contract*. Any battery from any manufacturer that meets the requirements of the interface will be able to fit into any device that uses AA batteries. The battery firms need not consult with the device firms about battery specs, the only concern is to obey the *interface* provided by the AA standard.

Note the dependence relationship between Battery and Device companies in the first diagram and the second. In the first, battery companies and device companies are mutually dependent. If a device company goes out of business, a battery company is bound to go as well. However, in the second diagram, no company is exclusively dependent on any other.

Interfaces produce the same positive results in programming as they do in the world of electronics. By following an interface, your code will be easier to maintain and update in the future. When technologies change, new ones can be slotted into place using the same interface without any modification in other parts of your code. I will write more about the value of interfaces in the coming weeks.

For example, let's say you need a method of billing a customer for a purchase. Perhaps you would choose Stripe to handle payments. You go to download the official wrapper library and you get something like this:

{% highlight php startinline=true%}
class StripeBiller {
	
	public function process(StripeCard $credit_card, $charge_amount) {
		
		// Execute billing through Stripe
	}
}

class StripeCard {
	
	public function __contruct($card_num, $expiration) {
	
		$this->num = $card_num;
		
		$this->expiration = $expiration;
	}
	
	// Card stuff
}
{% endhighlight %}

You might use your StripeBiller thusly:

```
class User {
	
	protected $stripe;
	
	public function __construct(StripeBiller $stripe) {
		
		$this->stripe = $stripe;
		
	}
	
	public function setCard($card_num, $expiration) {
		
		$this->card = new StripeCard($card_num, $expiration);
	}
	
	public function charge() {
		
		if(!isset($this->card)) {
			
			throw new Exception('Card not set');
		}
		
		return $this->stripe->process($this->card, 20);
	}
}
```
The code above is dependent or heavily coupled to Stripe's way of doing things.

Let's say Stripe raises its merchant rates and Braintree becomes a more attractive option. You download the Braintree wrapper library and add it to your project.

```
class Braintree {
	
	public static function bill(Card $customer_card, $amount) {
		
		// Handle billing
	}
}

class BraintreeCard {
	
	public function setNum($num) {
		
		// Set card number
	}
	
	public function setExpiration($expiration) {
	
		// Set expiration
	}
	
	public function isValid() {
		
		// Check if card is valid
	}
}
```

Note the different signature of the new wrapper classes. Slotting these directly into the place of the Stripe classes is not going to work. The solution is to build an interface and your own adapter class that will allow the Braintree biller to work with your existing code with only a few modifications. 

```
interface BillerInterface {
	
	public function process();
}

interface CardInterface {
	
	public function setNum($number);
}
```

Keep in mind that not all programming languages have explicit interface constructs that are enforced by the compiler or interpreter. Some languages instead require you to either write your own interface enforcement or to simply pretend a hard interface exists and to use an implied one. Conveniently, PHP 5.3 provides it and will error out if you don't comply with your interface.

Now that we have interfaces for the Biller and Card class types, we can write our implementations.

```
class BraintreeAdapter implements BillerInterface {

	public function process() {
		
		
	}
}



```