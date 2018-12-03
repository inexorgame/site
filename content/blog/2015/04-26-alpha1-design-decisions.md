---
layout:     post
title:      Alpha 1 Design Decisions
date:       2015-04-26 14:00:00 +0200
author:     a-teammate
summary:    Answers to questions, which developers might ask.
---

#### **Or: Answers to Questions (Sauerbraten) Developers might ask**

This alpha release is mainly meant to showcase various developer specific changes (compared to Sauerbraten).

In this post I'll go into more detail about the reasons for some of these changes you might be wondering about.


## **New Build Structure**

### **CMake instead of Static Projects**

You may have noticed we dropped the "vcpp" and "xcode" folders in the source as well as the makefile. _Why?_

We use Git now, as it is developed to allow as much productivity for teams as possible (though on the downside, learning Git can be a huge task if you choose to do it in the command line).

So the build system has to work with various people working in parallel. This is pretty rough for a static build-structure (e.g. adding a file, a dependency, or whatever costs a lot of nerves merging it back again).  
That's one of the reasons CMake came into play:
It allows to generate all project files / make files or whatever on the fly.
Take for example: you add a new file to the codebase: You do not need to modify project files for all platforms, making development much more comfortable.
_(If you add a new file to one of the existing modules/folders it even gets automatically added to the projects)_

So what is the downside you ask?
Well.. Obviously CMake is needed as a dependency.
Furthermore, you need to generate your build chain after downloading before you can start developing (after doing it one or two times this won't bother you at all anymore, trust me).
Another point is that the compilation on some platforms could consume a bit more time compared to Sauerbraten's (ultra-optimized) static projects. CMake adds a bit overhead here.

We decided that the upsides outweigh the downside at this point.

## **New Media Structure**

As you may have noticed, we also changed the structure in which the [content](https://github.com/inexorgame/media-essential/) is organized.
We see that it could be more difficult to adopt content from Sauerbraten now.
And you may also have been disappointed to notice that a lot of content has even been dropped completely.

_Why did we do this?_

**We want to make Inexor (in comparison to Sauerbraten) completely free/libre.** Mostly of course because of our belief in free software, but if you want more concrete benefits:

-	The quality of contents will improve
-	(e.g. it was disallowed to rework some stuff before due to their [licensing](https://github.com/inexorgame/inexor-core/wiki/License-Policy))
-	We have more options to publish Inexor if its really free/libre
-	(necessary e.g. for providing it additionally on Steam or through the package managers of some Linux Distributions)
-	It lets people fork the game easily, without having to replace the artwork

Let's just say that Sauerbraten was really indulgent in its content policy, meaning a lot of stuff is licensed non-freely (e.g just for Sauerbraten) or even not licensed at all.
The downside of course is that we have way less content at the beginning and need to replace that stuff.

The **opportunities** which open through this fresh start are:

-	Better content
-	A lot of Sauerbraten's content is really aged
-	A new logical and clean content structure
-	Simplified content creation


Furthermore we want to provide in-game downloadable packages, so this system needs to be easily extendable.
That, btw, is where JSON comes in to play:

## **JSON**

In contrast to CubeScript, [JSON](https://github.com/inexorgame/inexor-core/wiki/JSON-Implementation) is used exclusively for saving data, not for executing stuff or scripting.
It's used all over the web, simply because it's easy as hell.
We want to slowly migrate all content, specifically stuff from .cfgs to .jsons.
Although we just started converting existing content to load with JSON, (which is not yet included in this alpha), the API for it is set and pretty easy to use.

## **Step back from CubeScript**

We want to provide powerful scripting and attract people with a dynamic way of mapping (e.g. pave the way for new [multiplayer] story modes or game mode scripting.. ).
Therefore we'll need a powerful scripting language behind the scenes.
Pretty few people speak CubeScript and we do not want to spend time improving it while there are other (better) solutions:

So the task was to find another scripting language which provides as much as we need.
We discussed this a lot and came to the conclusion to favor HTML5 ([for the UI](https://github.com/inexorgame/inexor-core/wiki/HTML5-User-Interface)) and JavaScript against competitors like Lua, Rust or Python.
Choosing the "right" language is always a hard task, as some developers have an almost religious state for such languages.

So event though Lua is pretty popular among the Sauerbraten developer community, in most others it's not nearly as popular as JavaScript.
We want to attract new developers, and getting them from a small community like Sauerbraten's shouldn't be our goal. Getting them from all over the internet should be.
However: In the next passage you will see that the doors are not completely closed for other scripting languages!

### **(IPC) JavaScript Implementation**

JavaScript is much more widely spoken than CubeScript, easier to write, and most of the time more intuitive (since CubeScript is a stack-oriented language).
We also chose it since we plan to provide some pretty powerful scripting (e.g. story modes or maps could act a lot more dynamically than they currently do)

So how did we implement this and how did it change the current behavior?
We decided to outsource it to another engine: [node.js](http://blog.modulus.io/absolute-beginners-guide-to-nodejs), and let it call CubeScript commands!
(*Later on not CubeScript but a specialized API will be used..*)
This is implemented through a system called "Inter Process Communication":

You may ask yourself, "inter process", does that mean I have to start two applications now to run Inexor?

Nah not really, you won't notice it in future stages, that's just an implementation detail.
The alternative would have been to go for a firmly integrated JavaScript engine (V8/SpiderMonkey) inside Inexor, though the IPC approach is much more powerful:

-	Node.js works asynchronously
-	no delay in your game if your script takes too long.
-	It can easily be extended for other languages (though we do not officially plan to do so yet, but maybe a mod or plugin?)

So you might want to sneak a peek at it if you're interested in developing with JavaScript.  
That's about it at the moment. There can be some more controversial points, but if further questions appear: You will always find us in [#Inexor on freenode.net](https://webchat.freenode.net/?channels=#Inexor)!
