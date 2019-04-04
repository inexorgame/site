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
