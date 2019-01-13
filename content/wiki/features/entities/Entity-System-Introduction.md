# Introduction
The development of a new entity system is an essential key for the future of Inexor! It is the foundation for many new features like the new particle system, the new sound system or the visual scripting enviroment. It also plays a central role in code refactoring. All those tasks can't be started until a new entity system has been developed! In order to accelerate Inexor's development we must resolve this blocking of follow-up projects as fast as possible!

## What is an entity ?
An entity is a thing in the game world that fulfills a certain purpose:

![error: file not found!](https://raw.githubusercontent.com/inexorgame/visualisations/2d3f48d44960d4635f29a90e955fdfcfc25b1bab/wiki/wiki_particle_examples.jpg)

* pickups
* particles
* sound sources
* spawn points
* light sources
* projectiles
* jumppads
* player models
* map models
* ..

Please take a moment to realize that *everything* in the game is an entity.

## What gives entities their purpose ?
Entities can have connections to other entities which shall be called **relations**.
Entities can store data in form of **attributes**. Every attribute of an entity has a name, data type and value.
It is the combination of attributes and relations which gives entities their purpose and allows the game engine to control their behaviour.

## What is an entity system ?
An entity system is the code which manages entities and their attributes and relations with a data model and gives them their functionality.

# What are the implementation metrics ?
* fast
* simple
* flexible
* well documented
* object oriented design

# Source code design
[Click here](https://github.com/inexorgame/entity-system/wiki/Code-design) to see some characteristics of Inexor's entity system's code.
