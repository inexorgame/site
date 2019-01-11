---
layout:     post
title:      State of Inexor 2018
date:       2019-01-09 17:00:00 +0200
author:     Fohlen
summary:    Current state of Inexor in 2018 and outlook to 2019.
---

Howdy folks! It has been mere two months since the last official news from our project, so I'll briefly cover what happened:

- we've had another amazing hackathon in Stuttgart
- decision has been made to restart the project
- the website got a major overhaul and the wiki and all of our internal structure changed

This is a long story short. If you wish to dig deeper into why, we shall begin with

## Hackathon

Misan offered his house for a very [nice hackathon](https://github.com/inexorgame/inexor-core/issues/608). It took place from 23rd to 25th of November in Stuttgart. We have made a lot of decisions during this time span which influenced the later parts that will be covered. Also it was a cozy, familliar event!

![Hackathon photo](https://user-images.githubusercontent.com/3730888/51029227-07b39c80-1596-11e9-8951-6b8f3fc72b6a.jpg "Hackathon 2018")

_From left to right: Hanni, Fohlen, westernheld, Hanack, Misan, a_teammate, Croydon_

Unfortunately sanitizer and nothing did not make it to the photo.

## Project re-start

It's been said a million times that Inexor is in an unbearable state. We are very well aware of this, and collectively decided that the way we currently handle things it becomes unmaintainable. This is both for the code but also for communication. There has been a bunch of decisions as a result from this conclusion:

- we voted collectively to move away from a centralized issue tracker to GitHub projects because it was a mess
- [we moved from Riot as our primary communication to Telegram](https://inexor.org/wiki/Get-Involved.html) (messages are still synced, you are not forced to switch, but all of our core contributors use it)
- we found a way to plan ahead the future of Inexor ("workstreams")

Most notably these changes in organization has already had some visible effects:

- we abandoned the old website and wiki with the new site where everything is (hopefully) structured and to be well-understood
- we decided to kill the old cube2 engine. Currently we are working on a [ground breaking new entity system](https://github.com/inexorgame/entity-system), which will then be supported by one of the amazing renderers out there such as [bs framework](https://www.bsframework.io/)
- we will want to simplify installation dramatically. This means that we will ship a single binary for flex and for core, and it shall come with a graphical installer for easy access (though no technical details have been fixed yet)

This new direction of clarity in the development has already produced an astonishing ~370 commits and over 20 closed issues let alone in the past month. We think we will not slow down any time soon, given that we now have more concrete goals to work on, as well as a fresh setup that everybody can easily work with.

If you would want to be involved with an exciting and fresh take on a game engine, [hop onboard](https://inexor.org/wiki/Get-Involved.html)!

### Hackathon 2019

We are already looking towards the [next Hackathon in February/March](https://github.com/inexorgame/meta/issues/1) in Freiburg!

I am thrilled to report the State of Inexor for 2018 and to look into the future of Inexor. I'll bet next year series of this post will look very different!

PS: If you've made it thus far you must really be interested in Inexor! You should [join our Telegram](https://t.me/inexor). We can use all of the feedback :8ball: 

