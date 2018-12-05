# Overall Architecture

We needed a way to make Inexor more dynamic and extendable.

We chose to not only expose some functions and variables to the Users for changing stuff dynamically but going a way more profound way:  
We let our scripting engine **Inexor Flex** feed the Core game engine (**Inexor Core**)!

**Inexor Core** is hence regarded as being our high-performance component of an overall bundle of different processes: The Scripting process and the traditional C++ game process.

To illustrate in how far that is different from the traditional game scripting, you can imagine our structure to be like a train on rails. The train just goes where the rails force it to. Traditional scripting is more similar to the steering wheel of a car: you give the driver access to control the position of the wheels.  
This example is probably not best as it omits the illustration **why** this approach is better for us (does anyone find a better one? replace it!)

## Why this approach and in how far is it making a difference?

We have to deal with a legacy codebase, which – like all legacy codebases – has become stuck in several places in dead ends.

The traditional scripting is pretty great if you have a clean Core codebase, inventing stuff in that codebase is guaranteed to be doable fast and you want **some** places exposed for User control.  
Our approach really shines in its way of being totally decoupled from the Core!  
This allows us to rewrite some functionality from scratch in a really dynamic environment (node.js).

However the idea behind that is simply: Not everything in Inexor is solvable in the same fashion. On the one hand you want performance, on the other hand you want usability, features and possibilities.

While performance in Sauerbraten (the predecessor of Inexor) has always been the main optimization goal, we want an arsenal of weapons by hand to let people write awesome features in short time.  
As a consequence the high-performance part uses C++ as its language (which is one of the languages which allows a lot of optimizations for performance) and the feature-rich, slower but more dynamic part uses JavaScript (and more precisely node.js [with npm](https://www.npmjs.com/)).

## How does this change development?

In Sauerbraten if you wanted to develop a new masterserver (+ serverbrowser) you would:

1. Write in C++ (≈ InexorCore) a masterserver having a REST-API to your game servers and clients.
2. Write in C++ the code for the game servers and clients to connect to that.
3. Write in C++ the code for saying what you want the masterserver to know about you/to send you.
4. Expose in the client the list of servers to the scripting language.
5. Write in CubeScript the server browsers based on that array of servers.
6. Render in the C++ code that CubeScript UI.

----

In Inexor you would:

1. Write all of that in InexorFlex (== node.js)
   * the masterserver
   * the connection between game clients/game servers and the masterserver
   * ..
2. Using a rich package-set of already written node.js packages.
3. Create a website with a serverbrowser (that's what node.js is originally build for)
4. Render that website in [[Inexor Core]]

and that's only a very simplistic approach (e.g not using a distributed system)!

-----

Other really useful wholes this fills:

People are crying for a content deployment system.  
You can't (however) create it with CubeScript because of safety considerations.  
Hence one would have needed to invent a complete new way in [[Inexor Core]] to load content (and we tried. But its not scaling).

What we want to do is different:

Everything not directly required for rendering gets handled prior to loading in [[Inexor Flex]].
And its just feeding [[Inexor Core]] with the stuff it really needs to load (like the absolute texture path and type).  
This way the C++ part shrinks, only **removing** functionality there and the from scratch written part is in node.js with all its benefits, see above.

---

The **Inexor Tree** is the glue between [[Inexor Core]] and [[Inexor Flex]]. It gets updated by both sides (and is readable by both sides).
Additionally we can store things like the Content handling in the Tree comfortably, allowing us e.g. to link various stuff together in [[Inexor Flex]].

# Technical Overview

## Component / System Overview

Component / System  | Repository                             | Language     | Description
------------------- | -------------------------------------- | ------------ | -----------
[[Inexor Core]]     | [code](/inexorgame/flex/)             | C/C++        | Game-State, Rendering and calculate anything performance sensitive
[[Inexor GlueGen]]  | [code](/inexorgame/code/)             | C/C++        | External application used in the build-process to generate our networking code (and potentially other glue code)
[[Inexor Flex]]     | [flex](/inexorgame/flex/)             | JS (NodeJS)  | Provides a scripting environment for the server and client, provides the Inexor User Interfaces
Inexor UI HUD       | [ui-client-hud](/inexorgame/ui-client-hud/) | HTML5+JS+CSS | The Inexor UI HUD is basically a website, which is rendered by the Inexor Core
Inexor UI APP       | [ui-client-interface](/inexorgame/ui-client-interface/) | HTML5+JS+CSS | The Inexor UI APP is basically a website, which is rendered by the Inexor Core
Console             | [ui-console](/inexorgame/ui-console/) | HTML5+JS+CSS | Console web application

### Component / System Interoperability

Component / System                | Connection                  | Component / System
--------------------------------- | --------------------------- | -----------
[[Inexor Core]]                   | Inexor Tree [using gRPC](/inexorgame/code/wiki/RPC-Node.js)  | Inexor-Flex
[[Inexor Flex]]                   | [[Inexor Tree]] using REST  | Inexor-UI-HUD
[[Inexor Flex]]                   | [[Inexor Tree]] using REST  | Inexor-UI-APP
[[Inexor Flex]]                   | [[Inexor Tree]] using REST  | [[Inexor Flex]] (remote)
[[Inexor Core]]                   | Key Events using CEF-RPC    | Inexor-UI-APP (only APP, not HUD!)

### Components / Systems

#### Inexor Core

| Component / System                | Topic                  | Sub Topic                    | Sub Sub Topic
| --------------------------------- | ---------------------- | ---------------------------- | -------------
| [[Inexor Core]]                   | Game State             | Physics                      | 
|                                   |                        | World                        | 
|                                   |                        | Player                       | 
|                                   | Graphics               | Rendering Game-Graphics      | Octree
|                                   |                        |                              | Textures
|                                   |                        |                              | Models
|                                   |                        |                              | Entities
|                                   |                        |                              | Particles
|                                   |                        | Rendering HTML5 Applications | HUD
|                                   |                        |                              | User Interface
|                                   |                        |                              | Console
|                                   | Input                  | Game Movement                | Mouse
|                                   |                        |                              | Keyboard
|                                   |                        |                              | Key Bindings
|                                   |                        | UI Input Handling            | Mouse Events
|                                   |                        |                              | Key Events

#### Inexor Flex

| Component / System                | Topic                  | Sub Topic                    | Sub Sub Topic
| --------------------------------- | ---------------------- | ---------------------------- | -------------
| [[Inexor Flex]]                   | Webserver              | REST API                     | [[Inexor Tree]]
|                                   |                        | [[User interfaces]]          | [Inexor Flex User Interface](/inexorgame/ui-flex)
|                                   |                        |                              | [Inexor Core (Client) Menu & Application](/inexorgame/ui-client-interface)
|                                   |                        |                              | [Inexor Core (Client) HUD](/inexorgame/ui-client-hud)
|                                   |                        |                              | [Inexor Core (Client+Server) Console](/inexorgame/ui-console)
|                                   | [[Inexor Tree]]        | Management                   | CRUD
|                                   |                        | Eventing                     |
|                                   | Profiles               | Management                   | CRUD
|                                   |                        |                              | Switch / restart
|                                   | Instances              | Management                   | CRUD
|                                   |                        |                              | Load configuration
|                                   |                        | Connector                    | RPC Synchronization
|                                   |                        |                              | Instance Tree
|                                   |                        |                              | Console + Logging
|                                   | Media                  | Repositories                 | CRUD
|                                   |                        |                              | Index to tree
|                                   |                        |                              | Download / update
|                                   |                        |                              | Switch branch
|                                   |                        | Textures                     | CRUD
|                                   |                        |                              | Index to tree
|                                   |                        | Maps                         | CRUD
|                                   |                        |                              | Index to tree
|                                   |                        | Music                        | CRUD
|                                   |                        |                              | Index to tree
|                                   |                        | Sound                        | CRUD
|                                   |                        |                              | Index to tree
|                                   |                        | Videos                       | CRUD
|                                   |                        |                              | Index to tree
|                                   | User Interfaces        | Management                   | CRUD
|                                   |                        | Updates                      | Detect, Download, Install
|                                   | Releases               | Updates                      | Detect, Download, Install
|                                   | Server List            | Management                   | CRUD
|                                   |                        | Updates                      | Synchronization with other Flexes
