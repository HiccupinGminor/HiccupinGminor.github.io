The null object pattern can be a useful tool to remove existence checks from code.

Consider the following code:

class Subscription {
	
	public function __construct(BillingInterface $billing) {
	
	}
}