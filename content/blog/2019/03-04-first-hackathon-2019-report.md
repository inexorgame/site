---
layout:     post
title:      Hackathon 2019 I - Report
date:       2019-03-04 13:00:00 +0200
author:     Fohlen
summary:    Report of the first Hackathon of 2019
---

The 2019 I hackathon was a breeze, and we have many good news for you!

![CCCFR](https://raw.githubusercontent.com/inexorgame/blog-media/master/2019/03/Hackspace_CCCFR.jpeg "CCCFR")

Firstly we would like to thank the CCCFR for hosting us in their lovingly hackerspace. It's been yet one of the most homelike locations that we've been to.

Also thanks to tau for preparing his famous _Taulasch_ for us, it was very delicious :relaxed:

## What we did

We had lot's of fun cooking, prototyping, exploring Freiburg, and as well `@Fohlen` cut some cucumbers really well.

![Inexor people hacking](https://raw.githubusercontent.com/inexorgame/blog-media/master/2019/03/inexor_hacking_from_above.jpg "inexor people hacking")

On Saturday we held some quick talks about current state-of-the art Inexor which you can find in our [media repository](https://github.com/inexorgame/blog-media/tree/master/2019/03).

Let's dive right into what we accomplished this Hackathon:

### User stories

`@martinmuzatko` and `@koppiman` wrote a myrad of usefull user stories, sorted and prioritized them, so that it will be straightforward to implenent a _"minimum viable prototype"_ from this list. 

### User interfaces

`@martinmuzatko` wrote a nice user interface for the [entity-system]() which you can see below:

![Entity UI](https://raw.githubusercontent.com/inexorgame/blog-media/master/2019/03/entity_ui.png "Entity UI")

The current UI let's you create entities and relations with attributes, as well as connect those. In the future it will be possible to display the [entity-system](https://github.com/inexorgame/entity-system) as a graph in the UI.

### Entity-System, Visual Scripting and Rendering

`@aschaeffer`, `@a_teammate` and `@Fohlen` have made huge progress on the ground breaking `entity-system`. 

It is now possible to _reactively_ connect entities and processors, laying the foundation for the visual scripting. We collectively decided for [magnum](https://magnum.graphics/) as a rendering engine and even created a demoscene which interacts with the `entity-system`:

![Entity Rendering Demo](https://raw.githubusercontent.com/inexorgame/blog-media/master/2019/03/triangle_example.png "Entity Rendering Demo")

This demo does the following:

- create a `clock` processor 
- connect it to a `sinus` processor
- connect it to the `triangle` entity

Every time the change in the `clock` is made it is propagated down all the way until the triangle, and the renderer will do a transformation based on this value. 

It may seem like a small step, but this demoscene lays foundation for a huge change in how games will work in the future, or as `@aschaeffer` put it: _"What can't be done with the entity-system? I've thought about this for quite some time .... and to be honest, there's nothing I can come up with, that we can't make an entity"_

### Future to-do

We also discussed what can be done in the future and came up with an agenda until our next Hackathon:

- Implement the basic connectors and processors as defined in the [specification](https://inexor.org/wiki/features/Entity-System.html) including the basic `REST-API`
- Implement a first prototype of an octree-based world rendering
- Think about thread pooling and ideally implement a solution
- Think about synchronisation (multiplayer)
- Finish the work on the basic UI for the `entity-system`
- `@koppiman` will talk with Medienschule Salzburg about a potential model contest for the first Inexor demo

We would like to thank everyone who was involved, helped, discussed and had fun with us!

PS: The detailed report can be found on [HackMD](https://hackmd.io/gS25VTU3S2WcuOR1X8XBIA)
