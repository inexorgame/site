---
layout: feature
status: specification
---

# Entity System

This article talks about the general concepts of the entity-system.

If you would like to see the exhaustive list of entities covered by the entity-system, have a look below:

- [Goals](./Goals.md)
- [Requirements](./Requirements.md)
- [Roadmap](./Roadmap.md)
- [Visual Scripting](./Visual-Scriptings.md)
- [Particles](./Particles.md)
- [REST-API](./REST-API.md)
- [Webservies](./Webservices.md)

### Entity System Type System (ESTS)

An entity system type system is a set of entity types and relationship types which defines a connected graph of types.

#### Type System Data Model

| Property | Data type | Description | Example |
| - | - | - | - |
| uuid | ```string``` | The UUID of the type system | |
| name | ```string``` | The name of the type system | *teleport-system* |
| dependencies | ```vector\<string\>``` | The type system depends on other type systems | ```[ 'uuid_other_type_system_1', 'uuid_other_type_system_2' ]``` |
| entity_types | ```vector\<EntityType\>``` | The list of entity types and their attributes | ```[{ name: 'TELEPORT', attributes: [] }, { name: 'TELEDEST', attributes: [] }]``` |
| relationship_types | ```vector\<RelationshipType\>``` | The list of relationship types and their attributes | ```[{ name: 'TELEPORTS_TO', start_node_type: 'TELEPORT', end_node_type: 'TELEDEST', attributes: [] }]``` |

#### List of Entity Type Systems

This table demonstrates the dependencies of the type systems.

| Type System Name | Depends on | Description | Entity Types (excerpt) | Relationship Types (excerpt) |
| - | - | - | - | - |
| Player | - | The mechanics of a player | PLAYER | - |
| Team | Player | A team | TEAM | IS_MEMBER_OF |
| Octree | - | The data structure of the world geometry | OCTREE | - |
| Texture | - | The textures and a set of texture transformations | TEXTURE, TEXTURE_BLEND | - |
| World | Octree, Texture | The textured world geometry | WORLD | HAS_OCTREE_ROOT |
| CameraBase | - | Basic camera without any dynamics | FIXED_POSITION_CAMERA | - |
| FirstPersonCamera | Player, CameraBase | The camera looks in first person perspective of a player | FIRST_PERSON_CAMERA | - |
| ThirdPersonCamera | Player, CameraBase | The camera looks on the player from behind | THIRD_PERSON_CAMERA | CAMERA_FOLLOWS_PLAYER |
| PickupBase | Player | The basic pickup system | PICKUP | PICKED_UP |
| Health | PickupBase | The health system | PICKUP_HEALTH | - |
| RailBase | - | The basic rail system | RAIL_START, RAIL_END, RAIL_CHECKPOINT | - |
| RailCamera | RailBase, CameraBase | Moves a camera along a rail | RAIL_CAMERA | CAMERA_FOLLOWS_RAIL |
| Teleport System | Player | Teleports players to teledests | TELEPORT, TELEDEST | TELEPORTS_TO |
| FirstPersonShooter<br>&nbsp;&nbsp;GameModeBase | Player, FirstPersonCamera, ThirdPersonCamera, Ammo, ... | (has no own entities) | - |
| Capture<br>&nbsp;&nbsp;GameModeBase | FirstPersonShooter<br>&nbsp;&nbsp;GameModeBase, CaptureBase, Pistol, Shotgun, ... | (has no own entities) | - |
| CaptureTheFlag<br>&nbsp;&nbsp;GameModeBase | FirstPersonShooter<br>&nbsp;&nbsp;GameModeBase, Team | FLAG | FLAG_CAPTURED_BY |


### Entity System Instance System (ESIS)

An entity system instance system is a predefined set of entity instances and connectors which are glued together and provides a sub system.

An instance system can be used multiple times within a map or gamemode. For example you can place multiple teleporter-teleportsto-teledest combinations with collision detection with a player and position update of the player. Each created entity instance and relationship instance will get a randomly generated UUID.

| Property | Data type | Description | Example |
| - | - | - | - |
| uuid | ```string``` | The UUID of the entity system instance system | |
| name | ```string``` | The name of the entity system instance system | teleporter-with-three-teledests |
| depends_on_type_systems | ```vector\<uuid_type_system\>``` | The instance system depends on one or multiple type systems | teleport-system | ```[ 'uuid-teleport-system' ]``` |
| entity-instances | ```vector\<EntityInstance\>``` | The entity instances | ```[ { a teleporter }, {first teledest}, {second teledest}, {third teledest} ]``` |
| relation-instances | ```vector\<RelationInstance\>``` | The relation instances | ```[ { teleporter teleportsto first teledest }, {teleporter teleportsto second teledest}, {teleporter teleportsto third teledest} ]``` |
| connectors | ```vector\<Connector\>``` | The visual scripting automation | ```[ collision, activation, ... ]``` |

# Execution, i.e. the graph over time


The proposed system makes no difference between entities /relations defining logic and entities/relations defining state.

Entity Type
RANDOM_BOOL
- Attributes
    - value
        - DataType: bool
        - Features:
            - OUTPUT

Entity Type
AND
- Attributes
    - input1
        - DataType: bool
        - Features:
            - INPUT
    - input2
        - DataType: bool
        - Features:
            - INPUT
    - result
        - DataType: bool
        - Features:
            - OUTPUT

Entity Type
LIGHT
- Attributes
    - rgb
        - DataType: vec3
        - Features:
            - INPUT
    - active
        - DataType: bool
        - Features:
            - INPUT

Enity Instance
RANDOM_BOOL_1
- value: false
RANDOM_BOOL_2
- value: false
AND_1
- input1: false
- input2: false
- result: false
LIGHT_1
- rgb: (255, 255, 255)
- active: false

CONNECTOR
RANDOM_BOOL_1::value ---> AND_1::input1
RANDOM_BOOL_2::value ---> AND_1::input2
AND_1::result ---> LIGHT_1::active


The execution of the graph is simply put:
1. Start from "system external spawners", like timers. input"
2. execute the logic in the entity
3. find the entities connected with the output
4. go on with the connected ones

---
1. Simulation steps must be kept -> throttle entry entities
2. Output entities must/can be buffered

---

builder is typeless
factories are wrappers around the builder to ensure type safety

Reqs for reactive framework
1. maintained sein / laaintained sein / laufenmm
*(ignoring any logic on the relations)*

In most sense, the entity-system proposal is a scripting language. The problm it tries to solve is safe execution. I.e. code which is safe to be executed despite distrust of the author.

---
Definition: Logic is the fundamental process to create state from state.

---

### Access to the graph

- Questions:
    - does each system walk the graph individually?
    - Or is the visitor (anti-)pattern used?
    - Are there dirty parts of the graph?
    - Some parts are cached seperately (or committed just in certain intervals)

#### Who is accessing?
- Rendering System
- Texture Generation System
- Gamerun System
    - Frontend for this will be the Visual Scripting System
    - These game logic entities are solely **optional** to the world!
        - all other systems work without this data
            - data can be part of an entity (input/output)
            - where is state stored here? nowhere?
                - state is transistive
                    - entered in an entry-point (e.g a textureload-entity) and transformed till this entity's input
                        - to retain the state, the path must be followed, then cached.
                        - relations are **not optional**
                - state can also be attached to an entity (e.g. config values)
- Editing System? Or is this Gamerun as well?
- Physics
- Exporter System
    - Synchro / Network
    - Persistence
    - Live Code Editing?

fastflow pipelines can do the state transistion

Q: how to combine pipelines with caching?


#### How to access?
A) each system walks the graph individually:

```
List EntityInstance TextureSlot textureSlots = EntitySystem::getEntitiesOfType("TEXTURE_SLOT");
bytearray[] data = textureSlot1.getByteArrayAttribute("diffuse_map_data");
```

Pro:
- each system only processes stuff it does not discard
Con:
- one needs to attach for each entity / each entity type, which systems are interested in it
Q:
- is this cache unfriendly? is memory(systems-logic + systems-internal-vars) memory(discarded data)?

B) via an event system (attribute of an entity instance has changed):

```
EntitySystem::watchChanges(textureSlot1, "diffuse_map_data");
```

Q: How do cascading changes get spawned?
Af

C) via a visitor
 we walkt the graph one time per time unit, systems interested in a particular node get called upon visit.
 Interest can be signaled via "tags".
 tags can have parents (i.e. texture-synchronized)?

 #### Scheduling

 fastflow pipeline chunks together with an event loop (like reactx cpp or boost asio): every x ms the dirty pipeline chunks get recommitted.
 Each pipeline can mean different systems creating different output values from different input.
 A system creating a new output invalidates the old output, i.e. making it dirty.
 The execution starts on entry points triggered by the event loop.

 Q: how to exploit locality here?

 #### Draft when

 **Processors** declare input/output entity types. the output is optional
 == they can be relations
 processor vs relation: relation is an instance of a processor for a specific input/output entity.

 Q: is a relation the interface for multiple processors?
 so all associated processors run?
 - one relation implies multiple logical operations - loose coupling between relation instance and applied operation
 Option A: make processors search for relations and operate all of them the same. multiple operations in different processors for the same entity produce the **same** output?
 - add `map relation, specific_thing_to_do` somewhere

 **Modules** have different processes, have different entity-components

 ###### Reactive Scheduling

 A scheduling based on reaktive frameworks:
 - specify pipelines (this data will be used by this afterwards) (via fastflow?)
 - specify distribution in time of these pipelines using rx

 rangev3 good for: you have data in layout x, make it so it is in layout y lazily.
                   (i.e. for dealing with stream input/outputs)

Concurrency ABC:
PCAM - Partition, Communication, Agglomeration, and Mapping
