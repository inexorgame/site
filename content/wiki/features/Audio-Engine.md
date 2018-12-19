---
layout: feature
status: implemented # idea | concept | specification | implemented
# authors: 
---

# Audio Engine
As part of Inexor's overall refactoring strategy, it's audio engine will be redesigned and rewritten from the ground up build on [OpenAL](https://www.openal.org/). Inexor currently still uses Cube2's old audio code.

# Goals
* Multithreading
* Asynchronous resource loading
* Class-based code design


# GPU-based 3D sound propagation algorithm ?
Realistic 3D graphics in realtime are quite developed these days.
3D sound propagation however is still not really in the focus of development. Sadly there is no open source library for this to this day. Time to change this!

[this1](https://www.youtube.com/watch?v=EWatzCC7rk0)
[this2](https://www.youtube.com/watch?v=buU8gPG2cHI)
[this3](https://www.youtube.com/watch?v=05EL5SumE_E)

> The goal is to implement *module_sound* in order to further refactor and modularize Inexor's code.

Until now Inexor is using Cube2's old sound system which uses SDL_Mixer. It has no class design and is not documented at all which makes maintaining it quite unpleasant. We will also implement new features for inexor's sound system.
This code is mostly separated from other code parts so the refactoring progress shouldn't be too complicated.

This task is divided into 4 steps:

## Step I - Understanding the old sound system
_See main article:_ [[Cube2's old sound system code]]

## Step II - Planing the new sound system
_See main article:_ [[Inexor's sound system (architecture)]]

## Step III - Learning OpenAL/ALMixer
TODO...

## Step IV - Implementation and documentation
TODO...
