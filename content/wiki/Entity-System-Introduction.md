## Entities itself

* consists of named attributes
 * like position, velocity, states, ...
* attribute inheritance ?
* entity graph
 * parent/child relationships between entities (particle modifier instances --[n:m]--> particle emitter instances)
* event handling
 * publisher / subscriber pattern
 * triggers events

## Management of entity attributes

* which attributes have to be persisted
* which attributes have to be synchronized over network
* specification of the data type of an attribute value
* how to persist attributes (along with the map)
* how to synchronize attributes over network (using network messages)

## Entity emitter

* Emits entities
* Use case: pickup emitter for ammo:
 * spawns ammo pickup of a configurated type in a specific rate
 * bind the spawned pickup entity (add child)
 * as long as the child isn't picked up, don't spawn other pickups

## Entity modifier

* modify(entity)
* modifies attributes of an entity
* create events based on an entity
 * player entity near entity modifier
 * Flag stolen
 * Flag near player
 * Base captured
* entity movement
 * Move along segmented paths (bezier curve)
  * Path: Segments
  * Segment: Start, End, Speed
* Particle emitter configuration

## Entity Type renderer

* renders entity of a specific type
