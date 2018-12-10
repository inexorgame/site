# Introduction
## Goal
The goal of this refactoring project is to review and rethink Inexor's game server code. The old Cube2 server code is very unclear and difficult to maintain because there is no general design patter behind it.

## Restructuring the code
In the new server code every function/structure/clas... which corresponds to a certain functionality it grouped together into one categoric .hpp and .cpp file.
These categories are:

* administration
* authentification
* bots
* configuration
* coopedit
* demos
* entities
* events
* extinfo
* gamemodes
* gameplay
* mapvote
* masterlist
* network
* statistics
* teams
* win32 stuff

so when you want to change something about the bots you know which file you should take a look at.
Also this speeds up compiling time because unmodified files aren't needed to be recompiled to new object files.