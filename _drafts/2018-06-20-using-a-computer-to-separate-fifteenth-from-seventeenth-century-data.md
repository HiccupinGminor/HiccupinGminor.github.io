---
layout: post
title: Teaching Computers Art History
subtitle: A Machine Learning Primer
published: true
tags: Neural Networks
---

<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>

Can you tell which century a painting was made by looking at it? In this post, I share my attempt to get a computer to become proficient at just this task. I was particularly interested in the area of art because it has long been considered to be a final frontier for computers. Sure, a computer can be made to understand chess, but only because the game's rigid logic translates well to computer code. We are far less convinced that computers can understand the abstract boundaries and softened edges of fine art. Judging in which century a painting was made, a task that seems fit for an art historian, seems out of the question for a computer. And yet, with modern methods it has become easily achievable.

This is a high-level primer that is designed to get you thinking about what machine learning does conceptually, and what its boundaries are. It's specifically for those who have no technical background, as there is no math or code involved in my explanations.

Let's begin by surveying the task before us. I've downloaded about 300 images of European paintings from the 15th and 17th century and labeled them. Here are some samples below:

## Some 15th Century Paintings

<div class="images-list grid" id="15th-century-gallery"></div>

## Some 17th Century Paintings

<div class="images-list grid" id="17th-century-gallery"></div>

What elements separates these two sets?

It's not clear cut, but after looking at lots of these painting, a few defining characteristics emerge:

-----

### 15th Century
* Light, brightly colored
* Lots of gold
* Religious theme
* Lots of Madonna and Child vignettes
* Less realistic imagery
* Medieval clothing

### 17th Century
* Dark
* Secular theme
* Realistic
* Frilly clothing
* Peasant images

-----

These are just general trends that I noticed in the data, you may have different impressions. Regardless of particulars, it's critical to be aware that we have just demonstrated the result of millions of years of evolution. Our highly-developed visual and cognitive systems are miraculously able to perform the sophisticated tasks of seeing objects, observing details, and then abstracting them into rules which we use to organize categories. In this case, separating 15th from 17th century.

We have big starting advantages when it comes to image comprehension. To humans, an image looks like:

![](/images/seventeenth-vs-fifteenth/17th-century-old-woman.jpeg)

But to computers, like:

``` plain
[ 94,  79,  74],
[ 92,  77,  72],
[ 89,  74,  69],
....
[ 40,  39,  44],
[ 40,  38,  39],
[ 41,  37,  36]
```

Each one of these sets of 3 numbers between brackets represents information from one pixel in the image. The question is how to go from thousands of single pixel inputs to the same sort of nuanced processing that we humans exhibit.

How can we teach a computer what Medieval clothing is or what a peasant looks like? How can we write a program that will be able to identify Madonna and Child imagery, or distinguish different painting styles like "realistic" and "impressionistic"? In short, how do we get the computer to recognize the same rules that we see so effortlessly when we see these pantings?

There are two roads before us: either top-down or bottom-up.

### Top-Down

This approach involves feeding the computer rules, and then working at translating those rules into something the computer can understand and detect. It's a top-down philosophy and has the convenience of being simple to conceptualize. We simply take the rules that we see and try to give them to the computer.
For example, we can take something we know about what most 17th century images have in common: they are dark. A good rule to separate 17th century paintings from 15th would then be:

*If an image is dark, it's a 17th century image*

Translated to something more along the lines of a computer instruction, we might take the average pixel darkness for the entire image and if it is greater than a certain value, say 50, then it's a 17th century image.

However, we quickly run into problems with 15th century images like this:

![](/images/seventeenth-vs-fifteenth/dark-15th-century.jpg)

This image shows us that our rule is insufficient as the dark clothing of the man in the front, and the overall earthy tint would likely get it incorrectly classified as being 17th century. Let's amend our rule by requiring 15th century images to be light *or* contain religious imagery (this painting shows a man in prayer). Leaving aside the major concern that we don't yet know how to write rules to analyze the "religiousness" of an image, we can say that our new rule is:

*If an image is dark and doesn't contain religious imagery, it's a 17th century image*

Checking through our catalog of images, we unfortunately stumble upon this 17th-century painting:

![](/images/seventeenth-vs-fifteenth/light-and-religious-17th-century.jpg)

It's fairly light-colored, and has religious content (note the wrestling cherubs at the top), yet it's from the 17th century. This violates our current rules.

Let's save ourselves some time. We could keep going down this track, applying rules and amending them to account for all of our paintings, but we'd see that rules that cover all cases are nearly impossible to write. Like a blanket that's too small for the bed when you pull it in one direction, the other side's occupant gets cold. Perhaps it's time to look at other solutions.

### Bottom-Up

Instead of the first method which requires translating our rules into something a computer can understand, the second approach is much simpler. It involves giving the computer the images we want to classify and the labels (whether the image is 15th or 17th century) and then having it deduce it's own set of rules. We give it the right answers, it just has to figure out *how* they are right.

The problem of taking pixels and turning them into predictions can be solved using a machine learning algorithm called neural networks. With a neural network approach, our source of inspiration is the human brain.

The brain is made up of neurons. Neurons are little cellular structures which, for our purposes, function as electrical gates. They receive electrical pulses from other neurons or from sense organs, process these input pulses in some way, and based on the results of the processing fire or don't fire an electrical pulse to the next neuron.

Despite their simplicity, multiple neurons arranged together have the allow for the potential of complex cognitive functions. For example, take this simple arrangement:

![](/images/seventeenth-vs-fifteenth/circle-network.png)

The left 4 neurons take a whole bunch of inputs from other neurons or sensory cells, process the inputs, and then fire or don't fire a signal up to the neuron on the right. Each of these neurons will fire when it detects that a certain portion of the image contains an arc. If all 4 of them fire, the object being perceived from the inputs is a circle.

The circle neuron's output can be channeled to higher-level neurons. Like this:

![](/images/seventeenth-vs-fifteenth/orange-network.png)

The circle neuron, when fired together with the orange color neuron, triggers the "It's an Orange" neuron.

Both the circle neuron and the orange color neuron are based on lots of sensory cells and lower-level neurons feeding their outputs up the chain to the next level of neurons' inputs.

// Explain how to go from pixels to a network


// Show a high level network for detecting an image

// Explain how a neurons output need not be binary

// Explain how the optimization function works

## The Results

The program we've built performs startlingly well. I was able to get a 90% classification accuracy. What's perhaps even more interesting, however, is how closely the predictions follow the kinds of guesses a human might make, ordered by the same rules that we picked out earlier.

Here are the least certain predictions:

![](/images/seventeenth-vs-fifteenth/least-certain.png)

What's remarkable about these is that these paintings look very ambiguous to humans as well. The first painting has a lot of gold for a 17th century image. The second image has some aspects of religious imagery (angels flying around), yet it's a 17th century image in realism, clothing, etc.

<script type="text/javascript" src="/js/seventeenth-vs-fifteenth.js"></script>
