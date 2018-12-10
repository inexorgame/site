Branches | Issues | Main Developers
-------- | ------ | --- 
none | - | _Blueprint author:_ [@a-teammate](/a-teammate)

This is a blueprint for a new shader system which got the following goals:

* **simplicity** for shader artists
* **flexibility**
  * depending on the targets PCs settings
* **performance**
  * FPS wise
  * startup-time wise (optional)
* **modularity**
  * aka sharing shader-slices

## Introduction
Let's start quickly with a summary what shaders are and how they are used in our engine:

Shaders are programmable stages of your rendering process (rendering = your 3D world gets mapped onto your 2D screen). 

In most cases each shader gets applied only on parts of the 3D-world.
However in total anything you see when you startup Inexor has gone through such shader stages before.

The problem which occurs pretty soon when dealing with shaders is that you need a lot of them.  
That has two reasons:  
* You need to deal with a lot of different assets
  * with each additional possible input you have alot more possible combinations
  * e.g. for textures you got `glowspecworld, glowworld, specworld` -> `bumpglowspecworld, bumpglowworld, bumpspecworld, ..`
  * Sauerbraten deals with this by letting scripts generate the shaders
    * not really readable
* You need to take performance into account, dealing with different target-PCs
  * therefore in the Cube2-engine you got different variants of shaders "fastshader", "detailshader", ..
    * depending on the artist-written scripts again

_(Sidenote: There are other parts of the shader system ofc without those influences e.g. PostFX shaders, the HUD-shader, animation shader)_

Furthermore in Sauerbraten the simplification was made (out of historical reasons actually) that we restrict ourselves to the 2 most common (and oldest) shader stages:  The vertex shader and the fragment shader.  
If we drop this restriction we will even have one additional source of complexity in our shader system (while they might bring us both better performance and better looks).

So let's try to simplify this stuff for the artists:

## Basic Design

Keep it simple.  
If you touch the code you'll pretty soon come to the conclusion to seperate the cubescripts from the shaders.  
This is basicly the idea to separate the artistic part from the generating shaders part.  
However doing this, you'll end up with a lot of duplicated shaders which vary just in pretty little aspects.

So how can we deal with this?

### Different assets

There are actually 2 possible solutions we can choose, however of course both are UI based:

##### Node based approach (flowgraph)

This is the most commonly used one in the big engines.  
You actually got a lot of abstraction and just draw lines from one part to the other one.
An example of unitys shader editor you can see [here](https://d2ujflorbtfzji.cloudfront.net/package-screenshot/EC59CDDA-5417-11E0-9CB0-67250A232548.png).

Dealing with different related asset-shaders would mainly mean having different node-chains (e.g. in the same window but with the lines get different colores depending on the target).  
That is however not the main advantage of this approach, but the modularity you base your abstraction on: you have different functions for different tasks e.g. color modification, advanced filters..  
You need to write these modules ofc, so we need to provide a template for such modules, but otherwise artists could write them themselves on demand.  

_(An example of such a graph-based scripting is Hanni's [3D flowgraph system](https://github.com/inexorgame/code/wiki/3-Dimensional-Visual-Scripting-Environment-(3DVS)))._  

However this is pretty advanced and we probably need to start with something simpler.

##### Text based solution

This approach is less abstracted but tries to retain a similar level of simplicity.  
The main advantage of it is that we can pretty easily vary one and the same shader (e.g. for `bumpspecglowparallaxworld`) and just cut features (e.g. cutting it to `bumpspecworld`).
We do that by seperating the shader writing from the variant abstraction: You firstly write your most advanced (raw) shader in our 'special' text editor and afterwards just mark parts you for the variants in different colors.
(+ a filter for seeing that new shader)  
So the advantage is that you replace the scripts "if-else" statements with an UI.
I don't know yet whether another engine uses such a system.

The downside to the node-approach is that you need to get the modularity somehow else again:
I'd go for a simple preprocessor "#include" system (or "require" or whatever) to obtain predefined functions in other files.

I don't know whether this approach is done in other engines.

**Conclusion:** The both approaches are not conflicting, but could live in peace together. 



### Next step:

So what we want to do is establish a user-driven ecosystem similar to the map-system for our modular shaderslices.
Since that's a performance critical part of the engine and we're speaking about user created content you might rightly become sceptical at this point.

Our users are probably no experienced shader artists. They do not know how to write fast shaders and probably do not know how to write it to not kill performance on some platforms.  
So this is where we come to the second part of the shadersystem's complexity: Having different shader versions based on the targets performance needs.

Previously in Sauerbraten it was solved with little stuff like `fastshaders`.  
However this might not be sufficient anymore as soon as more less advanced people start writing shaders.
Luckily we can cut the need for it completely:

## Automatic shader simplification

This part actually only deals with the issue of performance.

We can devide our optimisation routine in two stages:
* simple optimization
* error based simplification

#### Optimization

The optimization stage is pretty much what some advanced modern GPU-drivers might actually do, but since you have to deal with 3 totally different vendors + a lot of different drivers for each you can't be sure.  
Additionally our optimisations are possibly more aggressive.

The aim of this stage is pretty much to sustain the actual shader and just rewrite the code somehow else, so that it will be executed faster (e.g. by using MAD instructions, or e.g. replacing parts with a lot of addition with dot-products.. everything advanced shader programmers do when they optimize their code by hand with the aim for using as less gpu cycles as possible for the instructions).  
This is pretty much straight forward and we might even find a library for that.

The important part of our automatic optimisation routine however is more complex:

#### Error Based Simplification

Since we want too support a wide range of target PCs we need to give as much control as possible to the client.  
We can achieve that by the methods presented in the following papers (in most basic to most advanced ordering):


* [User-Configurable Automatic Shader Simplification](http://pellacini.di.uniroma1.it/publications/lod05/lod05-paper.pdf)
* [Genetic Programming for Shader Simplification
](https://www.cs.virginia.edu/~weimer/p/sitthiamorn_siga11.pdf)
* [Automatic Shader Simplification using Surface Signal Approximation] (http://www.cad.zju.edu.cn/home/rwang/projects/shaderopt/14shaderopt.pdf)

Basicly it summarizes to modifying some input shader and measuring the error compared to the original shader. Then the user/client can decide how much error he tolerates.

## Implementation

* 
* 
* 
* 
Later..