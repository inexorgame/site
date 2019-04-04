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
