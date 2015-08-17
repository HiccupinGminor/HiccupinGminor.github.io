The null object pattern can be a useful tool to remove existence checks from code.

Take a look at the following php classes:

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
	
With just the name of the animal that we want to hear, we can create dynamic instances. These classes allow us to write this simple implementation:

	$animal = AnimalFactory::create('Napoleon'); // Instance of Pig class returned
	$animal->speak(); // "Oink!"

We run into a bit of trouble however, when we want to hear from an animal whose class has not been defined.

	$animal2 = AnimalFactory::create('Moses'); // null
	$animal2->speak(); // PHP Fatal error:  Call to a member function speak() on null
	
There are a couple of solutions to this problem. Amending the animal factory class in the following way would be a slight improvement:
	
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

The result would be more helpful to the developer implementing the class:

	$animal2->speak(); // PHP Fatal error:  Uncaught exception 'Exception' with message 'Animal class not found'
	
Now the error message is less generic. Also, this approach outputs a stack trace so the problem can be tracked down more easily.  Although an improvement over the unmodified AnimalFactory class, the exception still results in a fatal error which halts the program's execution. In some cases this is undesirable.

To avoid stopping the script we can change our implementation by adding a check for the existance of the animal instance:

	$animal2 = AnimalFactory::create('Moses'); // NULL
	
	if($animal2) {
		echo $animal2->speak(); // Never gets called
	}

But what if we want to avoid adding this conditional to our code? Instead of asking if the animal instance exists can we simply expect the output of the factory class to say something even if no proper animal class has been established yet? In this situation the Null Object pattern can prove useful. A Null Object is designed to be substitable for instances of other objects but only outputs the default or base case behavior. 

It's essential that the Null Object has the same interface as the other classes:

	class NullAnimal {
		
		public function speak() {
			return "I am an animal";
		}
	}

To use it, we modify the AnimalFactory like so:

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
	
Now nothing will go wrong when we try and run the program with the unaccounted for name:

	$animal2->speak(); // "I am an animal"
	
Traditionally, Null Objects are so named because they returned a literal null value:

	class NullAnimal {
		
		public function speak() {
			return null;
		}
	}
	
	$animal2->speak(); // NULL
	
Whether or not that is necessary is up to you.

