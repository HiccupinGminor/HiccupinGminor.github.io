---
layout: post
title: Network Routing
published: true
tags: one-pager
---
Routers are fundamental to networked computing and are the backbone of the internet.

Routers help computers talk to each other. They can be specialized hardware, whose only purpose is routing. Or, it might come in the form of routing software installed on non-specialized hardware like a PC or a server to allow that machine to perform some routing duties. Routers serve an important role in networks where each of the nodes is ignorant to the overall network topography. Instead of each node maintaining a carefully map of how best to get a packet from point A to B, nodes can ignore this task and have routers do all of the work of transport.

* A router provides a single interface through which multiple different types of computers can communicate without needing to know about how to communicate directly with each other. Routers know how to speak in many different communication protocols.
* Routers can communicate across many different physical interfaces. Wifi routers often transmit packets over the air to a small local network. Other routers communicate via ethernet or fiber optic cable. Regardless of the medium of transport, connected computers interact with the router in the same way. 
* Routers forward packets to the next hop on their trip. Routers merely know how best to get a packet one step closer to its final address.
* Routers know a packet’s destination from its routing table.
* Routers know about its local network by communicating periodically with its neighbors.

### Routing Tables

A routing table will typically contain the following fields which are stored in the router’s memory:

| Subnet Mask | IP Address | Next Hop | Flags | Interface |

*Subnet Mask* - A sequence of bits that when combined with the IP address using a bitwise AND operation, separates network from the host machine of the IP address.

*IP Address* - A network address that identifies the location of a machine to any other device that would like to communicate with it. IP addresses contain a network address and a host address component.

*Next Hop* - The address of the next destination to send a packet. The router at the next hop destination will have separate rules to know what to do with the packet at that point.

*Flags* - Information about the network that the router can act on when deciding where to send a packet. For example, the flag “U” suggests that the next hop router is up and running.

*Interface* - Contains the physical path that will be used to send the packets to the next hop.

Routing tables can be populated dynamically during operation or can be static. Static routing tables are populated ahead of operation and are changed manually. Dynamic configurations allow for on-the-fly updates to routing tables based on network conditions. 


#### Dynamic Routing Tables

If the state of a network changes so too should the configuration table of all of those routers that interface with the network. Let’s say a certain path changes from requiring 3 hops to 5 hops (i.e. the path requires passing through 5 routers), that new path should be updated as being less preferable to a route that only requires 4 hops. Routers maintain relationships and extract network information from their neighbors to get a better sense of its local topology. Depending on how smart the router is, the router may make active changes to its tables based off of its network findings. 

#### Default Actions

As a router may be asked to send data to millions or billions of nodes within its lifetime it is often necessary to configure a default next action. In the case of the home wifi router, the default behavior for a packet will be to send it to the ISP which will then forward it to the proper place. The default behavior keeps routing tables short and thus quick to read.

#### Configurability

Routers have the ability to enforce certain arbitrary rules on the packets that it processes. It can restrict the packets that it forwards to those that come from a certain network or address or that meet other criteria. Many home routers come with GUI software that allows users to set these preferences easily.
