---
layout: feature
status: specification
---

# Entity System

## Goals

- [ ] We want to make the entity system available using a user interface. The user interface might be temporary only.
- [ ] We want to be able to create the entity type system (octree, textures, configurations, teleport system, ...).
- [ ] We want to be able to simulate the entity system (live preview of the data)
- [ ] We want to be able to start independently with
    - [ ] Rendering the world geometry (requires work on the entity type system: octree + textures + camera)
    - [ ] Rendering models (requires work on the entity type system: map models, player models)
    - [ ] Visual scripting system (requires work on the entity type system: see below)
    - [ ] Synchronization of the entity system (client to server)
    - [ ] The inexor configuration graph/tree (not neccessarily a tree)

## Roadmap

- [ ] Entity System Core
    - [x] Compile as library (Hanni, a_teammate)
    - [ ] Google Test / Unit Tests (Hanni, a_teammate)
    - [x] Folder Structure (Hanni, Hanack) [(#56)](https://github.com/inexorgame/entity-system/issues/56)
    - [ ] Multithreading (Hanni)
    - [ ] New data types for attributes: [(#55)](https://github.com/inexorgame/entity-system/issues/55)
        - [ ] byte array (textures, binary data)
        - [ ] vec2 (2x double, xy, uv)
        - [x] vec3 (3x double, xyz, rgb)
        - [x] vec4 (4x double, rgba)
    - [x] Extend attributes with a list of features (see below for features on attributes like INPUT or OUTPUT)[(#54)](https://github.com/inexorgame/entity-system/issues/54)
    - [ ] Data container abstraction
        - [x] Class DataContainer as interface for the accessors
        - [ ] Performance benchmarks
- [ ] Entity System REST-API (Hanack)
    - [x] Define the REST-API for the complete Entity System, see below
    - [x] [Create a OpenAPI 3.0 (Swagger) definition file for the REST-API](https://raw.githubusercontent.com/inexorgame/entity-system/master/src/entity-system-openapi.yaml)
    - [x] [Generate a HTTP/REST-Server-Stub from the OpenAPI definition file using openapi-generator](https://github.com/OpenAPITools/openapi-generator)
    - [ ] Implement the Server-Stubs by calling the corresponding Entity System method [Restbed Conan Package](restbed/6eb385fa9051203f28bf96cc1844bbb5a9a6481f@inexorgame/stable)
    - [ ] [Generate a .proto file from the OpenAPI definition file using openapi2proto](https://github.com/NYTimes/openapi2proto)
    - [ ] [Generate a GRPC-Server from the .proto file using protoc](https://github.com/grpc/grpc/blob/master/examples/cpp/cpptutorial.md)
- [ ] Entity System UI (Misan)
    - [ ] Toolbar
        - [ ] Clear Entity System (Clear)
        - [ ] Load Entity System from JSON (Clear+Load)
        - [ ] Load additional JSON (Load only)
        - [ ] Save Entity System as JSON
    - [ ] Tabs / ListViews
        - [ ] List Entity Types
        - [ ] List Entity Instances
        - [ ] List Relationship Types
        - [ ] List Relationship Instances
    - [ ] CRUD
        - [ ] CRUD Entity Types
        - [ ] CRUD Entity Instances
        - [ ] CRUD Relationship Types
        - [ ] CRUD Relationship Instances
    - [ ] Visualisation as Graph using sigma.js
        - [ ] Entity Types & Relationship Types ( a.k.a. Inexor Type System )
        - [ ] Entity Instances & Relationship Instances ( a.k.a. Inexor Game State )
        - [ ] both

## Requirements
The application domain for the Entity and Scripting System (ESS) is a multiplayer First Person Shooter and an ingame multiplayer world editor.


1. The ESS should allow easy management of entities and logic
    a. allowing to rearrange entities and spawning / removing entities
    b. allowing the addition of snippets for machine execution (compiled/interpreted scripts)
    c. allowing the recombination of those snippets
2. The execution must be real-time
    a. execution should work cache-friendly
    b. execution should make good use of available resources
3. A party executing (a copy of) the ESS should not have a harm outside of the game experience.
4. The ESS must be able to asynchronously synchronize itself between different copies of itself
    a. The ESS must be import- and exportable
        I. to a visual representation ingame
        II. to a visual representation in HTML
        III. to a persistent store (e.g. filesystem)
        IV. to a different machine
    b. The ESS must be reproducable


## JSON Data Structure

```json=
{
  "entity_types": [
    {
      "entity_type_uuid": "",
      "name": "",
      "attributes": [
        {
          "attribute_uuid": "",
          "name": "",
          "datatype": "",
          "value": ""
        }
      ]
    }
  ],
  "relationship_types": [
    {
      "relationship_type_uuid": "",
      "name": "",
      "start_node_entity_type_uuid": "",
      "end_node_entity_type_uuid": "",
      "attributes": [
        {
          "attribute_uuid": "",
          "name": "",
          "datatype": "",
          "value": ""
        }
      ]
    }
  ],
  "entity_instances": [
    {
      "entity_instance_uuid": "",
      "entity_type_uuid": "",
      "attributes": [
        {
          "attribute_uuid": "",
          "name": "",
          "datatype": "",
          "value": ""
        }
      ]
    }
  ],
  "relationship_instances": [
    {
      "relationship_instance_uuid": "",
      "relationship_type_uuid": "",
      "start_node_entity_instance_uuid": "",
      "end_node_entity_instance_uuid": "",
      "attributes": [
        {
          "attribute_uuid": "",
          "name": "",
          "datatype": "",
          "value": ""
        }
      ]
    }
  ],
}
```

## Modularity

This is the basic design for making parts of the entity system reusable. We are able to create a game mode by importing a single entity system instance system (ESIS) which itself depends on other entity system instance systems. Dependencies are resolved recursive. Also ESIS depends on one or multiple entity system type systems (ESTS). The ESTS may depend on other type systems, which are also resolved recursively.

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

## REST API

The REST API enables us to run the entity system and control the entity system from an external source like a web user interface or any web services.

### Entity System (Export / Import)

The whole entity system with all types and all instances.

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entitysystem | Exports the whole entity system | **Y** | N | N |
| POST   | /entitysystem | Imports the whole entity system | **Y** | N | N |
| DELETE | /entitysystem | Clears the whole entity system | **Y** | N | N |

### Entity Types

#### Multiple Entity Types

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/types | Lists all entity types | **Y** | N | N | N |
| POST   | /entities/types | Creates an entity type | **Y** | N | N | N |
| DELETE | /entities/types | Deletes all entity types (and all entity instances) | **Y** | N | N | N |

#### Single Entity Type

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/types/{uuid} | Returns the entity type with the given UUID | **Y** | N | N |
| POST   | /entities/types/{uuid} | Creates (or updates if already exists) the entity type with the given UUID | **Y** | N | N |
| DELETE | /entities/types/{uuid} | Deletes the entity type with the given UUID | **Y** | N | N |

#### Entity Type's Attributes

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/attributes | Returns all attributes of the entity type with the given UUID | **Y** | N | N |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Returns the value of the named attribute of the entity type with the given UUID | **Y** | N | N |
| POST   | /entities/types/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Creates (or updates if already exists) the value of the named attribute of the given entity type with the given UUID | **Y** | N | N |
| DELETE | /entities/types/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Deletes the named attribute of the entity type with the given UUID | **Y** | N | N |

#### Entity Type's Relationship Types

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/relationships | Returns all incoming and outgoing relationship types of the entity type with the given UUID | **Y** | N | N |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/relationships/incoming | Returns all incoming relationship types of the entity type with the given UUID | **Y** | N | N |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/relationships/outgoing | Returns all outgoing relationship types of the entity type with the given UUID | **Y** | N | N |

#### Entity Type's Instances

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/types/{uuid}<br>&nbsp;&nbsp;/instances | Returns all entity instances of the entity type with the given UUID | **Y** | N | N |
| DELETE | /entities/types/{uuid}<br>&nbsp;&nbsp;/instances | Deletes all entity instances of the entity type with the given UUID | **Y** | N | N |

### Relationship Types

#### Multiple Relationship Types

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /relationships/types | Returns all relationship types | **Y** | N | N |
| POST   | /relationships/types | Creates an relationship type | **Y** | N | N |
| DELETE | /relationships/types | Deletes all relationship types (and all relationship instances) | **Y** | N | N |

#### Single Relationship Type

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /relationships/types/{uuid} | Returns the relationship type with the given UUID | **Y** | N | N |
| POST   | /relationships/types/{uuid} | Creates (or updates if already exists) the relationship type with the given UUID | **Y** | N | N |
| DELETE | /relationships/types/{uuid} | Deletes the relationship type with the given UUID | **Y** | N | N |

### Entity Instances

#### Multiple Entity Instances

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/instances | Returns all entity instances | **Y** | N | N |
| POST   | /entities/instances | Creates an entity instance | **Y** | N | N |
| DELETE | /entities/instances | Deletes all entity instances | **Y** | N | N |

#### Single Entity Instance

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/instances/{uuid} | Returns the entity instance with the given UUID | **Y** | **Y** | **Y** |
| POST   | /entities/instances/{uuid} | Creates (or updates if already exists) the entity instance with the given UUID | **Y** | N | N |
| DELETE | /entities/instances/{uuid} | Deletes the entity instance with the given UUID | **Y** | N | N |

#### Entity Instance's Attributes

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/attributes | Returns all attributes of the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Returns the value of the named attribute of the entity instance with the given UUID | **Y** | N | N |
| POST   | /entities/instances/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Creates (or updates if already exists) the value of the named attribute of the entity instance with the given UUID | **Y** | N | N |
| DELETE | /entities/instances/{uuid}<br>&nbsp;&nbsp;/attributes/{name} | Deletes the named attribute of the entity instance with the given UUID | **Y** | N | N |

#### Entity Instance's Relationship Instances

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/relationships | Returns all incoming and outgoing relationship instances of the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/relationships/incoming | Returns all incoming relationship instances of the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid} /relationships/outgoing | Returns all outgoing relationship instances of the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/relationships/{uuid_rel_type} | Returns all incoming and outgoing relationship instances of the given relationship type and the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/relationships/{uuid_rel_type}<br>&nbsp;&nbsp;/incoming | Returns all incoming relationship instances of the given relationship type and the entity instance with the given UUID | **Y** | N | N |
| GET    | /entities/instances/{uuid}<br>&nbsp;&nbsp;/relationships/{uuid_rel_type}<br>&nbsp;&nbsp;/outgoing | Returns all outgoing relationship instances of the given relationship type and the entity instance with the given UUID | **Y** | N | N |

### Relationship Instances

#### Multiple Relationship Instances

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /relationships/instances | Returns all relationship instances | **Y** | N | N |
| POST   | /relationships/instances | Creates an relationship instance | **Y** | N | N |
| DELETE | /relationships/instances | Deletes all relationship instances | **Y** | N | N |

#### Single Relationship Instance

| **Method** | **URI** | **Description** | **Swag** | **CPP** | **ES** |
| - | - | - | - | - | - |
| GET    | /relationships/instances/{uuid} | Returns the relationship instance with the given UUID | **Y** | N | N |
| POST   | /relationships/instances/{uuid} | Creates (or updates if already exists) the relationship instance with the given UUID | **Y** | N | N |
| DELETE | /relationships/instances/{uuid} | Deletes the relationship instance with the given UUID | **Y** | N | N |
| GET    | /relationships/instances<br>&nbsp;&nbsp;/start/{uuid}/end/{uuid} | Returns all relationships between a start node and an end node | **Y** | N | N |
| DELETE | /relationships/instances<br>&nbsp;&nbsp;/start/{uuid}/end/{uuid} | Deletes all relationships between a start node and an end node | **Y** | N | N |

## Features on attributes

A new requirement for the entity system is to have features on attributes.

Every attribute in the entity system can have named features with a boolean value. The feature may exist or not and can only be true or false. Features should be defined on type-level (Entity-Type or Relationship-Type) and can be overwritten on instance-level (Entity-Instance or Relationship-Instance).

### Extended datastructure of entity system attributes

| Property Name | Datatype | Description |
| - | - | - |
| uuid | string | The UUID of the attribute |
| name | string | The name of the attribute |
| datatype | enum | The data type of the attribute |
| value | ? | The default value (entity type, relationship type) or the value (entity instance, relationship instance) |
| features | map\<string, bool\> | The features are stored as a map, where the feature-name is the key **(new)** |

### List of possible / planned features

| Feature Name | Description |
| --- | --- |
| INPUT | The attribute is an input and can be set by the visual scripting. |
| OUTPUT | The attribute is an output and can be used as source data by the visual scripting. |
| SYNC_SERVER | The attribute have to be synchronized to the game server. |
| SYNC_BROADCAST_CLIENTS | The attribute have to be synchronized to the other clients connected to the game server. |
| CONFIGURABLE | The attribute is a configuration option. This can be used to specify configuration options of an entity system instance system (ESIS) like a map (number_of_bases), gamemode (needed_scores_to_win), prefab (grid_size_scale), game server logic (max_players) or other systems. Goal is to make it possible to load an ESIS and then initialize the system from config file, database or other config sources.|


# Visual Scripting System

## General architecture

```
 +---------------+                     +---------------+
 |Entity Instance|                     |Entity Instance|
 +---------------+                     +---------------+
 | attribute     | (output)----(input) | attribute     |
 +---------------+                     +---------------+
   
```

> Keep it simple!

1. Connectors connects output-attributes and input-attributes (see next section)
    * Attributes not being an INPUT cannot be controlled by the visual scripting system. The reason of not being an INPUT can be:
        * performance
        * read-only
        * engine-controlled
    * ~~Each attribute can be **either** an output-attribute **or** an input-attribute, but **not both**~~
        * reason: recursion / loops
        * We have to ~~detect~~ **avoid loops** to make it possible!
2. Active components (calculating, executing, ...) are entities (not relationships)
    *  Active components are using one or multiple input-attributes in order to calculate or execute something and writes the result into zero, one or multiple output-attributes

## Visual Scripting - Connector

> Keep it simple!

* An output-attribute can be connected to multiple input-attributes
* An input-attribute can only receive one connection from a single output-attribute
* The output-attribute and the input-attribute MUST be of the same data type
* Only the attributes of instances (entity instances and relationship instances) can be connected!
* Automatic propagation of updates: If the value on an output-attribute has changed, the input-attribute will be updated as well

### Data model of connectors

Alternative 1: We store connectors as a separate data structure

| Property Name | Datatype | Description |
| - | - | - |
| uuid_output | string | The UUID of the output-attribute |
| uuid_input | string | The UUID of the input-attribute |

Alternative 2: We store the signals in the output attributes

| Property Name | Datatype | Description |
| - | - | - |
| uuid | string | The UUID of the attribute |
| name | string | The name of the attribute |
| datatype | enum | The data type of the attribute |
| value | ? | The default value (entity type, relationship type) or the value (entity instance, relationship instance) |
| features | map\<string, bool\> | The features are stored as a map, where the feature-name is the key **(new)** |
| connections | vector\<string\> | The connections are stored as a vector of UUIDs to the target input-attributes **(new)** |

### Implementation of connectors

* We set the value of the input-attribute if the value of the output-attribute has changed using signals:
    * https://schlangster.github.io/cpp.react/tutorials/BasicSignals.html
* Therefore the implementation of the propagation of attribute values is simple

### Management of connectors

* On creation of an entity instance we have to create signals for each connector (reactive programming)
* On adding an connector, we also have to create a signal and we have to synchronize the new connector
    * Bevor wir einen connector erzeugen dürfen, müssen wir erst überprüfen, ob der input-connector nicht schon andersweitig belegt ist
* On deletion of an entity instance we have to remove the incoming and outgoing signals before we remove the entity instance (also we have to remove the relationship instances connected to the entity instance)
* Load and save connectors (JSON)
* Extend REST-API for the connectors
    * get_outgoing_connectors(attribute_uuid)
    * get_outgoing_connectors(entity_instance_uuid, attribute_name)
    * has_input_connector(attribute_uuid)
    * get_input_connector(attribute_uuid)

## Active Components

* Keep it simple:
* Active components are entities not relationships
* Active components calculate something
    * It uses data from one or multiple input-attributes for calculation of the result
    * The result is stored one or multiple output-attribute(s)
* Reactive programming: The calculation/execution happens (and only happens) if one of the input-attributes has changed
* Active components can be placed anywhere in the 3D-world, which makes the scriping `visual`
* On creation of an entity-instance which is an active component we only have to wire the calculation function and the input-attributes together

# Type Systems

In this section you'll find a comprehensive list of entity types which can be used in the Inexor entity system and visual scripting system.

## Base Types

The entity system allows entity types to inherit from multiple other entity types. Therefore we provide some useful basic entity types for common use cases.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **NAMED**<br>*The entity instance has a name* | name | int | Y | Y |
| **POSITIONAL**<br>*The entity instance has a position* | position | vec3 | Y | Y |
| **MOVEABLE**<br>*The entity instance moves from the current position along the velocity vector* | velocity | vec3 | Y | Y |
| **ACTIVATABLE**<br>*The entity instance can be activated by setting the boolean value to 1* | on_activation | bool | Y | N |

## Constants

Constants cannot be modified and have only a single output-attribute. Useful for use in entity instance systems like maps (for example the name of a base) or gamemodes (for example the maximum number of players per team).

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **INT_CONSTANT**<br>*Contains an unmodifiable integer attribute* | value | int | N | Y |
| **FLOAT_CONSTANT**<br>*Contains an unmodifiable float attribute* | value | float | N | Y |
| **VEC2_CONSTANT**<br>*Contains an unmodifiable vec2 attribute* | value | vec2 | N | Y |
| **VEC3_CONSTANT**<br>*Contains an unmodifiable vec3 attribute* | value | vec3 | N | Y |
| **VEC4_CONSTANT**<br>*Contains an unmodifiable vec4 attribute* | value | vec4 | N | Y |
| **BOOL_CONSTANT**<br>*Contains an unmodifiable boolean attribute* | value | bool | N | Y |
| **STRING_CONSTANT**<br>*Contains an unmodifiable string attribute* | value | string | N | Y |
| **BYTEARRAY_CONSTANT**<br>*Contains an unmodifiable byte array attribute* | value | bytearray | N | Y |

> Note: It is possible to make the constants configurable by adding the attribute feature `CONFIGURABLE`


## Stores

Stores are data containers of a specific data type which can be set by an input but also have a default value.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **INT_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | int | Y | N |
| | default_value | int | N | N |
| | output_value | int | N | Y |
| **FLOAT_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | float | Y | N |
| | default_value | float | N | N |
| | output_value | float | N | Y |
| **VEC2_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | vec2 | Y | N |
| | default_value | vec2 | N | N |
| | output_value | vec2 | N | Y |
| **VEC3_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | vec3 | Y | N |
| | default_value | vec3 | N | N |
| | output_value | vec3 | N | Y |
| **VEC4_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | vec4 | Y | N |
| | default_value | vec4 | N | N |
| | output_value | vec4 | N | Y |
| **BOOL_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | bool | Y | N |
| | default_value | bool | N | N |
| | output_value | bool | N | Y |
| **STRING_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | string | Y | N |
| | default_value | string | N | N |
| | output_value | string | N | Y |
| **BYTEARRAY_STORE**<br>*If an incoming input is connected to input_value, the value is copied to output_value, else the default_value is copied* | input_value | bytearray | Y | N |
| | default_value | bytearray | N | N |
| | output_value | bytearray | N | Y |

## Converters

Since input-attributes and output-attributes needs to be of the **same data type**, we can and have to convert the data type using converters.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **INT_TO_FLOAT**<br>*Converts the integer to a float* | input | int | Y | N |
| | value | float | N | Y |
| **FLOAT_TO_INT**<br>*Converts the float to an integer* | input | float | Y | N |
| | value | int | N | Y |
| **BOOL_TO_INT**<br>*Converts true to integer 1 and false to integer 0* | input | bool | Y | N |
| | value | int | N | Y |
| **FLOAT_TO_VEC2**<br>*Converts two floats to a vec2* | input1 | float | Y | N |
| | input2 | float | Y | N |
| | value | vec2 | N | Y |
| **FLOAT_TO_VEC3**<br>*Converts three floats to a vec3* | input1 | float | Y | N |
| | input2 | float | Y | N |
| | input3 | float | Y | N |
| | value | vec3 | N | Y |
| **FLOAT_TO_VEC4**<br>*Converts four floats to a vec4* | input1 | float | Y | N |
| | input2 | float | Y | N |
| | input3 | float | Y | N |
| | input4 | float | Y | N |
| | value | vec4 | N | Y |
| **VEC2_TO_FLOAT**<br>*Converts the vec2 to two floats* | input1 | vec2 | Y | N |
| | value1 | float | N | Y |
| | value2 | float | N | Y |
| **VEC3_TO_FLOAT**<br>*Converts the vec3 to three floats* | input1 | vec3 | Y | N |
| | value1 | float | N | Y |
| | value2 | float | N | Y |
| | value3 | float | N | Y |
| **VEC4_TO_FLOAT**<br>*Converts the vec4 to four floats* | input1 | vec4 | Y | N |
| | value1 | float | N | Y |
| | value2 | float | N | Y |
| | value3 | float | N | Y |
| | value4 | float | N | Y |

## Branches

Actually, branches are not neccessary because output-attributes can have multiple output-signals. But branches can be a great way to visualize data flows in 3D and make it less confuse.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **BRANCH_INT**<br>*Copies the integer value to branch1 and branch2* | input | int | Y | N |
| | branch1 | int | N | Y |
| | branch2 | int | N | Y |
| **BRANCH_INT_3**<br>*Copies the integer value to branch1, branch2 and branch3* | input | int | Y | N |
| | branch1 | int | N | Y |
| | branch2 | int | N | Y |
| | branch3 | int | N | Y |
| **BRANCH_FLOAT**<br>*Copies the float value to branch1 and branch2* | input | float | Y | N |
| | branch1 | float | N | Y |
| | branch2 | float | N | Y |
| **BRANCH_FLOAT_3**<br>*Copies the float value to branch1, branch2 and branch3* | input | float | Y | N |
| | branch1 | float | N | Y |
| | branch2 | float | N | Y |
| | branch3 | float | N | Y |
| **BRANCH_VEC2**<br>*Copies the vec2 value to branch1 and branch2* | input | vec2 | Y | N |
| | branch1 | vec2 | N | Y |
| | branch2 | vec2 | N | Y |
| **BRANCH_VEC2_3**<br>*Copies the vec2 value to branch1, branch2 and branch3* | input | vec2 | Y | N |
| | branch1 | vec2 | N | Y |
| | branch2 | vec2 | N | Y |
| | branch3 | vec2 | N | Y |
| **BRANCH_VEC3**<br>*Copies the vec3 value to branch1 and branch2* | input | vec3 | Y | N |
| | branch1 | vec3 | N | Y |
| | branch2 | vec3 | N | Y |
| **BRANCH_VEC3_3**<br>*Copies the vec3 value to branch1, branch2 and branch3* | input | vec3 | Y | N |
| | branch1 | vec3 | N | Y |
| | branch2 | vec3 | N | Y |
| | branch3 | vec3 | N | Y |
| **BRANCH_VEC4**<br>*Copies the vec4 value to branch1 and branch2* | input | vec4 | Y | N |
| | branch1 | vec4 | N | Y |
| | branch2 | vec4 | N | Y |
| **BRANCH_VEC4_3**<br>*Copies the vec4 value to branch1, branch2 and branch3* | input | vec4 | Y | N |
| | branch1 | vec4 | N | Y |
| | branch2 | vec4 | N | Y |
| | branch3 | vec4 | N | Y |

## Debugging

Technical visualization of data, mostly as a box for debugging. The debugging boxes are only visible in the debugging overlay.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **DISPLAY_INT**<br>*Shows a box with the integer value in the center of the box* | value | int | Y | N |
| **DISPLAY_FLOAT**<br>*Shows a box with the float value in the center of the box* | value | float | Y | N |
| **DISPLAY_BOOL**<br>*Shows a box with the boolean value in the center of the box. The box is painted in green if the value is true or red if the value is false* | value | bool | Y | N |
| **DISPLAY_STRING**<br>*Shows a box with the string value in the center of the box* | value | string | Y | N |
| **DISPLAY_RGB_VEC3**<br>*Shows a box which is colored using the color attribute* | color | vec3 | Y | N |
| **DISPLAY_RGB_VEC4**<br>*Shows a box which is colored using the color attribute* | color | vec4 | Y | N |
| **DISPLAY_RGB_INT_3**<br>*Shows a box which is colored using the color attributes* | color_r | int | Y | N |
| | color_g | int | Y | N |
| | color_b | int | Y | N |
| **DISPLAY_RGB_BOOL**<br>*Shows a box which is colored using the color attributes if and only if the boolean value is true* | value | bool | Y | N |
| | color_r | int | Y | N |
| | color_g | int | Y | N |
| | color_b | int | Y | N |

## Arithmetric operations

| Active Component Name | Attribute Name | Data type | Input | Output |
| - | - | - | - | - |
| **ADD_INT**<br>*sum = augend + addend* | augend | int | Y | N |
| | addend | int | Y | N |
| | sum | int | N | Y |
| **ADD_INT_3**<br>*sum = augend + addend1 + addend2* | augend | int | Y | N |
| | addend1 | int | Y | N |
| | addend2 | int | Y | N |
| | sum | int | N | Y |
| **ADD_FLOAT**<br>*sum = augend + addend* | augend | float | Y | N |
| | addend | float | Y | N |
| | sum | float | N | Y |
| **ADD_FLOAT_3**<br>*sum = augend + addend1 + addend2* | augend | float | Y | N |
| | addend1 | float | Y | N |
| | addend2 | float | Y | N |
| | sum | float | N | Y |
| **SUB_INT**<br>*difference = minuend - subtrahend* | minuend | int | Y | N |
| | subtrahend | int | Y | N |
| | difference | int | N | Y |
| **SUB_FLOAT**<br>*difference = minuend - subtrahend* | minuend | float | Y | N |
| | subtrahend | float | Y | N |
| | difference | float | N | Y |
| **MUL_INT**<br>*product = multiplicand x multiplier* | multiplicand | int | Y | N |
| | multiplier | int | Y | N |
| | product | int | N | Y |
| **MUL_INT_3**<br>*product = multiplicand x multiplier1 x multiplier2* | multiplicand | int | Y | N |
| | multiplier1 | int | Y | N |
| | multiplier2 | int | Y | N |
| | product | int | N | Y |
| **MUL_FLOAT**<br>*product = multiplicand x multiplier* | multiplicand | float | Y | N |
| | multiplier | float | Y | N |
| | product | float | N | Y |
| **MUL_FLOAT_3**<br>*product = multiplicand x multiplier1 x multiplier2* | multiplicand | float | Y | N |
| | multiplier1 | float | Y | N |
| | multiplier2 | float | Y | N |
| | product | float | N | Y |
| **DIV_INT**<br>*quotient = dividend / divisor* | dividend | int | Y | N |
| | divisor | int | Y | N |
| | quotient | int | N | Y |
| **DIV_FLOAT**<br>*quotient = dividend / divisor* | dividend | float | Y | N |
| | divisor | float | Y | N |
| | quotient | float | N | Y |
| **EXP_INT**<br>*power = base ^ exponent* | base | int | Y | N |
| | exponent | int | Y | N |
| | power | int | N | Y |
| **EXP_FLOAT**<br>*power = base ^ exponent* | base | float | Y | N |
| | exponent | float | Y | N |
| | power | float | N | Y |
| **MODULO**<br>*remainder = dividend mod divisor* | dividend | int | Y | N |
| | divisor | int | Y | N |
| | remainder | int | N | Y |
| **ROOT_INT**<br>*root = root(degree, radicand)* | degree | int | Y | N |
| | radicand | int | Y | N |
| | root | float | N | Y |
| **ROOT_FLOAT**<br>*root = root(degree, radicand)* | degree | float | Y | N |
| | radicand | float | Y | N |
| | root | int | N | Y |
| **MIN_INT**<br>*result = min(input1, input2)* | input1 | int | Y | N |
| | input2 | int | Y | N |
| | result | int | N | Y |
| **MIN_FLOAT**<br>*result = min(input1, input2)* | input1 | float | Y | N |
| | input2 | float | Y | N |
| | result | float | N | Y |
| **MAX_INT**<br>*result = max(input1, input2)* | input1 | int | Y | N |
| | input2 | int | Y | N |
| | result | int | N | Y |
| **MAX_FLOAT**<br>*result = max(input1, input2)* | input1 | float | Y | N |
| | input2 | float | Y | N |
| | result | float | N | Y |

## Vector Arithmetric

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **VECTOR_ADD** | input_vector_1 | vec3 | Y | N |
| | input_vector_2 | vec3 | Y | N |
| | output_vector | vec3 | N | Y |
| **VECTOR_ADD_VEC4** | input_vector_1 | vec4 | Y | N |
| | input_vector_2 | vec4 | Y | N |
| | output_vector | vec4 | N | Y |
| **VECTOR_SUB** | input_vector_1 | vec3 | Y | N |
| | input_vector_2 | vec3 | Y | N |
| | output_vector | vec3 | N | Y |
| **VECTOR_SUB_VEC4** | input_vector_1 | vec4 | Y | N |
| | input_vector_2 | vec4 | Y | N |
| | output_vector | vec4 | N | Y |
| **VECTOR_MUL** | input_vector_1 | vec3 | Y | N |
| | input_vector_2 | vec3 | Y | N |
| | output_vector | vec3 | N | Y |
| **VECTOR_MUL_VEC4** | input_vector_1 | vec4 | Y | N |
| | input_vector_2 | vec4 | Y | N |
| | output_vector | vec4 | N | Y |

## Trigonometric functions

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SINE**<br>*result = sin(input)* | input | float | Y | N |
| | result | float | N | Y |
| **COSINE**<br>*result = cos(input)* | input | float | Y | N |
| | result | float | N | Y |
| **TANGENT**<br>*result = tan(input)* | input | float | Y | N |
| | result | float | N | Y |
| **COTTANGENT**<br>*result = cot(input)* | input | float | Y | N |
| | result | float | N | Y |
| **SECANT**<br>*result = sec(input)* | input | float | Y | N |
| | result | float | N | Y |
| **COSECANT**<br>*result = cosec(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCSINE**<br>*result = asin(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCCOSINE**<br>*result = acos(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCTANGENT**<br>*result = atan(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCCOTANGENT**<br>*result = acot(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCSECANT**<br>*result = asec(input)* | input | float | Y | N |
| | result | float | N | Y |
| **ARCCOSECANT**<br>*result = acosec(input)* | input | float | Y | N |
| | result | float | N | Y |

... Investigate further trigonometric functions ...

* Sinus hyperbolicus und Kosinus hyperbolicus
* Tangens hyperbolicus und Kotangens hyperbolicus
* Sekans hyperbolicus und Kosekans hyperbolicus 
* Areasinus hyperbolicus und Areakosinus hyperbolicus
* Areatangens hyperbolicus und Areakotangens hyperbolicus
* Areasekans hyperbolicus und Areakosekans hyperbolicus

## Logical operations

Logical operations results a boolean value.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **NOT**<br>*result = !input* | input | bool | Y | N |
| | result | bool | N | Y |
| **OR**<br>*result = input1 \|\| input2* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **OR_3**<br>*result = input1 \|\| input2 \|\| input3* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | input3 | bool | Y | N |
| | result | bool | N | Y |
| **AND**<br>*result = input1 \&\& input2* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **AND_3**<br>*result = input1 \&\& input2 \&\& input3* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | input3 | bool | Y | N |
| | result | bool | N | Y |
| **XOR**<br>*result = input1 ^ input2* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **XOR_3**<br>*result = input1 ^ input2 ^ input3* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | input3 | bool | Y | N |
| | result | bool | N | Y |
| **NOR**<br>*result = !(input1 \|\| input2)* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **NOR_3**<br>*result = !(input1 \|\| input2 \|\| input3)* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | input3 | bool | Y | N |
| | result | bool | N | Y |
| **NAND**<br>*result = !(input1 \&\& input2)* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **NAND_3**<br>*result = !(input1 \&\& input2 \&\& input3)* | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | input3 | bool | Y | N |
| | result | bool | N | Y |

## String operations

Operations to modify strings.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **STRING_SIZE** | input | string | Y | N |
| | result | int | N | Y |
| **TRIM** | input | string | Y | N |
| | result | string | N | Y |
| **LTRIM** | input | string | Y | N |
| | result | string | N | Y |
| **RTRIM** | input | string | Y | N |
| | result | string | N | Y |
| **LOWERCASE** | input | string | Y | N |
| | result | string | N | Y |
| **UPPERCASE** | input | string | Y | N |
| | result | string | N | Y |
| **CONCAT** | input1 | string | Y | N |
| | input2 | string | Y | N |
| | result | string | N | Y |
| **LEFT** | input | string | Y | N |
| | length | int | Y | N |
| | result | string | N | Y |
| **RIGHT** | input | string | Y | N |
| | length | int | Y | N |
| | result | string | N | Y |
| **SUBSTRING**<br>*see [std::string::substr](http://www.cplusplus.com/reference/string/string/substr/)* | input | string | Y | N |
| | start | int | Y | N |
| | length | int | Y | N |
| | result | string | N | Y |

... Further investigation ...

## Comparison

Comparison operations results in a boolean result.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **EQUALS_BOOL** | input1 | bool | Y | N |
| | input2 | bool | Y | N |
| | result | bool | N | Y |
| **EQUALS_INT** | input1 | int | Y | N |
| | input2 | int | Y | N |
| | result | bool | N | Y |
| **EQUALS_STRING** | string | int | Y | N |
| | string | int | Y | N |
| | result | bool | N | Y |
| **EQUALS_IGNORE_CASE_STRING** | string | int | Y | N |
| | string | int | Y | N |
| | result | bool | N | Y |
| **GREATER_THAN_INT** | input | int | Y | N |
| | min_value | int | Y | N |
| | result | bool | N | Y |
| **LOWER_THAN_INT** | input | int | Y | N |
| | max_value | int | Y | N |
| | result | bool | N | Y |
| **IN_RANGE_INT** | input | int | Y | N |
| | min_value | int | Y | N |
| | max_value | int | Y | N |
| | result | bool | N | Y |
| **GREATER_THAN_FLOAT** | input | float | Y | N |
| | min_value | float | Y | N |
| | result | bool | N | Y |
| **LOWER_THAN_FLOAT** | input | float | Y | N |
| | max_value | float | Y | N |
| | result | bool | N | Y |
| **IN_RANGE_FLOAT** | input | float | Y | N |
| | min_value | float | Y | N |
| | max_value | float | Y | N |
| | result | bool | N | Y |

## Set on activation

If input is true, result := value_active.
If input is false, result := value_inactive.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **ACTIVATOR_INT** | input | bool | Y | N |
| | value_active | int | Y | N |
| | value_inactive | int | Y | N |
| | result | int | N | Y |
| **ACTIVATOR_FLOAT** | input | bool | Y | N |
| | value_active | float | Y | N |
| | value_inactive | float | Y | N |
| | result | float | N | Y |
| **ACTIVATOR_VEC3** | input | bool | Y | N |
| | value_active | vec3 | Y | N |
| | value_inactive | vec3 | Y | N |
| | result | vec3 | N | Y |
| **ACTIVATOR_VEC4** | input | bool | Y | N |
| | value_active | vec4 | Y | N |
| | value_inactive | vec4 | Y | N |
| | result | vec4 | N | Y |
| **ACTIVATOR_STRING** | input | bool | Y | N |
| | value_active | string | Y | N |
| | value_inactive | string | Y | N |
| | result | string | N | Y |
| **ACTIVATOR_BYTEARRAY** | input | bool | Y | N |
| | value_active | bytearray | Y | N |
| | value_inactive | bytearray | Y | N |
| | result | bytearray | N | Y |

## Timer

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **DURATION_TIMER** | duration | int | Y | N |
| | is_active | int | N | Y |
| **RANGE_TIMER** | total_ms | int | Y | N |
| | active_from_ms | int | Y | N |
| | active_until_ms | int | Y | N |
| | is_active | int | N | Y |
| **CRON_TIMER** | cron | string | Y | N |
| | duration | int | Y | N |
| | is_active | int | N | Y |
| **TIMED_BUFFER**<br>(verzögert aus: an, wenn input an, aus nach wartezeit ab input aus) | input | bool | Y | N |
| | duration | int | Y | N |
| | is_active | int | N | Y |
| **TIMED_BUFFER**<br>(verzögert an: aus, wenn input aus, an nach wartezeit ab input an) | input | bool | Y | N |
| | duration | int | Y | N |
| | is_active | int | N | Y |

* https://github.com/Bosma/Scheduler


## Random number generators

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **RANDOM_INT_CONSTANT**<br>(executed only once) | min | int | Y | N |
| | max | int | Y | N |
| | value | int | N | Y |
| **RANDOM_FLOAT_CONSTANT**<br>(executed only once) | min | float | Y | N |
| | max | float | Y | N |
| | value | float | N | Y |
| **RANDOM_BOOL_CONSTANT**<br>(executed only once) | value | bool | N | Y |
| **NEXT_RANDOM_INT**<br>(wenn on_activation von falsch nach wahr wechselt, wird eine neue Zufallszahl berechnet) | on_activation | bool | N | Y |
| | min | int | Y | N |
| | max | int | Y | N |
| | value | int | N | Y |
| **NEXT_RANDOM_FLOAT**<br>(wenn on_activation von falsch nach wahr wechselt, wird eine neue Zufallszahl berechnet) | on_activation | bool | N | Y |
| | min | float | Y | N |
| | max | float | Y | N |
| | value | float | N | Y |
| **NEXT_RANDOM_BOOL**<br>(wenn on_activation von falsch nach wahr wechselt, wird eine neue Zufallszahl berechnet) | on_activation | bool | N | Y |
| | value | bool | N | Y |

## Logging

We can construct log messages using visual scripting and outputs the log message to log.

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **LOG** | message | string | Y | N |
|  | logger_name | string | Y | N |
|  | log_level | int | Y | N |
| **LOGGER** | logger_name | string | Y | Y |
|  | log_level | int | Y | Y |
|  | log_to_console | bool | Y | N |
|  | log_to_file | bool | Y | N |
|  | logfile | string | Y | N |

> TODO: ET: LOGGER_SINK, RT: LOGGER_WRITES_TO

*Stell dir vor, du befindest dich im Spiel und kannst das Loglevel eines Loggers per Schalter bestimmen*

## Communication

Möglichkeit von Kommunikation zwischen den Spielern, z.B. für custom game modes. Ist natürlich nicht soo performant, aber die Möglichkeiten sind sehr interessant!

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SEND_INT** | packet_name | string | Y | N |
| | value | int | Y | N |
| **SEND_FLOAT** | packet_name | string | Y | N |
| | value | float | Y | N |
| **SEND_VEC3** | packet_name | string | Y | N |
| | value | vec3 | Y | N |
| **SEND_VEC4** | packet_name | string | Y | N |
| | value | vec4 | Y | N |
| **SEND_BOOL** | packet_name | string | Y | N |
| | value | bool | Y | N |
| **SEND_STRING** | packet_name | string | Y | N |
| | value | string | Y | N |
| **RECEIVE_INT** | packet_name | string | Y | N |
| | value | int | N | Y |
| **RECEIVE_FLOAT** | packet_name | string | Y | N |
| | value | float | N | Y |
| **RECEIVE_VEC3** | packet_name | string | Y | N |
| | value | vec3 | N | Y |
| **RECEIVE_VEC4** | packet_name | string | Y | N |
| | value | vec4 | N | Y |
| **RECEIVE_BOOL** | packet_name | string | Y | N |
| | value | bool | N | Y |
| **RECEIVE_STRING** | packet_name | string | Y | N |
| | value | string | N | Y |

## Web Services

These entity types allows to create custom web services. This makes sense for game servers (for example: player statistics or an admin dashboard).

(Sauerbraten: EXTINFO, bloß für alles was man sich vorstellen kann)

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **REST_GET_INT** | url | string | Y | N |
| | value | int | N | Y |
| **REST_GET_FLOAT** | url | string | Y | N |
| | value | float | N | Y |
| **REST_GET_VEC3** | url | string | Y | N |
| | value | vec3 | N | Y |
| **REST_GET_VEC4** | url | string | Y | N |
| | value | vec4 | N | Y |
| **REST_GET_BOOL** | url | string | Y | N |
| | value | bool | N | Y |
| **REST_GET_STRING** | url | string | Y | N |
| | value | bool | N | Y |
| **REST_POST_INT** | url | string | Y | N |
| | value | int | Y | N |
| **REST_POST_FLOAT** | url | string | Y | N |
| | value | float | Y | N |
| **REST_POST_VEC3** | url | string | Y | N |
| | value | vec3 | Y | N |
| **REST_POST_VEC4** | url | string | Y | N |
| | value | vec4 | Y | N |
| **REST_POST_BOOL** | url | string | Y | N |
| | value | bool | Y | N |
| **REST_POST_STRING** | url | string | Y | N |
| | value | bool | Y | N |


## Dbus

| Active Component Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **DBUS_MESSAGE** | x | string | Y | N |


## Particle System

The entity system is dynamic and allows us to make an dynamic particle system. Even new particle types can be added at runtime.

### Particle Types and Particles

| Entity Type | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PARTICLE_TYPE** | name | string | Y | N |
| **PARTICLE** | uuid | string | N | N |
| | position | vec3 | Y | Y |
| | last_position | vec3 | Y | Y |
| | velocity | vec3 | Y | Y |
| | roll | float | Y | Y |
| | roll | float | Y | Y |
| | remaining_ms | float | Y | Y |
| | elapsed_ms | float | Y | Y |
| | last_elapsed_ms | float | Y | Y |
| | mass | float | Y | Y |
| | density | float | Y | Y |

### Particle Emitters

| Entity Type | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PARTICLE_EMITTER**<br>*(Base Entity Type)* | name | string | Y | N |
| | enabled | bool | Y | N |
| | position | vec3 | Y | N |
| | rate | float | Y | N |
| | batch_size | int | Y | N |
| | mass | float | Y | N |
| | density | float | Y | N |
| **PARTICLE_EMITTER_POINT** | ... | string | Y | N |
| **PARTICLE_EMITTER_LINE** | ... | string | Y | N |
| **PARTICLE_EMITTER_PLANE** | ... | string | Y | N |
| **PARTICLE_EMITTER_BOX** | ... | string | Y | N |
| **PARTICLE_EMITTER_CIRCLE** | ... | string | Y | N |
| **PARTICLE_EMITTER_SPHERE** | ... | string | Y | N |
| **PARTICLE_EMITTER_RASTER_FIELD** | ... | string | Y | N |
| | rows | int | Y | N |
| | columns | int | Y | N |
| | height | int | Y | N |
| **PARTICLE_EMITTER_RAIL** | ... | string | Y | N |
| | REL_TO_RAIL
| **PARTICLE_EMITTER_FORMULA**<br>*(using visual scripting it is even posible to create a dynamic formula!!!)* | ... | string | Y | N |
| | formula | string | Y | N |


### Particle Modifiers

| Entity Type | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PARTICLE_MODIFIER**<br>*(Base Entity Type)* | ... | ... | ? | ? |
| **VELOCITY_TRANSFORMATION** | ... | ... | ? | ? |
| **VECTOR_FIELD** | ... | ... | ? | ? |
| **ROLLING** | ... | ... | ? | ? |
| **RANDOM_VELOCITY** | ... | ... | ? | ? |
| **MASS_SPRING_TRANSFORMATION** | ... | ... | ? | ? |
| **VELOCITY_DAMPER** | ... | ... | ? | ? |
| **WIND** | ... | ... | ? | ? |
| **GLOBAL_GRAVITY** | ... | ... | ? | ? |
| **GRAVITY_POINT** | ... | ... | ? | ? |
| **PULSAR** | ... | ... | ? | ? |
| **BLACK_HOLE** | ... | ... | ? | ? |
| **GEOMETRY_COLLISION** | ... | ... | ? | ? |
| **CULLING_BOUNDING_BOX** | ... | ... | ? | ? |
| **CULLING_GEOMETRY** | ... | ... | ? | ? |
| **DENSITY_FADE_OUT** | ... | ... | ? | ? |
| **PARTICLE_SUB_EMITTER_** | ... | ... | ? | ? |

### Particle Renderer

| Entity Type | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PARTICLE_RENDERER**<br>*(Base Entity Type)* | ... | ... | ? | ? |
| **PARTICLE_RENDERER_BILLBOARD** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_SMOKE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_FIRE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_LAVA** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_POISION** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_SNOW** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_FLARES** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_FIRE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_TRIANGLE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_QUAD** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_RING** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_TETRAHEDRON** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_CUBE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_TUBE** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_QUAD_TEXTURED** | ... | ... | ? | ? |
| **PARTICLE_RENDERER_META_BALLS** | ... | ... | ? | ? |

### Particle Relationships

| Relationship Type | Start Node Entity Type | End Node Entity Type |
| - | - | - |
| GET_RENDERED_BY | PARTICLE_TYPE | PARTICLE_RENDERER |
| GETS_MODIFIED_BY | PARTICLE | PARTICLE_MODIFIER |
| HAS_BEEN_CREATED_BY | PARTICLE | PARTICLE_EMITTER |
| EMITS_PARTICLES_OF_TYPE | PARTICLE_EMITTER | PARTICLE_TYPE |
| INITIALIZES_SPAWNED_PARTICLES_USING | PARTICLE_EMITTER | PARTICLE_INITIALIZERS |
| MODIFIED_PARTICLES_GETS_MODIFIED_BY | PARTICLE_EMITTER | PARTICLE_MODIFIERS |

| Relationship Type | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |



## Octree

Inexor's representation of the world geometry is based on an  octree.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **OCTREE_NODE**<br>*An octree node has exactly zero or eight children (see HAS_SUB_NODE)* | - | - | - | - |
| **OCTREE_SIDE** | - | - | - | - |
| **OCTREE_CORNER** | - | - | - | - |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **HAS_OCTREE_SUB_NODE_0** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_1** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_2** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_3** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_4** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_5** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_6** | OCTREE | OCTREE |
| **HAS_OCTREE_SUB_NODE_7** | OCTREE | OCTREE |
| **HAS_OCTREE_SIDE_0** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_SIDE_1** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_SIDE_2** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_SIDE_3** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_SIDE_4** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_SIDE_5** | OCTREE | OCTREE_SIDE |
| **HAS_OCTREE_CORNER_0** | OCTREE_SIDE | OCTREE_CORNER |
| **HAS_OCTREE_CORNER_1** | OCTREE_SIDE | OCTREE_CORNER |
| **HAS_OCTREE_CORNER_2** | OCTREE_SIDE | OCTREE_CORNER |
| **HAS_OCTREE_CORNER_3** | OCTREE_SIDE | OCTREE_CORNER |
| **USES_TEXTURE_SLOT** | OCTREE_SIDE | TEXTURE_SLOT |

> Note: Parts of the world geometry (i.e. a sub tree starting with an entity instance of *OCTREE_NODE*) can be re-used by linking it with multiple parents. This may save disk-space and/or bandwith for heavily repeated maps.

[cube2 implementiert den octree etwas anders](https://github.com/inexorgame/inexor-core/blob/master/inexor/engine/octree.hpp):

* edges: 13x
* faces: 4x
* texture: 6x


### Octree Selection

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SELECTION**<br>*A selection of octree nodes in coop edit mode* | name | string | N | N |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **SELECTS_OCTREE_NODE**<br>*The selection points on one or multiple octree nodes* | SELECTION | OCTREE_NODE|
| **SELECTS_OCTREE_SIDE**<br>*The selection points on an octree side* | SELECTION | OCTREE_SIDE|

> Note: it is possible to make octree selections permanent by saving the OCTREE_SELECTION and all SELECTS_NODE relations.

> Note: it is possible to share a octree selection by synchronize OCTREE_SELECTION and all SELECTS_NODE relations.

## Map

Usually a map is contained in a entity system instance system (ESIS) which is loaded from file. The entity type **MAP** stores the meta data of a map and also is an umbrella and connects all important mechanics. A **MAP** entity instance should be the only occurence in an ESIS.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **MAP**<br>*The map contains the world geometry, map models and everything else* | name | string | N | Y |
| | author | string | N | Y |
| | version | string | N | Y |
| | description | string | N | Y |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **HAS_WORLD_GEOMETRY** | MAP | OCTREE |
| **HAS_SKYBOX** | MAP | SKYBOX |

| Relationship Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **HAS_WORLD_GEOMETRY**<br>*The relative position where the octree is inserted*| position | vec3 | N | Y |
| | rotate_x_negative | bool | N | Y |
| | rotate_y_negative | bool | N | Y |
| | rotate_z_negative | bool | N | Y |
| | rotate_x_positive | bool | N | Y |
| | rotate_y_positive | bool | N | Y |
| | rotate_z_positive | bool | N | Y |
| | mirror_x | bool | N | Y |
| | mirror_y | bool | N | Y |
| | mirror_z | bool | N | Y |
| | is_active | bool | N | Y |

> Note: You can add multiple octrees in a map and they may be positioned relative to (0,0,0). The settings are only used by loading a map.


## Skybox

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SKYBOX**<br>*A [skybox](https://en.wikipedia.org/wiki/Skybox_(video_games)) is the background of a map to make it look bigger than it really is* | name | string | N | Y |
| | author | string | N | Y |
| | version | string | N | Y |
| | description | string | N | Y |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **HAS_SIDE_UP** | SKYBOX | TEXTURE_SLOT |
| **HAS_SIDE_DOWN** | SKYBOX | TEXTURE_SLOT |
| **HAS_SIDE_BACK** | SKYBOX | TEXTURE_SLOT |
| **HAS_SIDE_LEFT** | SKYBOX | TEXTURE_SLOT |
| **HAS_SIDE_FRONT** | SKYBOX | TEXTURE_SLOT |
| **HAS_SIDE_RIGHT** | SKYBOX | TEXTURE_SLOT |

## Shader

### Shader loading

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SHADER_IMPORTER**<br>*Loads a shader from file* | filename | string | Y | N |
| | shader | bytearray | N | Y |

### Shader representation

If the attribute *shader* changes, the engine will loads the shader into the graphics card.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SHADER**<br>*Representation of a shader on a gfx card* | name | string | Y | N |
| | shader | bytearray | Y | N |

## Texture

Definition of textures, loading textures from file, saving textures to file, transforming textures using filters and operations, connecting textures with a gfx card texture slot.

### Texture loading

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEXTURE_IMPORTER**<br>*Loads a texture from the specified location* | filename | string | Y | N |
| | texture | bytearray | N | Y |
| | texture_type | string | N | Y |
| | author | string | N | Y |
| | version | string | N | Y |
| **TEXTURE_RENDER_URI**<br>*Renders a website to the texture using CEF*| uri | string | Y | N |
| | texture | bytearray | N | Y |

### Texture represenation

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEXTURE_SLOT**<br>*Representation of a texture slot on a gfx card* | slot_id | int | Y | N |
| | diffuse_map | bytearray | Y | N |
| | normal_map | bytearray | Y | N |
| | height_map | bytearray | Y | N |
| | specular_map | bytearray | Y | N |
| | glow_map | bytearray | Y | N |

### Texture manipulation and saving

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEXTURE_EXPORTER**<br>*Exports a texture to file, for example generated textures*| texture | bytearray | Y | N |
| | filename | string | Y | N |
| | filetype | string | Y | N |
| **TEXTURE_COLORIZE** | input_texture | bytearray | Y | N |
| | color | vec4 | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_BRIGHTNESS** | input_texture | bytearray | Y | N |
| | brightness | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_HUE** | input_texture | bytearray | Y | N |
| | hue | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_SATURATION** | input_texture | bytearray | Y | N |
| | saturation | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_SCALE** | input_texture | bytearray | Y | N |
| | scale_x | float | Y | N |
| | scale_y | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_BLEND** | input_texture_1 | bytearray | Y | N |
| | input_texture_2 | bytearray | Y | N |
| | blend_texture_1 | float | Y | N |
| | blend_texture_2 | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_MASK** | input_texture | bytearray | Y | N |
| | mask_texture | bytearray | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_BLUR_ANISOTROPIC** | input_texture | bytearray | Y | N |
| | intensity | float | Y | N |
| | anisotropy | float | Y | N |
| | angle | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_SPLIT_CHANNEL** | input_texture | bytearray | Y | N |
| | red | bool | Y | N |
| | green | bool | Y | N |
| | blue | bool | Y | N |
| | alpha | bool | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_AMBIENT_OCCLUSION** | input_texture | bytearray | Y | N |
| | height_depth | float | Y | N |
| | surface_size | float | Y | N |
| | height_scale | float | Y | N |
| | radius | float | Y | N |
| | quality | int | Y | N |
| | output_texture | bytearray | N | Y |

... Investigate further ...

* https://support.allegorithmic.com/documentation/sddoc/files/172818670/172818672/1/1530026718726/Substance+Designer+Documentation+-+26-06-2018.pdf

### Noise generation

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEXTURE_SIMPLEX_NOISE** | width | int | Y | N |
| | height | int | Y | N |
| | noise_level | float | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_PERLIN_NOISE** | width | int | Y | N |
| | height | int | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_VALUE_NOISE** | width | int | Y | N |
| | height | int | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_WORLEY_NOISE** | width | int | Y | N |
| | height | int | Y | N |
| | output_texture | bytearray | N | Y |
| **TEXTURE_PAINTER** | width | int | Y | N |
| create a texture via an editor: a brush or a polygon painter) (i.e. import from points | height | int | Y | N |
| | output_texture | bytearray | N | Y |


## Color

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PALETTE** | name | string | Y | N |
| **COLOR**<br>*Extends VEC4_STORE*| name | string | Y | N |
| | color | vec4 | N | Y |
| **COLOR_ADD** | input_color_1 | vec4 | Y | N |
| | input_color_2 | vec4 | Y | N |
| | output_color | vec4 | N | Y |
| **COLOR_SUB** | input_color_1 | vec4 | Y | N |
| | input_color_2 | vec4 | Y | N |
| | output_color | vec4 | N | Y |

> TODO: Investigate further color operations.

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **PALETTE_CONTAINS_COLOR** | PALETTE | COLOR |

## Light

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **LIGHT** | name | string | Y | N |
| | position | vec4 | Y | Y |
| | color | vec4 | Y | Y |
| **DIFFUSE_LIGHT** | name | string | Y | N |
| | radius | float | Y | Y |
| | intensity | float | Y | Y |
| **SPOT_LIGHT** | name | string | Y | N |
| | distance | float | Y | Y |
| | intensity | float | Y | Y |

## Camera

A camera looks from a position to a specific direction. This can be in first person, means the player looks as the character he plays. Other perspectives are possible: in third person, a fixed position camera or along a rail.

To create a screenshot of the world, the camera has an output-attribute named texture. This can be saved to disk or used as source for texture generation.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **CAMERA**<br>*The base entity type for all types of cameras. A camera has at least a position and a direction* | name | string | Y | N |
| | position | vec3 | Y | Y |
| | direction<br>*(YPR = yaw, pitch, roll)* | vec3 | Y | Y |
| | fps | int | Y | N |
| | texture | bytearray | N | Y |
| **CAMERA_FIRST_PERSON**<br>*The camera's position is the eye-position of the player. The camera looks along the player's velocity vector.<br>Parent Type: CAMERA* | - | - | - | - |
| **CAMERA_THIRD_PERSON**<br>*The camera's position is behind the player's position. The camera looks at the player.<br>Parent Type: CAMERA* | - | - | - | - |
| **CAMERA_RAIL**<br>*The camera's position moves along the rail.<br>Parent Type: CAMERA* | - | - | - | - |
| **CAMERA_MINIMAP**<br>*The camera's position is on the top of the map and the camera looks orthogonally down (2D-View). <br>Parent Type: CAMERA* | - | - | - | - |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **CAMERA_MOVES_ALONG** | CAMERA | RAIL |
| **CAMERA_FOLLOWS_PLAYER** | CAMERA | PLAYER |

## Game Mode

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PLAYER_SPAWN** | name | string | Y | N |
| | position | vec3 | Y | Y |

## Player

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **PLAYER** | name | string | Y | N |

## Team

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEAM** | name | string | Y | Y |
| | color | vec4 | Y | Y |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **IS_MEMBER_OF** | PLAYER | TEAM |

## Rails

The rails system allows to create a predictable movement along a rail.

For example:

* camera flights
* particle movement along the rail (like wind streams)
* particle creation
* Movement of bots, NPCs, mapmodels or any other objects on a map

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **RAIL** | name | string | Y | N |
| **RAIL_POINT** | position | vec3 | Y | N |

### Rail relationships

The rail relationships define which rail point is connected to which other rail point.

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **RAIL_STARTS_AT** | RAIL | RAIL_POINT |
| **RAIL_ENDS_AT** | RAIL | RAIL_POINT |
| **RAIL_CURVE** | RAIL_POINT | RAIL_POINT |

| Relationship Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **RAIL_CURVE**<br>The curve between two rail points.| curve_type | string | Y | N |

### Rail curve types

The curve between two rail points can be specified. [A comprehensive list of curve types is available on wikipedia.](https://en.wikipedia.org/wiki/List_of_curves) We probably start with these curve types.

| Curve type | Degree | Description |
| - | - | - |
| [line](https://en.wikipedia.org/wiki/Line_(geometry)) | 1 | Straight line from point to point |
| [bezier2](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) | 2 | Bezier curve with one control point |
| [bezier3](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) | 3 | Bezier curve with two control points |

https://en.wikipedia.org/wiki/List_of_curves

## Geometric shapes

Geometric shapes are useful for

* geometry collision
* area definition
* rendering geometric objects
* rendering meshes
* rendering particles
* emitting particles
* generating textures based on 2D or 3D geometry
* 

... Futher investigation ...

https://en.wikipedia.org/wiki/Lists_of_shapes

### Mesh

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **MESH** | position | vec3 | Y | N |
| **MESH_POLYGON** | - | - | - | - |
| **MESH_POLYGON_VERTICE** | position | vec3 | Y | N |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **HAS_POLYGON** | MESH | MESH_POLYGON |
| **POLYGON_STARTS_AT** | MESH_POLYGON | MESH_POLYGON_VERTICE |
| **NEXT_MESH_POLYGON_VERTICE** | MESH_POLYGON_VERTICE | MESH_POLYGON_VERTICE |

Load mesh (MD3→Entity System)
Save mesh (Entity System → MD3)
Scale mesh

### Mapmodel

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **MAPMODEL** | position | vec3 | Y | N |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| HAS_MESH | MAPMODEL | MESH |
| HAS_TEXTURE | MAPMODEL | TEXTURE |

### Curves

... Futher investigation ...

https://en.wikipedia.org/wiki/List_of_curves

### Surfaces

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **GEOMETRIC_CUBE** | position | vec3 | Y | N |
| | size | vec3 | Y | Y |
| **GEOMETRIC_SPHERE** | position | vec3 | Y | N |
| | size | float | Y | Y |
| **GEOMETRIC_SURFACE_CONE** | position | vec3 | Y | N |
| | size | float | Y | Y |

... Futher investigation ...

https://en.wikipedia.org/wiki/Platonic_solid
https://en.wikipedia.org/wiki/List_of_surfaces

### Polygons

... Futher investigation ...

https://en.wikipedia.org/wiki/List_of_polygons,_polyhedra_and_polytopes#Honeycombs_2


## Collision

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **COLLIDES_CUBE** | cube_position | vec3 | Y | N |
| | player_position | vec3 | Y | N |
| | is_active | bool | N | Y |
| **COLLIDES_SPHERE** | position | vec3 | Y | N |
| | player_position | vec3 | Y | N |
| | is_active | bool | N | Y |
| **COLLIDES_OCTREE** | player_position | vec3 | Y | N |
| | is_active | bool | N | Y |

## Scripting

Scripting allows to call a script. The entity systems calls a method named `execute` with an object containing all input attributes as parameter. The method has to return an object with output attributes which gets overwritten.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SCRIPT** | language | string | Y | N |
| | script_name | string | Y | N |
| | ... more input attributes ... | any datatype | Y | N |
| | ... more output attributes ... | any datatype | N | Y |

## Text

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **TEXT** | text | string | Y | N |
| | font_size | float | Y | N |
| | position | vec3 | Y | N |
| | color | vec4 | Y | N |

## User Interface

This is the main integration of HTML user interfaces.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **USER_INTERFACE**<br>*The user interface is a website rendered in front of the world with a transparent background.* | name | string | Y | Y |
| | url | string | Y | Y |

> Note: a user interface has to be 

### Use Cases

* The main menu
* The HUD
* Console / Chat (separate console and chat?)
* User interface for coop edit

## Commands

Dynamic creation of commands. Default commands, game-mode-specific commands or even map-specific commands.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **COMMAND** | name | string | Y | N |
| | description | string | Y | N |
| | value | string | Y | N |
| **COMMAND_PARAMETER_INT** | name | string | Y | N |
| | description | string | Y | N |
| | value | int | Y | Y |
| **COMMAND_PARAMETER_FLOAT** | name | string | Y | N |
| | description | string | Y | N |
| | value | float | Y | Y |
| **COMMAND_PARAMETER_STRING** | name | string | Y | N |
| | description | string | Y | N |
| | value | string | Y | Y |
| **COMMAND_PARAMETER_BOOL** | name | string | Y | N |
| | description | string | Y | N |
| | value | bool | Y | Y |
| **COMMAND_RESULT** | name | string | Y | N |
| | value | string | Y | Y |

## Console Handlers

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **INPUT_HANDLER_STDIN** | value | string | N | Y |
| **OUTPUT_HANDLER_STDOUT** | value | string | N | Y |
| **OUTPUT_HANDLER_STDERR** | value | string | N | Y |


## Windows

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **WINDOW**<br>*A client can show one or multiple windows. A window renders zero, one or multiple cameras and zero, one or multiple user interfaces* | title | string | Y | Y |
| | position | vec2 | Y | Y |
| | dimensions | vec2 | Y | Y |
| | fullscreen | bool | Y | Y |
| | minimized | bool | Y | Y |
| | is_active | bool | Y | Y |

| Relationship Type Name | Start Node Entity Type | End Node Entity Type |
| - | - | - | - |
| **RENDERS_WORLD_USING**<br>*The window renders zero, one or multiple cameras* | WINDOW | CAMERA |
| **RENDERS_USER_INTERFACE**<br>*The window renders zero, one or multiple user interfaces* | WINDOW | USER_INTERFACE |

| Relationship Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **RENDERS_WORLD_USING** | position | vec2 | Y | Y |
| | dimensions | vec2 | Y | Y |
| | order | int | Y | Y |
| | is_active | bool | Y | Y |
| **RENDERS_USER_INTERFACE** | position | vec2 | Y | Y |
| | dimensions | vec2 | Y | Y |
| | order | int | Y | Y |
| | is_active | bool | Y | Y |

> Note: A window can render multiple cameras and multiple user interfaces at the same time.

### Use Cases

* Default: One window renders the world using the full screen space in first person perspective. Also a minimap is rendered in the top right corner in front of the main view.
* Second spot: Two windows at the same time, one renders the world in first person perspective of the player, the other renders the world from a fixed position camera.
* Multi-spectator: One window renders the world in first person perspective of four spectated players, each view uses 1/4 of the screen space.
* User-Interface only: A second window renders only a user interface, for example the user interface for coop edit.


## Input Handling

The idea is to make keyboard input available within the entity system.

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **KEY_DOWN** | keycode | int | Y | N |
| | is_active | bool | N | Y |
| **KEY_ALIAS** | aliasname | string | Y | N |
| | keycode | bool | N | Y |
| | is_active | bool | N | Y |
| **MOUSE_DOWN** | button | int | Y | N |
| | is_active | bool | N | Y |

PollEvent → switch(event.key.keysym.sym) → is_active

> TODO: Missing connection: Window → Input Handling

## Sound

| Entity Type Name | Attribute Name | Data type| Input | Output |
| - | - | - | - | - |
| **SOUND_IMPORTER** | filename | string | Y | N |
| | format | string | Y | N |
| | sound_data | bytearray | N | Y |
| **SOUND_PLAY** | sound_data | bytearray | Y | N |
| | is_active | boolean | Y | N |
| | volume | int | Y | N |

# Entity System Example (Teleport System)

**Example of a flexible and dynamic teleport system using the entity system and the visual scripting system**

This simple example shows how the teleport subsystem could be automized using visual scripting. A teleporter instance (TELEPORTER_1) has multiple targets (`TELEDEST_1`, `TELEDEST_2` and `TELEDEST_3`) which should be addressed alternately. Timers (TOGGLE_TIMER_1, TOGGLE_TIMER_2 and TOGGLE_TIMER_3) enables / disables the relationships (TELEPORTS_TO_1, TELEPORTS_TO_2, TELEPORTS_TO_3) using visual scripting.

## Entity Types

### TELEPORTER

| Name | Datatype | Type |
| - | - | - |
| position | vec3 | INPUT |

### TELEDEST

| Name | Datatype | Type |
| - | - | - |
| position | vec3 | INPUT |

### TOGGLE_TIMER

| Name | Datatype | Type |
| - | - | - |
| total_ms    | int  | INPUT |
| active_ms   | int  | INPUT |
| duration_ms | int  | INPUT |
| is_active   | bool | OUTPUT |

## Relationship Types

### TELEPORTS_TO

| Start-Node-Type | End-Node-Type |
| - | - |
| TELEPORTER | TELEDEST |

| Name | Datatype | Type |
| - | - | - |
| enabled | bool | INPUT |

## Entity Instances

### TELEPORTER

| Name | Position |
| - | - |
| TELEPORTER_1 | (0.0, 0.0, 0.0) |
| TELEPORTER_2 | (100.0, 0.0, 0.0) |

### TELEDEST

| Name | Position |
| - | - |
| TELEDEST_1 | (500.0, 0.0, 0.0) |
| TELEDEST_2 | (-500.0, 0.0, 0.0) |
| TELEDEST_3 | (0.0, 500.0, 0.0) |

### TOGGLE_TIMER

| Name | total_ms | active_ms | duration_ms |
| - | - | - | - |
| TOGGLE_TIMER_1 | 150 |   0 | 50 |
| TOGGLE_TIMER_2 | 150 |  50 | 50 |
| TOGGLE_TIMER_3 | 150 | 100 | 50 |

## Relationship Instances

The relationship instances defines the connections between teleporter instances and tele destination instances.

### TELEPORTS_TO

| Relationship Instance Start Node (Entity Instance) | Relationship Instance | Relationship Instance End Node (Entity Instance) |
| - |  - |  - |
| TELEPORTER_1 | *→TELEPORTS_TO_1→* | TELEDEST_1 |
| TELEPORTER_1 | *→TELEPORTS_TO_2→* | TELEDEST_2 |
| TELEPORTER_1 | *→TELEPORTS_TO_3→* | TELEDEST_3 |
| TELEPORTER_2 | *→TELEPORTS_TO_4→* | TELEDEST_1 |

## Connectors


Just to more confusion: We are still friends with HackMD heart

For the whole renaming story, see the related issue
### Change teleport target dynamically using visual scripting connectors

| Output<br>Entity-Instance | Output<br>Entity-Instance<br>Attribute | | Input<br>Entity-Instance | Input<br>Entity-Instance<br>Attribute |
| - | - | - | - | - |
| TOGGLE_TIMER_1 | is_active | → | TELEPORTS_TO_1 | enabled |
| TOGGLE_TIMER_2 | is_active | → | TELEPORTS_TO_2 | enabled |
| TOGGLE_TIMER_3 | is_active | → | TELEPORTS_TO_3 | enabled |


# Visual Scripting Mechanichs Example

## Teleporting a player

| Entity Type | Output Attribute Name | Data type | | Entity Type | Input Attribute Name | Data type |
| - | - | - | - | - | - | - |
| PLAYER | position | vec3 | → | IN_BOX | position | vec3 |
| TELEPORTER | position | vec3 | → | MAKE_BOX | position | vec3 |
| MAKE_BOX | box_1 | vec3 | → | IN_BOX | box_1 | vec3 |
| MAKE_BOX | box_2 | vec3 | → | IN_BOX | box_2 | vec3 |
| IN_BOX | is_active | bool | → | ACTIVATOR_VEC3 | is_active | bool |
| TELEPORTER | position | vec3 | → | ACTIVATOR_VEC3 | input | bool |
| ACTIVATOR_VEC3 | result | vec3 | → | PLAYER | is_active | position |

Um die Position des Teleporters wird eine Box erzeugt. Befindet sich der Spieler in der Box, wird die Position des Teleporters in die Position des Spielers geschrieben.


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
