---
layout:     post
title:      New services
date:       2015-08-17 23:45:00 +0200
author:     Fohlen
summary:    The new services are online.
---

It took me quite a while, but I'd like to announce the release of the new *Inexor* server, including the following services

* A redesigned website including some [new features](https://github.com/inexorgame/blog/releases/tag/0.2)
* [Community forum](https://community.inexor.org) (using NodeBB)
* Our own [Etherpad](https://pad.inexor.org)
* Server statistics via [Munin](http://monitor.inexor.org)
* Nightly builds (as they used to be).
* A [Notifico](http://notifico.inexor.org) instance to keep development up-to-date on IRC.

As soon as possible (on November 16) we will follow the *Let's Encrypt* movement and offer all our services exclusively via SSL.

### Upcoming Inexor development
As there hasn't been any apparent progress to the project I want to clean up the rumors about the current status of Inexor.
We are about to release the 2nd release, so called *Ritalin Edition*, which will bring CEF support (HTML5 & Node) more or less quickly.
There's still need to properly build binaries for Linux and to maintain an macOS build.
This is up to anyone who is able to help, and we'd like to encourage **you** to contribute at [GitHub](https://github.com/inexorgame/code).
Despite the build dependency issues we finally reached a point at which we have built a solid foundation for Inexor as a standalone fork.

### What's currently being worked on
We are working also on many new features directly for the players, a few examples are

* A HTML5 based new UI
* Completely customizable client (via JavaScript)
* [New sound system](https://github.com/inexorgame/inexor-core/issues/205)


Additionally I *(personally)* am working on a refactored master server, featuring global authentication with the following goals

* Creating a global authentication service
* Additionally offer protection
* Offer statistics using [Valve's server protocol](https://developer.valvesoftware.com/wiki/Server_queries).
* A league / statistics service similar to *Origin's* Sauerbraten tracker.

### Notes about the forum
Currently the forum is in a testing phase, which means that registration requires administrative approval.
Anyhow we'd like everyone to contribute to the forum. We just want to be sure everything work's properly.
On a side note: entries on the *Content* category will officially listed on our website, which is why they are moderated.

### Help is appreciated
We are looking for every helping hand! Don't be shy and drop us a comment on IRC, Pads, GitHub (...)
