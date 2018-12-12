# Overview

![](https://raw.githubusercontent.com/inexorgame/site/master/src/assets/logo_rendered/inexor_logo_600.png)

The goal of this project is to create a standalone fork of [Cube 2: Sauerbraten](http://sauerbraten.org/), establishing a bigger game audience and keeping the game alive for the future by enhancing and modernizing it.

## The Vision

There are opportunities only an open-source game can offer.  
There are paths only those can walk who do not fear theft of their work.  

We want to create a game which allows people to create the game.  
To have fun learning continuously more stuff as they dig deeper into making it their own.  
To develop the right mindset to attack challenging problems.  
To work and create cooperatively in a team rather than on your own.

Those who see it as enhancement when someone else starts working with their creation will find their place in this project.  
Inexor will always try to bring people together.

_See also:_
* [The Main Theme](./The-Main-Theme.md)
* [The Coding philosophy](https://github.com/inexorgame/inexor-core/wiki/Home/_edit#coding-philosophy)

## The Background

We did not start from scratch. We derived from the famous open-source game [Cube2: Sauerbraten](http://sauerbraten.org/), which itself is a great open source project.
It's unique gameplay, friendly and creative community, elaborated engine features, ingame map editor and much more gave us a great head-start. One advantage is that we always have something to play with, even in times we consider ourselves unfinished.  

We forked off from Sauerbraten as its development has met the end. We find the ideas of Sauerbraten worthy enough to be sustained in a new game. Everyone who really cared about the game knew that something had to follow it up.
The code-base has aged of course, but as we continue renewing it we will be able to implement a lot of modern ideas and unique solutions. Refactoring the code so it becomes easier to work with is one of our major tasks in this project.

## The Connection

The structure of Inexor can be displayed as follows:


_**Most widely effecting parts on the bottom, most visible parts at the top**_

<img src="https://raw.githubusercontent.com/inexorgame/visualisations/master/wiki/Inexor-structure.svg?sanitize=true" />

Those bottom systems determine the major direction, while the higher parts have to act in the frame of the lower choices.

Otherwise the upper parts are those which predominantly influence the finished game and which the normal player will remember.

We have the advantage that some systems do not necessarily need to be renewed for our plans to be fulfilled sufficiently.  
And we have the time to iteratively create systems, and the freedom to improve their maintainability and usability until they are considered to be done.

Generally speaking we want to create and renew stuff in ascending order, as those low-level changes have the most impact over the whole system.

---

Developing software always includes thinking about the level of abstraction you want to keep in each layer.  
So how do we define the cuts? How to cut the system into logical chunks?

In our [[Overall Architecture]] page we give a clear rule for the first selection:  
* Is it performance-critical or not?

If so it can remain in the [[Inexor Core]]\(C++\) side.  
Otherwise it should be moved to the [[Inexor Flex]]\(NodeJS\) part.  

Furthermore aiming for a flexible source code, we refactor and renew it by following our [[Coding Standards]].

However, we do not want to remain in the state of creating an engine, without providing the Sauerbraten people with something they can play.  
Hence it's an iterative process to get the fundamental back-end _ready enough_ and providing features at the front-end (e.g. showcasing that new back-end functionality).

_We want to keep a playable state._  

See also:

* [[Coding Standards]]
* [[Features]]


## Objectives

* Keep Sauerbraten's spirit alive
* Discuss community ideas, create creators
* Increase the old audience
* Make it 100% [open source software](https://creativecommons.org/about/program-areas/technology/technology-resources/software/) and free of restricting licenses

### How to get involved
* [[How to Contribute Code]]
* [[How to Contribute Content]]  
* [[Recruiting]]

### Development

* [[Build]]
* [[Directory Structure]]
* [[Contact]]
* [[Coding Standards]]
* [[Documentation]]
* [[How To Debug]]
* [FAQ](https://github.com/inexorgame/inexor-core/wiki/Frequently-Asked-Questions)
