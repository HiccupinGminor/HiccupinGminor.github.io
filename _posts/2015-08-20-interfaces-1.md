---
layout: post
title: The Value of Interfaces Part I
published: true
---
A fundamental principle of good programming which is known as *Polymorphism*. In a nutshell, polymorphism is when multiple implementations can be used interchangeably provided that each agrees with the same interface or contract.

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

Interfaces produce the same positive results in programming as they do in the world of electronics. By following an interface, your code will be easier to maintain and update in the future. When technologies change, new ones can be slotted into place using the same interface without any modification in other parts of your code. 

Additionally, interfaces help protect the programmer from creating tightly inter-dependent code. In the battery example, Derren's Devices and Bob's Batteries were completely inter-dependent as they each had to consult each other to make battery-related product decisions. If Derren's Devices built AA battery holders into their products, they would not need to know or care about the goings-on at any battery companies at all. Likewise, by using interfaces programmers can  produce units of code that are easy to care for, simple to update, and purposed toward a specific task.

I will write more about the value of interfaces in the coming weeks.