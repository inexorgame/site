---
layout: feature
status: idea # idea | concept | specification | implemented
authors: IAmNotHanni
---

# Particle System

## Objective

We are about to implement an improved highly dynamic particle system.  
You can watch a [tech demo here](https://www.youtube.com/watch?v=j622-D-CCTI&list=PLCbZc-GgCGzLhkGS5l850tjCQrPUeapK6&index=41).

[![Improved particle system video](https://img.youtube.com/vi/0b_qnbV7TWY/0.jpg)](https://www.youtube.com/watch?v=0b_qnbV7TWY)

## Developers

* Hanack

## Features

* **Good performance** and **dynamic architecture**
* **Component Types**
 * Emitters
 * Initializers
 * Modifiers
 * Renderers
 * Particles
* Abstraction layers (for each component type)
 * Implementation (singletons, does stuff)
 * Types (like a configuration pattern for creating instances, holds the concrete implementation)
 * Instances (the concrete particle, emitter, modifier, initializer, renderer)
* **Stateful and dynamic** components
* A **rich set** of useful components (see below)
* Extendable via **dynamic attributes** for each component type

## The architecture of the particle system

The architecture of the particle system is designed to make modifications and extensions to itself as easy as possible. It is based on a clear matrix structure: `component type` x `abstraction layer`.

The abstraction layers divides **implementations**, **configurations**, and **runtime instances**. Implementations are designed to read parameters and dynamic attributes from the instances or types. For example each emitter implementation needs a position from the concrete emitter instance to spawn new particles. Types do only hold configurations with information about the "what" not "where and when". These information is known in beforehand, like a "fire emitter type" should define the particle type to be used as well as the particle rate and the batch size. On the implementation layer type it would be useless to define the position for example. Therefore the position of a fire is set on instance level. Most of the emitter type parameters are overrideable in the instance layer.

The scheme is similar for initializers, modifiers and renderers. The only exception are the particles itself. There is no implementation of particles, only particle types and particle instances. The reason is that particles have no inner logic. They are pure data containers.

More technically speaking (skip this if you are not a programmer) implementations are *stateless* while types and instances are *stateful*.

### Dynamic attributes

One of the main disadvantages of common particle systems is that they are not *modular* enough to allow extensibility. Therefore each type and instance of any component type is able to store **dynamic attributes**. For example if there is no attribute for the _drift_ of a particle, you can store this data as a dynamic attribute. Dynamic attributes on the implementation layer type are copied into the layer instance on creation time. For example by creating an emitter instance the dynamic attributes of the parent emitter type is copied.

### Particles

Particles are the little things flying around? Wrong. For the particle system they are only **data objects**. What to do with this data is up to the architecture and configuration of the system. In general you can do what you want with them. You will need all of the other component types described below.

So, here we will only describe the attributes of an particle object:

* Particle Type
* Origin Emitter
* Position
* Last Position
* Velocity
* Roll
* Remaining milli seconds
* Elapsed milli seconds
* Last elapsed milli seconds
* Mass
* Density

Additionally, particles (just as emitters, initializers, modifiers and renderers as well) can store even more information in the *dynamic attributes*.

### Particle Emitters

Emitters spawn particles. How often, how many, which particle type, and where depends on the emitter implementation. It's easy to implement new custom emitters. Notice that there is already a set of default generic emitters available.

* Point emitters
* Cubic emitters (1D = Line, 2D = Plane, 3D = Box)
* Ellipsoid emitters (2D = Circle, 3D = Sphere)
* Raster field emitters (1D = Dotted line, 2D = Raster, 3D = Cubic Raster)
* Bézier curve emitters

Each of them is configurable and _you'll be able to create complex setups_. If you want to create an emitter instance, you have to create an emitter type first. The emitter type is like a configuration pattern and allows to set up common types of emitters. For example: different types of fire, smoke, rain and so on. It stores which emitter implementation and which particle type will be used by the emitter instances. In contrast, emitter instances holds for example the position, velocity, the last used color, the next position and much more based on the last emitted particle. All data is only known by the single instance and during execution.

#### Default Emitter Type Attributes

* Particle type (fire, smoke, ...)
* Particle lifetime in milli seconds
* Emitter rate (10 = emit particles every 10 ms)
* Emitter batch size (3 = emit 3 particles at once)
* Mass
* Density
* List of modifiers (movement modification, color modification, ...)
* List of initializers (initial position, initial velocity, initial color, building weaved particles, ...)

#### Default Emitter Instance Attributes

* _Everything from it's emitter type_
* The emitter type
* Position (x, y, z)
* Velocity (x, y, z)
* Enabled (on / off)

### Particle Modifiers

Modifiers can alter the attributes of a particle over time. For example the velocity transformation modifier adds the current velocity vector to the current position vector, which "moves" the particle. But there are a lot of other possibilities how to modify particles.

### Particle Modifier Implementations

* Movement
 * Velocity Transformation: Apply a velocity vector in order to change the particle's position
 * Vector Field: Changes the velocity vector based on vector field formula's (using the [MuParser](https://muparser.beltoforion.de/) library)
 * Rolling: The pitch/roll angles of the particle gets updated (rolling grenades e.g.)
 * Random Velocity: The velocity of the particle is changed randomly in order to create unpredictable movement
 * Mass-Spring Transformation: Particles are connected with springs
 * Velocity Damper: The velocity get damped over time
 * Wind: A constant or pulsing wind force vector is applied to the particles
* Gravity
 * Global Gravity: Applies a force vector globally
 * Gravity Point: A point in the space applies gravity forc on the particles
 * Pulsar: like Gravity Point, but with a pulsing gravity force
 * Black Hole: like Gravity Point, but particles within a radius get culled
* Collision
 * Geometry Collision: Particles collide with the geometry 
  * Inexor uses an octree based geometry, so the collision detection is cheap
* Culling
 * Bounding Box Culling: Deletes particles which leave the given region
 * Geometry Culling: Deletes particles which collides with the geometry
* Other
 * Density Fade Out: Shortly before dying, the density of a particle is reduced, so that it fades out
 * Position Trace: Spawns particles with a shorter lifetime and no movement on the old position of the particle
 * Sub Emitter: A particle emits sub particles (in fact a separate emitter instance is emitting, but the position and velocity of the parent particle are inherited)

### Particle Renderer Implementations

To be visible, particles needs a renderer. These paint something in the 3D world. What, how and where is part of the implementation and configuration.

* Point-Based (Billboards)
 * Smoke
 * Fire
 * Lava
 * Poison
 * Snow
 * Flares (Lightnings, Rain)
* Geometry-Based
 * 2D: Triangles, Quads, Rings, ...
 * 3D: Tetrahedrons, Cubes, Tubes (Hair), ...
* Faces-Based or Model-Based
 * Textured quads: 4 particles belong to a face
 * Meta Balls: merge multiple particles into a blub

### Performance Considerations

* Use pools
* Use shaders
* Use billboarding
* Particle Limiter
* Particle Culling

### Full control for map makers

* Scripting particle effects using JavaScript / Lua /whatever
* Modify emitter attributes -> Emitter Modifier
* Modify modifier attributes -> Modifier Modifier
* React on player position

## Use Cases

### Gravitation and geometry collision simulation

[![Gravitation and geometry collision simulation demonstration video](https://img.youtube.com/vi/oTE4E2z8OBc/0.jpg)](https://www.youtube.com/watch?v=oTE4E2z8OBc)

Simulating bouncing grenades using gravitation and geometry collision. Furthermore, the particle is rendered as model with enabled roll effect.

### Position trace

[![Position trace demonstration video](https://img.youtube.com/vi/02awTpuNGog/0.jpg)](https://www.youtube.com/watch?v=02awTpuNGog)

Cloning short living particles with removed velocity (fixed position) to achieve a wrap-like effect.

### Branching particles

[![Branching particles demonstration video](https://img.youtube.com/vi/xwWTsL9g-Wc/0.jpg)](https://www.youtube.com/watch?v=xwWTsL9g-Wc)

Even more complex: the cloned particles are fully functional (velocity, modifiers).

### Vector fields

[![Vector fields demonstration video](https://img.youtube.com/vi/0b_qnbV7TWY/0.jpg)](https://www.youtube.com/watch?v=0b_qnbV7TWY)

Particle movement is defined using mathematical formula. Many things are possible: gravitation, wind, turbulence, hurricanes, DNA, waves ...

### Cloth simulation

[![Cloth simulation demonstration video](https://img.youtube.com/vi/pK0uNyjiWcM/0.jpg)](https://www.youtube.com/watch?v=pK0uNyjiWcM)

Realtime octree geometry collision of the particles connected with stretch, sheer and bend springs. The particles are emitted in a batch by a 2D grid field emitter and are connected by the spring weaver initializer which applies construction rules based on a transformation matrix in order to connect nearby particles.

For example, to construct a 2D cloth mesh the construction rules are:

1. stretch spring in plus-x-direction (x+1, y, z)
2. stretch spring in plus-y-direction (x, y+1, z)
3. sheer spring in plus-x and plus-y-direction (x+1, y+1, z)
4. sheer spring in plus-x and minus-y-direction (x+1, y-1, z)
5. bend spring in plus-x-direction (x+2, y, z)
6. bend spring in plus-y-direction (x, y+2, z)

In this case, we construct 6 springs for each particle. Therefore the total number of springs is about 6 times higher than the number of particles. The calculation of the springs happens on CPU and won't affect the fps. But the rendering of cloth is still complex enough and should be done on GPU.

### Jello Simulation

[![Jello simulation demonstration video](https://img.youtube.com/vi/zQEj8QB1FE8/0.jpg)](https://www.youtube.com/watch?v=zQEj8QB1FE8)

Like cloth simulation in three dimensions with much more springs, also constructed by spring construction rules. For each particle we need 26 springs. Rendering is done a bit differently by only rendering the surface, so the rendering is much faster than the simulation.

## Resources

### Standard Effects

* [Fire Effect](https://blog.martincrownover.com/gamemaker-examples-tutorials/particle-example-fire/)

### Mass Spring Simulation

* https://www.henning-tjaden.com/_files/pdfs/projekt_618.pdf

### Cloth Simulation

* https://graphics.stanford.edu/~mdfisher/cloth.html
* https://www.math.hmc.edu/~depillis/MATH164/MATH164_StudentProjects_2003/COCONNOR/ClothSimulation/final_report.pdf

### Sound

* https://hal.archives-ouvertes.fr/docs/00/75/98/18/PDF/soundParticles_HAL.pdf
* https://gamma.cs.unc.edu/propagation/
* https://www.youtube.com/watch?v=FDL39J-i0yQ&html5=1
* https://www.youtube.com/watch?v=MQt1jtDBNK4&list=UU0GpuO2aEbGMG8N0iLE9_TA&html5=1
