Branches | Issues | Main developers
--- | --- | --- 
[boomerang/version_control](/inexorgame/code/tree/boomerang/version_control) |  [#200](/inexorgame/code/issues/200) | [@basile-henry](/basile-henry)

A Version Control System (VCS) for Inexor's maps can help mappers with their map creation by adding some flexibility to the process, making collaboration easier and keeping a trace of the history not to lose any progress.

## What on earth is Version Control?
According to [Wikipedia](https://en.wikipedia.org/wiki/Version_control), version control "is the management of changes to documents, computer programs, large web sites, and other collections of information". In contrast with common VCS, Inexor's VCS deals with a map's [octree](https://en.wikipedia.org/wiki/Octree) (the static structure of a map in the [cube engine](https://en.wikipedia.org/wiki/Cube_2:_Sauerbraten#Real-time_editing)). This VCS keeps track of the changes happening throughout the development of a map by versioning it. It can also keep a copy of the map and its history on remote [repositories](https://en.wikipedia.org/wiki/Repository_(version_control)). Such a feature makes it possible to revert back to a previous state, merge two different versions of the history or even checkout the latest version of a map hosted remotely.

## Inexor's VCS
Inexor's VCS is a tool that strives to be simple. That is simple to use and also simple in its design. It is influenced in its design by [git](https://en.wikipedia.org/wiki/Git_(software)) a popular VCS, but doesn't implement nearly as many features and only works with Inexor's map system.

Inexor's cube              |  Octree structure
:-------------------------:|:-------------------------:
![Inexor's cube](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sauer_editing-1--.png/140px-Sauer_editing-1--.png) | ![Octree structure](https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Octree2.svg/400px-Octree2.svg.png)

The map's octree can be seen as a simple filesystem where a cube is a file:
- the map is the project's root directory and it contains 8 items
- each item is either:
  - a file
  - another directory containing 8 items
- each file (cube) has its own properties that define where its edges are placed, the textures of each one of the faces, its material (air, solid, lava, water) and so on...

It is relatively easy to version a filesystem, each version only needs to contains the differences (the deltas) that happened since the last version. Those deltas are the changes for each item. Keeping the filesystem analogy those deltas could be:
  - a file becoming a directory which contains 8 other items
  - a directory becoming a file
  - a file having its properties changed

It is more difficult to version changes within each file. A VCS like git uses a line of code as a unit of change, that is if a single character changes the whole line it is in is considered to have changed. For Inexor's VCS, the unit of change is a cube, if a single edge is moved, a texture modified or the material changed the whole cube is considered to have changed. This behavior greatly simplifies the design and the use of the tool.

## Features supported by Inexor's VCS
These are the features that are or will be supported by the VCS:

1. **Commit**

   Create a map or update a map to a new version in the VCS .
2. **Diff**

   A diff is the base of every VCS. It is a simple way to see the differences between two versions of the same map (or even different maps for that matter).
3. **Log**

   Show the history of the changes for a given map.
4. **Checkout**

   Load a specific version of a map. This could be an older version or even a new map coming from a remote repository.
5. **Merge**

   When the history of the changes of map diverges (multiple mappers working on the same map by themselves) this tool provides a way to merge them back together by applying the changes between the versions and providing an easy interface for the mappers to deal with merge conflicts (multiples edits of the same cubes).
6. **Branch**

   Split the history of a map on purpose to make it easier to work on several ideas at once. Then use the merging feature to merge back into the main branch the ideas that worked out and discard the ones that didn't.

## Basic usage of Inexor's VCS
_TODO_

## Implementation of Inexor's VCS
_TODO_