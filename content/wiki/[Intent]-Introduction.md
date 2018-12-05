![error: image not found!](https://raw.githubusercontent.com/inexorgame/artwork/master/intent/Intent_rendered_512px.png)

# Motivation
As you should know Inexor forked off from [Cube2: Sauerbraten](http://sauerbraten.org/). If you take a closer look at Sauer's community you will notice that people have figured out many ways to bring the [Cube Engine](http://cubeengine.com/) to it's limits. Since there is no scripting interface for Cube2's multiplayer it is neccesary to modify the server software to create new gamemodes. By combining modded servers with the available standard gamemodes people created all interesting stuff. **You can't modify the client's software with scripts in Cube2's multiplayer!**

### Modified gamemodes in Cube2
The popular gamemode "racing" for example is build on top of coop edit mode. In race mode the server will send the next map to everyone before the round starts. Then racing starts and you have to find your way through the map in order to find the goal. Another example is the "rugby" mode which is build on capture the flag. Teammates can pass the flag by shooting each other. Also fun is the "zombie" mode which is build on Sauer's efficiency team mode. One player starts as zombie and has to infect others. Those who are infected change the effic team and hunt on.

### The limits of Cube2's modified gamemodes
It is not possible to change the client's behaviour in any way since this would require your players to download a modified version of Cube2. Although there have been many attempts to establish modified clients no one really was abled to push through. Since Inexor is not just a modification of Cube2: Sauerbraten but a new game it offers the perfect opportunity for the implementation of a both server- and client-sided visual scripting system.

### Why is there no scripting in multiplayer in Cube2 by default ?
It's not clear why this feature has not been striven for. Maybe it would have been too much work.

### What more do you want?
The greatest thing about introducing a new technology to Inexor is that you often can't forsee all the great things people will come up with when they use new features. In Cube2 we've seen people create remarkable gameplay by making the most of the technology that was available. But the creative mind of those people is far greater than the boundaries of technology which sets limits to them.

### What will be possible with this?
There is no limitation to what could be done with this. Everything we want to be possible will be possible.

# Inspiration
* [DOOM](https://doom.com/de-de/) has an integrated map editor called [Snapmap](https://www.youtube.com/watch?v=_BxlmaQtd7g) which has an integrated visual scripting enviroment.
* John Gebhardt gave an [interesing talk](https://www.youtube.com/watch?v=WjJdaDXN5Vs) about the use of visual scripting enviroments in the future.
* [Unity](https://unity3d.com/) has a visual scripting plugin called [Bolt](https://www.youtube.com/watch?v=4eZuZhcRxoU).
* [Unreal Engine 4](https://www.youtube.com/watch?v=EFXMW_UEDco) has a great visual scripting enviroment called [Blueprint](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/). In Unreal Engine 3 this was called [Kismet](https://docs.unrealengine.com/udk/Three/KismetHome.html).
* [Godot Engine](https://godotengine.org/) is an open source engine which supports visual scripting since version 3.
* [CRYENGINE](https://www.cryengine.com/) has a visual scripting tool called [Flowgraph](https://www.cryengine.com/features/sandbox-tools#features/flowgraph)
* [Glitchspace](https://www.youtube.com/watch?v=Jw3Uf7vOeVE) is a game which incorporates visual scripting as part of the game. You have to solve scripting problems to navigate through the game world.
* [ICanScript](http://www.icanscript.com/11-learn) is another plugin for Unity engine.

# Philosophy
TODO

# Proof of concept

[![error: image not found](https://img.youtube.com/vi/VC2eyxCNVfw/0.jpg)](https://www.youtube.com/watch?v=VC2eyxCNVfw)

# Demand analysis

[[ [Intent] Perspectives of script execution]]

## Use cases
TODO

# Objective
TODO

## Roadmap
TODO

# Implementation

Branches | Issues | Main developers
--- | --- | --- 
[hanni/3DVisualScripting](/inexorgame/code/tree/hanni/3DVisualScripting) |  [#99](/inexorgame/code/issues/99), [#111](/inexorgame/code/issues/111) | [@IAmNotHanni](/IAmNotHanni)

TODO
