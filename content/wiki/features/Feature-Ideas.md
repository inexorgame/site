# Feature ideas

This should give you a big picture of what we want to build.

## Free content / Packaging / Content delivery
- All content is free, in order to make the game free (this makes the game itself forkable) **(WIP)**
- Content can be delivered by servers / repositories

## Easy modability and mod delivery
- Maps, Textures, Mapmodels download
- Packaging / Dependency Management for Content **(WIP)**
- Gamemode download (scriptable)
- Weapon download / Weapon settings (again, refer to Counter Strike)

## Deliver Inexor on Steam, Gog and maybe more platforms
- Bigger audience / more PR? This is debatable (see Warsow)
- Stronger community integration (eg: Quake Live's homepage)

## Community functions
- Global decentralized authentication + protection
  - Like jabber: multiple servers (multiple domains)
  - Global stats
  - Decentralized (multiple) master servers

## Improved mapping functions
* Flow chart system for scripted maps **(WIP)**
* Cooperative lightmapping

## Security
* Anti-DDoS
* Load balancing
* Security enhancements

Sauerbraten is more or less a very static game. In future, we should reduce the core functionalities to a minimum but make things extendable. There are lots of possibilities which would increase the fun dramatically.

## Dynamicification Possibilities

* [New dynamic entity system](./entities)
* [New dynamic particle system](./entities/Particle-System.md)
* Unlimited types of weapons
* Unlimited types of player models
* Dependency management/ingame downloader for content
* Unlimited, scriptable types of game modes
* New dynamic 2D effect system
  * [Destructible map geometry](https://www.youtube.com/watch?v=VPdKX7UhneY&index=2&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6)
* Location based effects
* Customizable HUD
* Movable objects (in multiplayer)

### Unlimited types of weapons

* API for the weapon game logic
  * reloading
  * shot
  * hud updates
  * bouncer control
* 3D Model Files
  * 1st Person
  * 3rd Person

### Unlimited types of player models

Currently there is a fixed number of player models. To make it more dynamic it would require to address player models by name instead of a number.

* Player-Model Configuration (Name, Description)
* 3D Model Files
* Preview

### Unlimited types of game modes

* The game logic must be loaded dynamically (for example a javascript)
* Game mode configuration
  * spawn/respawn states
    * team modifiers
    * specify allowed weapons, ammo, reload time, ...
    * specify health, armor, ...
  * specify engine/physics modifiers
* API for adding features to the HUD
  * New elements on the HUD
  * Minimap

### Destructible geometry

* Modify geometry
 * Shot based
 * Explosion based
* Modify lightmaps
* Synchronize geometry of all players
* Synchronize lightmaps


## Misc
* Replace single-player campaign mode by multi-player campaign mode (playable by a single player too)
* Replace bots by drones (flying robots, quadcopter, ...)
  * Don't need to fake human behaviour
* Gameplay adjustments
  * Weapon Balance

## Idea pool:
  * [Quadropolis - Sauerbraten Updates Wishlist](http://quadropolis.us/node/3086)
  * [Existing Mods/Forks/Projects](../Other-Projects.md)
  * [https://poop.piratenpad.de/sauer-changes](https://poop.piratenpad.de/sauer-changes)
  * [Sauerworld Forum - Ideas for Sauerbraten](http://sauerworld.org/forum/index.php?board=4.0)
  * [Roadmap / Ideas Ticket](https://github.com/inexorgame/inexor-core/issues/514)
