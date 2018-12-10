# Prefabs and Hierarchical Instancing
This page contains loose specifications on prefabs and hierarchical instancing; Herein you may find a summary of the purposed system and its practical purposes, criteria on what would be needed and thoughts on how it may be implemented. This is a draft and meant to initially pitch the idea.

## Summary
The purpose of implementing prefabs and hierarchical instancing is to ease the creation of maps by artists and to make it degrees of magnitude more efficient. So what are prefabs and hierarchical instancing? What follows are short descriptions:

* **Prefabs** are selections of world geometry (cubes) that are saved outside of the map, allowing these prefabs to be worked upon individually as well as imported into whichever map is desired, as many times as is desired.

* **Instancing** is a fancy way of describing importing and showing these prefabs in a map. Prefabs are instanced as models within a map, allowing the prefabbed geometry to be duplicated many times over while still retaining a source prefab which can be manipulated. Here lies the key feature and benefit to prefabs and hierarchical instancing, the ability to only have to change the original prefab and watch all instances of this change as it is saved.

* **Hierarchical instancing** is an even fancier way of describing instances of prefabs within prefabs. Essentially what this entails is that a prefab may be sub-divided hierarchically into several different structures and sub-structures.

To demonstrate the usage and effectiveness of hierarchical and the whole pipeline of working with prefabs and instaces of prefabs, please picture this:

1. Bob create a rudimentary prototype of a staircase with 10 steps and 2 railings in his new prototype map_a.
2. Once Bob is happy with his prototype he creates a prefab for this staircase.
3. Within this prefab Bob creates further prefabs:
- 1 prefab for individual steps in the staircase and instancing this 10 times total for each step.
- 1 prefab for the railing and instancing this 2 times total for each railing.
- Underlying geometry to hold up the staircase that is part of the root prefab and not split into further prefabs.
Bob now has what we can call a hierarchical prefab, with prefabs contained within his prefab.
4. Bob begins to create instances of this staircase to fill out prototype map_a.
5. Bob is now happy with his prototype of map_a and sendmap to his friends for testing of gameplay flow.
6. While Bob awaits feedback he begins prototype of map_b which will feature the same art style, again Bob makes instances of his trusty staircase prefab to fill out map_b.
7. Bobs' friends have now tested map_a and it's time for Bob to flesh out map_a with detail. Bob loads up his staircase prefab and begins to work on details.
8. Once Bob is happy with how his 1 step prefab looks he saves it. Now all instances of this staircase in both map_a and map_b are changed.
9. Happy with his new-found efficiency he finishes detailing on the 1 railing prefab as well as the underlying geometry in the root prefab. Saving these Bob now finds that both map_a and map_b have beautiful staircases. To think that all he had to do was change one prefab and the prefabs contained within it's hierarchical structure! Bob is real happy now.
10. But wait. Along comes Alice who works on gameplay mechanics. She informs Bob that the step height in the physics code for player movement has suddenly changed and that players in progress of testing his map can no longer walk up his beautiful stairs! The horror! But wait again, Bob has his trusty hierarchical prefab.
11. All Bob has to do is go into his step prefab contained within the hierarchical structure of his staircase prefab. Bob makes the change, saves the prefab and commits the one prefab to be available. Doing this with time to spare, Alice and all the testers rejoice in being able to continue testing all the things! All the while Bob in no time is back to doing what he does best; Making prefabs within prefabs within prefabs!

## Proposed Functionality
While there are many ways to accomplish prefabs and hierarchical instancing, one potentially useful way to tackle this is to have prefabs effectively be models within maps, while prefabs actually being world geomatry saved in their own .ogz containers/maps.

Below follows some brief thoughts on how prefabs and instancing may be accomplished and the functionality of different steps needed:
* Exporting and saving selection of world geometry into separate .ogz containers/maps (read prefabs).
* Importing, rendering and positioning geometry from a prefab as a model within a map.
* Convert an instance of prefab model geometry back into world geometry while still inside a map (toggle by command?).
* Allow editing of prefab model geometry as world geometry and saving back to the prefab when done (assisted by above feature).
* Unlinking an instance entirely from its prefab, creating standard world geometry out of all of the content in the prefab and its possible sub-prefabs.

Possibly useful resources:
* [Tesseract prefabs](https://github.com/inexorgame/tesseract/blob/1531ab89afe2dfc6a57f58c94f456dd8e6486516/src/engine/octaedit.cpp#L1121)