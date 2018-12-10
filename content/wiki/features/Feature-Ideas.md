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

## Misc
* Replace single-player campaign mode by multi-player campaign mode (playable by a single player too)
* Replace bots by drones (flying robots, quadcopter, ...)
  * Don't need to fake human behaviour
* Gameplay adjustments
  * Weapon Balance

## Idea pool:
  * [Quadropolis - Sauerbraten Updates Wishlist](http://quadropolis.us/node/3086)
  * [Existing Mods/Forks/Projects](https://github.com/inexorgame/code/wiki/Other-Projects)
  * [https://poop.piratenpad.de/sauer-changes](https://poop.piratenpad.de/sauer-changes)
  * [Sauerworld Forum - Ideas for Sauerbraten](http://sauerworld.org/forum/index.php?board=4.0)
  * [Roadmap / Ideas Ticket](https://github.com/inexorgame/inexor-core/issues/514)


## Legacy list:

####  DONE

| Subsystem    | Topic                                                    | [Core](Inexor-Core) | [Flex](Inexor-Flex) | [UI](Inexor-UI) |
| ------------ | -------------------------------------------------------- | -------- | -------- | -------- |
|              |
| Synchronisation  | [Generic RPC Subsystem + Node.js integration](RPC-Node.js) | &#10003; | &#10003; |        |
|              | [[Inexor-Tree]] (Proposal: [[Inexor Tree API]])          | &#10003; | &#10003; | &#10003; |
| Overall      | [[Logging]]                                              | &#10003; | &#10003; |          |
| Build        | [[Build]]                                                | &#10003; |          |          |
|              |

####  IN PROGRESS

| Subsystem    | Topic                                                    | [Core](Inexor-Core) | [Flex](Inexor-Flex)  |[UI](Inexor-UI) |
| ------------ | -------------------------------------------------------- | -------- | -------- | -------- |
|              | 
| UI           | [[HTML5 User Interface]]                                 | &#10003; | &#10003; |          |
|              | [[Keyboard and mouse input handling]]                    | &#10003; | &#10003; | &#10003; |
|              | [[User interface Menu]]                                  |          | &#10003; |          |
| Entities     | New [[Entity System]]                                    | &#10003; | &#10003; |          |
|              | [[Particle System]]                                      | &#10003; | &#10003; |          |
|              | [[3D Visual Scripting]]                         | &#10003; | &#10003; |          |
|              | [Bezier curve camera flights](Bezier-curve)              | &#10003; |          |          |
| Rendering    | [[Shader System]]                                        | &#10003; | &#10003; |         |
| Server       | [Server refactoring](Refactoring-The-Server)             | &#10003; |          |          |
| Config       | [JSON configuration support](JSON-Implementation)        |          | &#10003; |          |
| Editing      | [[Version Control System]]                               | &#10003; |          |          |
| Audio        | [[New Sound system (refactoring)]]                       | &#10003; |          |          |
| Release      | [[Release and build strategy]]                           | &#10003; | &#10003; |          | 
| Overall      | [[Make anything more dynamic]]                           | &#10003; | &#10003; | &#10003; |
| Content      | [[Distributing Content System]]                          |          | &#10003; |          |
| World        | [[Extendable Map Format]]                                | &#10003; |          |          |
| Rendering    | [[Dynamic Lighting]]                                     | &#10003; |          |          |
| Editing      | [[Improved Selection]]                                   | &#10003; |          |          |
|              | [[Mappers Toolset]]                                      | &#10003; | &#10003; | &#10003; |
| Multiplayer  | [[Decentralized server list]]                            |          | &#10003; |          |
| Multiplayer  | [[Self regulating distributed network]]                  |          | &#10003; | &#10003; |
| Distribution | [[Packaging]]                                            |          |          |          |
