---
layout: post
title: Hacking the Flow State
published: true
tags: Productivity, Projects
---

![Courtesy of Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Challenge_vs_skill.svg/300px-Challenge_vs_skill.svg.png)

The [flow state](https://en.wikipedia.org/wiki/Flow_(psychology)) is the condition of mind that occurs when we feel extremely focused on our work. While we are in flow, time swims by and we feel blissful engagement with whatever we are doing. We feel challenged, but not overwhelmed, and we get a continual sense of progress towards a larger goal. Crucially, it is a polar opposite of the more familiar state of "mind wandering" (for example, driving a car on a well travelled route). By contrast, flow requires full engagement.


Experiencing flow contributes greatly to productivity and work satisfaction.
Since the flow state is so positive, I wanted to reverse engineer its parts and build an app that would act as a flow trigger, so that I could encourage flow more or less at-will. To start, I read up on the requirements of flow.

Those who research flow identify these conditions that act as triggers:

* Clear goals (you know what you are working on)
* Focused attention (no multitasking, and minimal distractions)
* Immediate feedback (you know how well you are doing at every moment)
* Challenges match your skill level

Incorporating these insights, the app I built is called [Flowmeister](https://flowmeister.herokuapp.com). It's essentially a flow-optimized todo list. When you start working you enter a session which can only be exited by completing several timed tasks, which earn you the points you need to escape. A fairly simple concept, but one that was designed to meet all of the criteria for a flow experience.

![Flowmeister screenshot](/images/flowmeister/screenshot.png)

[I built it as a tool](/2018/04/29/if-you-can-program-you-can-invent-your-own-tools/) to improve my own productivity. It is dog food that I have merrily chowed down on for a few months now and have noticed significant positive results from its use. It does make work more engaging and flow-y, and my productivity (which I quantify using RescueTime) has been boosted. I figure this tool could be helpful to others as well. Give it a go. You don't need to create a user account to try it, and it's totally free for now. Also please [let me know what you think](mailto:hiccupingminor@gmail.com), any criticisms you have, and features you'd like to see. I intend to make significant improvements to it in the near future with my own insights and feedback from others as a guide.