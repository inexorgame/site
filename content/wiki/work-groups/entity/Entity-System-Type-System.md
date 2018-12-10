## Type System

* Each entity is of a specific `entity type` (see below for common entity types)
  * Example: _Player Hanack_ is a _player_
* Each `entity` inherits and overwrites `attributes` of the `entity type`
  * Example: _Player Hanack_ is a _player_, therefore there is an attribute _frags_ because all _player_s have an attribute named _frags_
* An `entity type` can have a parent `entity type`
  * Example: `projectile`s are specialized `particle`s
  * See the type hierarchy below
* Each `entity type` has an `entity renderer`
  * Example: `Quad Damage Renderer` renders entities of type `quad damage`
  * Entity renderers are implemented in C++

## Entity Types

* players
* mapmodels
* positional trigger (often mode specific)
  * flag
  * base
  * teleporter
  * teleport destination
  * ...
* pickups (modifies player state or game state)
  * ammo
  * armor
  * health
  * health boost
  * quad damage
  * extra bomb
  * increase bomb damage
  * ...
* weapons
  * chainsaw
  * pistol
  * chaingun
  * rocket launcher
  * grenade launcher (= projectile emitter + geometry collision particle modifier)
  * rifle
  * bomb launcher
  * ...
* particles
  * visual effects
    * steam
    * fire
    * flare
    * explosion
      * volumetric expansion of explosions (also using the densitiy attributes)
  * projectiles
    * grenade
    * rocket
    * fog grenade
    * shot line
  * decals
* particle emitter
* particle modifier
