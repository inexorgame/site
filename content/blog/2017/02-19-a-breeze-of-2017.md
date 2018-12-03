---
layout:     post
title:      A breeze of 2017
date:       2017-02-19 19:25:00 +0200
author:     Nooby
summary:    Some of our plans for 2017.
---

It has been [almost a year](https://inexor.org/blog/2016/03-19-doxylamine-alpha-edition) since we have updated this blog. This has been for various reasons, foremost it was not of priority to the team as we did concentrate on the game itself.
This post will start to explain a few changes we did implement last year and continues with some issues we are working on right now.


## What happened with Inexor?
We have kept modifying Inexor to be more modable and flexible, which in turn led to many changes and additions to the [overall architecture](https://github.com/inexorgame/inexor-core/wiki/Overall-Architecture) e.g.:

* Implemented [Inexor Flex](https://github.com/inexorgame/inexor-core/wiki/Inexor-Flex)
*  =>  our scripting side
*  =>  plugin system
*  =>  command line interface
* Created the [Inexor Tree](https://github.com/inexorgame/inexor-core/wiki/Inexor-Tree) API
*  =>  Automatic synchronization of nodes from Inexor Core to Inexor Flex and vice versa including:
*  ==>  Lists (SharedLists)
*  ==>  Classes as directories in the Tree (inheriting from a common base class)
*  ==>  Functions (SharedFunction)
*  ==>  and usual variables (SharedVar)
*  =>  on Flex side you `listen` to nodes
*  ==>  you get signaled if that node changed
* Porting our dependency management to [Conan](https://www.conan.io)
* [Fixed several bugs](https://github.com/inexorgame/inexor-core/pull/350) with the ingame HTML rendering


## Changes to our infrastructure
There have been several outtakes of our server which leaded to most of the services being outsourced, e.g. our Etherpads for which we use now mostly [hackmd.io](https://hackmd.io/CYFhFYCYCMGYEYC0A2e9yJAYwKYENE4AOWRPHCABiz2AE5hLIg==#).
Furthermore our website is now hosted at Uberspace.


## Communication
We switched our IRC channel from Gamesurge to Freenode. You can found us now at

* [__#Inexor__ on chat.freenode.net](https://webchat.freenode.net/?channels=#Inexor)

**or** on our new channel on Riot.im **(recommeded)**:

* [Riot.im #Inexor](https://riot.im/app/#/room/#Inexor:matrix.org)

Riot is a [Matrix](http://matrix.org/) client, so you can connect to #Inexor:matrix.org with every compatible Matrix client. Therefore there are now more possibilities to chat with us as before. Both rooms are getting synced so nobody is missing something. We are recommending Riot since it is eliminating the need for a bouncer and has more features than IRC like file uploads and voice chats.


## The team
[@koraa](https://github.com/koraa) decided to leave us to work on new projects. Thank you for being with us from the beginning and good luck!

However, we are also happily noticing that new people are getting constantly interested in our project and we are welcoming new voices with open hands.

If you like our overall ideas and vision for the game we would like to hear from you. No matter if you can code, create maps or other assets, write blog posts or just want to hunt bugs down. We can need you 😊


## How you can help
Things are getting really fast recently, but there are still a lot of things which need to be done. So, what you can do is:

* [help us test](https://github.com/inexorgame/inexor-core/wiki/Build)
* help us [fix and maintain](https://github.com/inexorgame/inexor-core/issues?q=cef+is%3Aopen) the CEF integration
* getting involved in an experimental [rewriting of the website](https://github.com/inexorgame/site)
* some other things, [check the issue ticker](https://github.com/inexorgame/inexor-core/issues?utf8=✓&q=is%3Aopen)
* [anything you would like to see in Inexor!](https://github.com/inexorgame/code#join-us)
* Check if you find wrong/outdated/questionable content and let us know
* Spread the word about Inexor!
*  =>  Write an article
*  =>  Link to us
*  =>  Tell your class mates, gamer friends and developer fellows
*  =>  Send a mail to mailing lists that care about FLOSS


## Hackathon 2017
We really loved our first [Hackathon](https://inexor.org/blog/2015/12-17-hackathon-2015-report) and it will not be the last.

Right now we are planning the **Inexor Hackathon 2017**. It will be likely at some time in Summer and in some southern area of Germany. As soon as we know more we will publish a standalone announcement. Thanks to Fohlen to push these plans forward!

Of course everyone will be welcomed at the Hackathon. No matter if you already contributed to Inexor or just like the project or just heard of us because of the Hackathon announcement. Last time we had a few new people just being curious who gave it a shot and we would love to see this repeating.

We don't bite, promised! —— Well, just in-game at least.
