The Entity System API is available on [[Inexor Core]] and [[Inexor Flex]]. The design of the API shall be similar (but not identical) on `Inexor Core` and `Inexor Flex` and easy to use (especially flex).

`UUID`s are used for the identification of entity types and entity instances even across client or server boundaries.

The entity system is a `directed property graph` mapped on the `Inexor Tree`. Synchronization between Inexor Core and Inexor Flex happens automatically and can be defined on entity type level.

```TODO: The Inexor Tree has to be extended by a graph system.```

## Data types

### Inexor Tree Node

Currently the Inexor Tree is only an hierarchical tree. By extending the tree with a directed property graph the synchronization happens automatically. The tree structure have to be extended with relationships between two nodes in the tree.

The architectural changes are:

Every tree node can have multiple parent nodes, too. But there is still only on primary parent node. Using the primary parent node the hierarchical tree structure stays intact. Therefore addressing a node using a path is still working even if a node has multiple parents.

Furthermore the relationship between two nodes is a object itself (we call it a `relationship`). A relationship consists of a parent node and a child node and can have attributes itself (equal to a tree node).

This enables us to store information about the relationship between to nodes! An example for using this feature is that a teleport entity and have multiple destinations (teledest). If a player enters the teleporter he will be teleported to a random teledest. But if you define an attribute `propability` for each relationship from the teleporter to a teledest, you can define which teledest is used more than the others.

For the Inexor Tree the change is that every Tree Node has to be extended using a list for the relationship to the parent nodes and a list for the relationships to the child nodes.

* **Attributes**
    * List\<`Relationship`\> `parents`
        * Multiple parents allowed
        * Currently
            * Only one parent node
        * Future
            * One primary parent node
            * A list of relationships to the parent nodes
            * The relationship contains the parent node and `this` as child node
    * List\<`Relationship`\> `childs`
        * Multiple childs allowed
        * Currently
            * A list of relationships to the child nodes
        * Future
            * A list of relationships to the child nodes
            * The relationship contains `this` as parent node and the child node
* **Methods**
    * `Node` `getParent`()
        * Returns the primary parent `Node`
    * List\<`Node`\> `getChilds`()
        * Returns all child `Node`s (Nodes, not the relationships!)
    * List\<`Node`\> `getParents`()
        * Returns all parent `Node`s (Nodes, not the relationships!)
    * List\<`Node`\> `getChildRelationships`()
        * Returns the `Relationship`s from the current Node to child Nodes
    * List\<`Node`\> `getParentRelationships`()
        * Returns the `Relationship`s from the current Node to parent Nodes
    * `Node` `addChild`(name, datatype, ...)
        * Creates a child node
        * Also creates the relationship between the parent node and the child node (bi-directional)
    * `Node` `addChildRelationship`(`Node`, attributes)
        * Adds an existing `Node` to the list of child nodes
        * Also creates the relationship between both `Node`s
        * Adds the relationship to the list of child relationships (of this node)
        * Adds the relationship to the list of parent relationships (of the other node)
    * `Node` `addParent`(`Node`, attributes)
        * Adds an existing `Node` to the list of parent nodes
        * Also creates the relationship between both `Node`s
        * Adds the relationship to the list of parent relationships (of this node)
        * Adds the relationship to the list of child relationships (of the other node)
    * List\<`Relationship`\> `getParentRelationships`()
        * Returns the list of relationship to the parent nodes
    * List\<`Relationship`\> `getChildRelationships`()
        * Returns the list of relationship to the child nodes
    * `Relationship` `moveTo`(`Node`)
        * Moves a node to another location in the tree
        * The primary parent is changed, the current relationship is removed and a new relationship is created

### Inexor Tree Relationship

Represents the relationship from a parent Node to a child Node.

* **Attributes**
    * String `uuid`
        * The UUID of the `Relationship`
    * `Node` `parent`
        * The parent `Node`
    * `Node` `child`
        * The child `Node`
    * Map\<String, `EntityAttribute`/`Node`\> `attributes`
        * The attributes of the relationship (It's a `Property`-Graph!)
* **Methods**
    * String `getUuid`()
        * Returns the UUID of the `Relationship`
    * `Node` `getParent`()
        * Returns the parent Node
    * `Node` `getChild`()
        * Returns the child Node
    * Map\<String, `EntityAttribute`/`Node`\> `getAttributes`()
        * Returns the relationship attributes


### Entity

An `Entity` is a configurable object of a certain type (Entity Type). For example the entity type is `light` and the instances are `light 1` and `light 2`.

* **Attributes**
    * String `uuid`
        * The UUID of the `Entity`
    * String `type_uuid`
        * The UUID of the `EntityType`
    * [Nur C++] EntityType `type`
        * The `EntityType` object
    * String `name`
        * The name of the `Entity` for use in the UI or rendering the entity in the 3D world
        * Optional
    * Map\<String, `EntityAttribute`\>/`Node` `attributes`
        * The attributes of the `Entity`
* **Methods (Nur C++)**
    * String `getUuid()`
        * Returns the UUID of the `Entity`
    * Map\<String, `EntityAttribute`\>/`Node` `getAttributes()`
        * Returns the attributes of the `Entity`
    * EntityType `getType()`
        * Returns the `EntityType`
    * String `getTypeUuid()`
        * Returns the UUID of the `EntityType`
    * Map\<String, `EntityAttribute`\>/`Node` `getTypeAttributes()`
        * Returns the Attributes of the `EntityType`
* **Inexor Tree**
    * Path to a Entity Node
        * /instances/`instance_id`/entity/types/`entity_type_name`/entities/`entity_uuid`
        * Example
            * /instances/31415/entity/types/light/entities/ab39-39c9
    * Name of an Entity
        * /instances/`instance_id`/entity/types/`entity_type_name`/entities/`entity_uuid`/name
        * Example
            * /instances/31415/entity/types/light/entities/ab39-39c9/name
    * Attributes of an Entity
        * /instances/`instance_id`/entity/types/`entity_type_name`/entities/`entity_uuid`/attributes/`attribute_name`
        * Example
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/x
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/y
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/z
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/r
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/g
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/b
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/yaw
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/pitch
            * /instances/31415/entity/types/light/entities/ab39-39c9/attributes/intensity

### EntityType

The type of an entity defines the properties all instances have in common. Therefore you can define attributes on entity type level. Also specialized renderers are responsible for rendering entities of an certain entity type. Also there may be specialized entity emitters or entity modifiers, which spawns new or modifies existing entities of an certain entity type.

* **Attributes**
    * String `uuid`
        * The UUID of the `EntityType`
    * String `name`
        * The name of the `EntityType`
    * Map\<String, `EntityAttribute`\>/`Node` `attributes`
        * The attributes of the `EntityType`
    * (Nur C++) List\<`Entity`\> `entities`
        * The instances (all `Entities` of this type)
* **Methods (C++)**
    * List\<`Entity`\> `getEntities`()
        * Returns all entities of this type
* **Inexor Tree**
    * Path to an entity type
        * /instances/`instance_id`/entity/types/`entity_type_name`
        * Example
            * /instances/31415/entity/types/light
    * Name of an EntityType
        * /instances/`instance_id`/entity/types/`entity_type_name`/name
        * Example
            * /instances/31415/entity/types/light/name
    * Attributes of an EntityType
        * /instances/`instance_id`/entity/types/`entity_type_name`/name
        * Example
            * /instances/31415/entity/types/light/attributes/x
    * Entities of type EntityType
        * /instances/`instance_id`/entity/types/`entity_type_name`/entities/`entity_uuid`
        * Example
            * /instances/31415/entity/types/light/entities/ab39-39c9

### EntityAttribute

* Each Entity contains 0..n named attributes
    * It's possible to get the value of an attribute by the name of attribute
    * Each attribute has a data type
    * The data type is variable
* NodeJS:
    * Ein Entity-`Node` enthält einen Kind-`Node` namens `attributes`
    * Die Kind-`Node`s von `attributes` sind die eigentlichen Attribute
    * `Node` Objekte stellen bereits transparente getter und setter bereit
    * `Node` Objekte besitzen bereits eine Datentypbehandlung
* C++:
    * In C++ müssen die Attribute in einer Map mit dem Namen als Key und einem Objekt vom Typ `EntityAttribute` als Wert gesammelt werden
    * `EntityAttribute` ist eine eigene Klasse, die den Datentyp und den typisierten Wert beinhaltet (boost::any)
    * getter und setter sollen transparent sein

## API / Service Layer

In order to access entities in `Inexor Flex` we just use the `Inexor Tree` API. The API below simplifies and unitizes the usage and though. In theory everything can be done with the Inexor Tree API but is more complicated.

In contrast to `Inexor Flex` you have to use the Entity System API in `Inexor Core`! `Entity` and `EntityType` are fully implemented C++-Classes. Whereas `Inexor Flex` uses `Inexor Tree Nodes` in `Inexor Core` you have to use instances of `Entity` and `EntityType`.

### Entity Manager

All management of entities is done by the EntityManager (CRUD + Inexor Tree). The entity manager simplifies the access to entities.

* `Entity`/`Node` get(uuid)
    * Liefert das Objekt zurück
* List\<`Entity`/`Node`\> getAll(type_uuid)
    * Gibt alle Entities vom angegebenen Typ zurück
* List\<`Entity`/`Node`\> getAll(`EntityType`/`Node`)
    * Gibt alle Entities vom angegebenen Typ zurück
* `EntityType`/`Node` getType(uuid)
    * Gibt den EntityType für das angegebene Entity zurück
* `EntityType`/`Node` getType(`Entity`/`Node`)
    * Gibt den EntityType für das angegebene Entity zurück
* void remove(uuid)
    * Löscht das Entity mit der angegebenen uuid
* void remove(`Entity`/`Node`)
    * Löscht das Entity
* void removeAll(type_uuid)
    * Löscht alle Entities vom angegebenen Typ
* void removeAll(`EntityType`/`Node`)
    * Löscht alle Entities vom angegebenen Typ
* `Entity`/`Node` create(type_uuid)
    * Erzeugt ein neues Entity mit dem angegebenen EntityType und gibt das Objekt zurück
* `Entity`/`Node` create(type_uuid, publish)
    * Erzeugt ein neues Entity mit dem angegebenen EntityType und gibt das Objekt zurück. Macht das Entity über den InexorTree verfügbar, wenn publish = true
* `Entity`/`Node` create(`EntityType`/`Node`)
    * Erzeugt ein neues Entity mit dem angegebenen EntityType und gibt das Objekt zurück
* `Entity`/`Node` create(`EntityType`/`Node`, publish)
    * Erzeugt ein neues Entity mit dem angegebenen EntityType und gibt das Objekt zurück. Macht das Entity über den InexorTree verfügbar, wenn publish = true
* void publish(uuid)
    * Macht das Entity und seine Attribute über den InexorTree verfügbar
* void publish(`Entity`/`Node`)
    * Macht das Entity und seine Attribute über den InexorTree verfügbar
* void unpublish(uuid)
    * Removes an Entity from InexorTree
* void unpublish(`Entity`/`Node`)
    * Removes an Entity from InexorTree

### EntityTypeManager

All management of entity types is done by the `EntityTypeManager`.

  * EntityType/Node get(uuid)
  * EntityType/Node create(name, attributes)
  * void remove(uuid)
  * void remove (EntityType/Node)
