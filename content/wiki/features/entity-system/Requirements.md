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
