### Motivation

People should be able to create their own weapons, to
* incorporate them into user-made [[Gamemodes]]
* have "skins"
   * modified looks for the weapons without any effect on the functionality of the weapon.

### The Background

Sauerbraten's weapons are hardcoded in C++.
People are free to use own "skins" for them:
they are able to change between different sets of weapon models easily (if they downloaded such a weapon set)

### The Plan

Basically a weapon is just an entity which happens to have an effect on other players.
You can trigger it.

A weapon could be only static data:
* what is the effect on the hit player?
* what is the effect on possibly other world elements?

and some static data for the visuals like:

* what particles to render when shooting? which sound to play?
* which model? which animations?

1. Define where to save "weapons" (and how new ones should get added?)
2. Define the weapon-rifle.toml entries
   * how should the weapon get assembled together?
3. Make the adjustments in the code to use the weapon's TOML file instead of hardcoded variables
4. Make adjustments in the code to let the visuals of the weapon can be configure-able, too

For everything regarding the functionality, one need to make sure that everyone on the server is playing with the same `weapons-rifle-functionality.toml`, but that is lower priority: If the [[Content System]] can be shared easily.. everyone gets the `weapons-rifle-functionality` from the server on round start.