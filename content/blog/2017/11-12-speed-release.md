---
layout:     post
title:      Inexor 0.9.0 "Speed Release" announcement
date:       2017-11-12 20:00 +0100
author:     a-teammate
summary:    The Inexor Speed release is finally here.
---

Hello there everyone, we have big news!
Inexor 0.9.0@alpha is finally released!

The careful reader might have noticed the weird way we changed the version string. Previously it has been "0.8.0-alpha", now it incremented to "0.9.0@alpha".
Well, this is the result of our most visible change:
**We are going rolling release!**


### Rolling-release?
You've heard it right. Starting with v0.9 release, every closed pull request (that can be every week, or day, depending on how much people contribute) will automatically be a new release and people will automatically download it the next time they start Inexor.

Users can choose to play with different versions of different channels in different instances of the game.
With some slight changes in your config, you could also add a different release provider. For example to update your favorite mod automatically when they get provided by a third-party-person.
Switching between versions is then instance dependent. You might want to test mods just briefly and you can do so by just changing the version and release channel.

We are currently providing releases in the `alpha` channel, that's why it's @alpha for every rolling release going forward and not -alpha anymore.


### Inexor Flex
`Inexor Flex` is [a script-able manager](https://github.com/inexorgame/inexor-core/wiki/Overall-Architecture) for `Inexor Core` (written in Node.js) that provides the following features

- install/remove/update game server and game client instances in different versions, from different providers, with different settings (profiles)
- manage content repositories and update them automatically
- manage [interfaces](https://github.com/inexorgame/inexor-core/wiki/User-Interfaces) and update them automatically
- use [TOML](https://github.com/toml-lang/toml) configuration files instead of `.cfg`s to configure your client
- edit the [Inexor Tree](https://github.com/inexorgame/inexor-core/wiki/Inexor-Tree) in real time


All of the above (and [many more things](https://github.com/inexorgame/inexor-core/blob/master/changelog.md)) can be done pretty easily either by
- using a feature-rich command line
- using the flex UI right from your browser!


### Inexor Core: C++ Dependency Manager
Software is nowadays organized in very tiny modules to ease reuse across different use cases.
This makes it possible to make features much faster by just using already written software.
In C++ the idea of sharing software across project boundaries is not nearly as evolved as in competing languages.
We had been searching for a long time for a **decent** dependency manager for C++.
Conan.io to the rescue! With though-through abstractions and design, this is de facto one of the most profitable technologies you can introduce to your C(++) projects!
It is pretty new, so we had to create packages for a lot of dependencies ourselves. The feature stack they provide still saved us a lot of time. And it will prove even more beneficial in the mid- and long-run.

---

This was only a very brief fragment of our [changelog](https://github.com/inexorgame/inexor-core/blob/0.9.0%40beta/changelog.md).
We haven't been releasing for more than a year.
We broke a lot of old designs and wired it back together, it was intense.


### The future of Inexor has arrived
The rather abstract technologies we have introduced are now ready enough to really manifest themselves in real use cases!

The groundbreaking decision to bundle the performant C++ part (Inexor Core) and the flexible Node.js part (Inexor Flex) only very loosely starts paying off now.
We expect to add new features rapidly using the new frameworks!
It's becoming easier than ever to update, configure and extend the game.


#### But I just want to play? Why do I need this all?
You don't necessarily. The v0.9 will also bring a [Windows installer](https://github.com/inexorgame/windows-installer/releases) and a [Snap package](https://github.com/inexorgame/snap-inexor-flex).
**However this is unstable software!**
We will inform you when we are focusing on making the product ship-able. Until then, expect breaking changes frequently.
