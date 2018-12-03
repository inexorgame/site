---
layout:     post
title:      Pyrimethamine Edition
date:       2015-11-09 16:30 +0100
author:     Fohlen
summary:    We released Alpha 0.4 aka "Pyrimethamine" Edition
---

*So you've been wondering what has happened to Inexor in the past 2 months, since we didn't cause a sensation lately?*

Firstly, and most importantly, we officially released the __Pyrimethamine Edition__, which is our 4th Alpha release.

Notably, we've added support for prefabs, including an UI, and enhanced the console, so you're able to cycle back and forth now.
Furthermore the map *'Haze'* has been added alongside various cleanups and improvements in our media.

As usually you can obtain the release [from GitHub](https://github.com/inexorgame/inexor-core/releases/tag/0.4.0-alpha), where you can find a full changelog as well.

Please report any bug or strange behavior on IRC or GitHub.


#### What have we got next?
In honor of one and a half years of Inexor development, we are proud to present the very first Inexor 'Hackathon', in Stuttgart respectively.


The event is going to take place in a local hackerspace called 'Shackspace' on 12th and 13th of December. Specific details can be taken from [their website](http://shackspace.de/shackspace.de/index.php).


Since we are still in planning phase additional info resides in the [following pad](https://pad.inexor.org/p/Hackathon_2015), we will update the blog once things settled.


#### News from the build frontier
Unfortunately a proper build and testing pipeline is hard to build, but we're making great success lately

- Thanks to Obstriegel we now provision an own Jenkins
- Nooby lately shows great efforts to establish a Travis-CI based packaging for macOS, stay tuned!


Up next we'd like to cheer out that Inexor is officially participating in the [Let's Encrypt Closed Beta program](https://www.eff.org/de/deeplinks/2015/10/lets-encrypt-enters-private-beta), which means we will forcibly deliver __all__ our services via SSL.


### And where's the developer stuff?
Of course this shouldn't be missed out in my report.

Inexor is currently in a phase moving from base refactoring to new exciting features. So far we have

- Done a huge refactoring on the entire structure of Sauerbraten
- Replaced various custom implementations with their standard derivatives (i.e. custom vectors or RNG)
- Aligned Sauerbraten to Tesseract, which brings SDL2 and other new improvements
- Adjusted Sauerbraten's documentation with Doxygen, which brings automated documentation
- Removed almost all hardcoded variables with configurable ones
Summing it up, thus means we have a fairly good base to build upon a new standalone game, faster and easier.

Since this is only the theory, I'd like to outline a few interesting features that are currently being worked on

- [A Version Control System for maps](https://youtu.be/Paxwy4cShwc?list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6) by Boomerang
- [Refactored sound system](https://www.youtube.com/watch?v=U1fgyc1Ew4g&index=2&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6) suggested by Hanni
- [Flying cameras](https://www.youtube.com/watch?v=zqldiZ2Sht4&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6&index=26) by Hanni as well
- An [RPC interface](https://piratenpad.de/p/Inexor_tree_api) designed to flake CubeScript (by mapc)
- Chromium Embedded Framework which brings HTML5/CSS3 websites [as GUI's](https://www.youtube.com/watch?v=eFMS_bXPDr8&index=16&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6) into our game
- A [dynamic entity system](https://www.youtube.com/watch?v=V2EdetGrCCc&index=14&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6) by Hanack

Anyhow this is solely a small selection of features and ideas currently being worked on. *Stay tuned for news!*
