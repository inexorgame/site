Branches | Issues | Main developers
-------- | ------ | ---
[fohlen/nodetree](/inexorgame/code/tree/fohlen/nodetree), [karo/tree-gen](/inexorgame/code/tree/karo/tree-gen), [karo/node-tree-api-ARCHIVE ](/inexorgame/code/tree/karo/node-tree-api-ARCHIVE ) | ? | [@Fohlen](/fohlen), [@koraa](/koraa)

# Inexor File System API

## Intro/Current API

The current Inexor/Sauer API uses specially crafted network messages; e.g. a player changing their position has a special packet which contains three coordinates representing the new position. This can be though of as a procedural approach since in essence each message represents a call to a procedure modifying the state of the game.

On a more abstract level, the entire construct serves the purpose of synchronizing the state between clients and server.

Unfortunately, this approach is rather cumbersome since it requires the developers to add packages for every possible state change; e.g. name change needs it's own specially implemented procedure, weapon change, ...  
For Inexor, this approach definitely won't cut it: one of the goals is to make it possible to write plugins that define the behaviour of Inexor on a very deep level. Specifically it should be possible to implement all the game modes in Node/the Inexor graphical scripting language.

As a very simple example, take for instance the addition of a handicap: The better a player is the larger their body becomes. This would require the addition of a size change message. Rather than implementing such our message, we should have a framework in place that can automatically process the local state change and automatically generate an appropriate update message.

Essentially: I am talking about a state synchronization framework. We can use the following abstract strategy to build such framework:
* Declare our data and **the way the data is organized** in a machine readable format
* Create a generic rule to create differentials over the machine-readable data

The rest of this document is going to outline my a way to organize the data in Inexor and how to send the differentials using Inexor directly and using Node.js.

## Filesystems

There's a long tradition of storing data in the filesystem. In fact the filesystem centric approach is one of the strong points of the unixoid systems. Plan9, which was built as the next generation Unix (and IMO, in a way it is), is built around that concept: routing a large part of communication between users, applications and the kernel through the file system; APIs are generally provided via the 9P protocol, which is a remote file system protocol.

### Requirements

In addition to the basic file systems (as provided by protocols like 9P, CIFS or NFS) we need some other features:
* Decentralization/Syncing – Unlike a traditional file system, we need to provide synchronization between different instances in addition to access only – each C++ instance should work with the data it has locally rather than waiting for IO before being able to access internal variables.
* Semantic Information – We need to be able to check whether a player is actually allowed to perform  a certain update (e.g. only an admin may kick another player but each player can disconnect themselves)  
* Optimization – Since we know a lot about our internal data, we can compress that information. E.g. the time in the game left could be in the tree under `/game/eta`, but since we know this is a frequently accessed element we internally assign the file system ID 13; if we're clever, this fits into a 4bit varint; it can be decoded quickly and in our C++ server code we could use a statically compiled jumping table to access it.

There already are a couple of file systems and file system protocols out there; 9P comes to mind very quickly because it was build as an API for accessing application internals. Unfortunately it doesn't meet the distributed requirement.  
Then, there also are some [distributed file systems](https://en.wikipedia.org/wiki/Comparison_of_distributed_file_systems#cite_note-6) but they are generally built for storing big data (problems that won't fit on a single HD) where as we are dealing with a small amount of data that needs to be synced efficiently.

So let's take a step back and design our own:

### A Virtual File System for Inexor

The Inexor File System should be distributed, thus a set of process/computers has shared ownership over the FS; each of those is called a **Peer**.  
A peer who is actually playing will be called a...**Player**.

File Sytems are generally just **Trees**;

**Node** is a vertex in the Tree; any of it's element.
**Directory** a Node in the Tree that can contains references to other nodes by name. 
**File** a Node in the Tree that contains no other nodes but can have some data attached to it.j

The simplest Tree consists of a single Directory containing no nodes. This base node is called the **Root**.

For Inexor we need a couple more data structures:

**Link** File that contains a reference to another Node. This generally expresses äquivalence between nodes. Let `/players/22/name` be a File that contains "Arthur Dent" and let `/players/me` be a link that references `/players/22`; then `/players/me/name` is considered a File with the value "Arthur Dent". What a link points to can be changed.   
**Set** A Directory that is not compile time static. A Set contains any number of nodes; each of those nodes must follow the same structure. The name of a Node inside a directory needs to be a UUID. Sets also contain special directory **by/** which can be used to access subnodes based on their propertes. E.g. by `by/name/hoax` would reference a Directory inside the set that has a File `name` with the contents `hoax`.   
**Log** A Directory that contains a history of Nodes. Each Node in a log needs to follow the same structure. The names of the Nodes in a log are nanosecond precision unix timestamps PLUS a UUID. Logs also contain Links with numeric names: `0` would access the most recent node, while `1` would acces the Node before that. Logs only provide approximate chronological coherence: Nanosecond precision is mostly used to avoid name collisions; correctness can not be guaranteed because it is not possible to synchronize all the Peer's clocks and since Unix time is based on UTC and thus incorporates leap seconds. Old Nodes may be purged from nodes; the Log structure declares no limitation on when that may happen.

[Unix Style Paths](https://en.wikipedia.org/wiki/Path_(computing)#Unix_style) are used to denote paths.

### Synchronization

Now that we have defined our data structures we need to define differentials for these structures

**Node** defines no differential because it is only a abstract parent of all other nodes;
**Directory** also defines no differentials because the content of plain directories is compile time constant.

**File** just uses the new value as a differential.
**Link** also uses the new value as differential.
**Set** has two differentials: **add** and **remove**; both contain the UUID of the Node as argument. add also optionally incorportates a dump of the Node.
**Log** just contains the timestamp and the uuid of the new Node and optionally a dump of the node.

The data structures mentioned above demonstrate only a very basic set of reusable data structures; there will be a bunch of structs (e.g. players will be Directories with a compile-time defined set of Nodes). And other things like the octree will need to be specially handled: An octree might be a plain file, but with a custom differentials to save some space and traffic. There might also be a Text type of file with plain old text differentials...

### Security

The approach described here is powerful, but opens a lot of security holes for cheaters. We need to define roles and a DSL for specifying what updates are permissible by whom (e.g. we could have a Game Master with superuser privileges and we could have Admins; a Game Master can do pretty much anything that is just the game, while an Admin can administrate the server; e.g. kick and bann people...)

There needs to be a hardcoded security layer preventing any breaches that are not on a game/cheating level but are really security. E.g. a client must make sure it can not be forced to delete files or to allocate too much memory.

### Custom Properties

As we add plugin capabilities we should also allow JS to define custom properties that are stored in inexor and efficiently synced but only used by the JS code.

### 9P

We should also implement a 9P server for the Tree. Just because it's awesome!

### Structure

This is an outline of what the structure of the filesystem will look like; it's a high level overview seen by Node.js serving a specific inexor player; the parameters mentioned are not necessarily backed by Inexor and they are not necessarily synced. **TODO: IMPROVE**

```
# The basic tree
struct Root
  Set<Peer>  peers/                     # List of peers sharing the tree
  Log<Diff>  history/                   # List of past changes to the tree
  Set<Game>  games/                     # There may be multiple games going on at the sam etime
  Link       games/current/ -> /games/* # For Player Peers the game that is displayed on screen
  Player     player/                    # For Player Peers the own player
  Set<Previewable> maps/                # Set of known maps to the current client
  Set<Previewable> playermodels/
  Settings  settings/

struct Diff
  Link      element -> *       # What was changed?
  Link      author -> /peers/* # Who did the change
  Set<Link> reasoning          # An optional set of reasons for this differential for consistency checking. E.g collision with a pistol ammo -> more pistol ammo
  ... # Structure specific diff

# A single game being played
struct Game
  Set<Player>      players/       # List of players playing this game
  Link             map -> /maps/* # The name of the map we're playing
  Link             players/me -> players/*
  File<Time>       eta            # How long this game will continue to runh
  File<Timestamp>  started_at
  Log<ChatMessage> chat

struct Player
  File<String>  name
  Link          playermodel -> /playermodels/*
  File<Int>     stats/ammo/pistol
  File<Int>     stats/ammo/...
  File<Int>     stats/health/max
  File<Int>     stats/health/current
  File<Int>     stats/armour/max
  File<Int>     stats/armour/current
  Position      position

struct Position
  File<Float> x
  File<Float> y
  File<Float> z
  File<Float> yaw
  File<Float> pitch
  File<Float> rool

struct Previewable
  File<String> name
  File<Image>  thumbnail

struct Settings
  ... # Pretty much most of the stuff accessible through the current settings page.
```

## Node.js Implementation

For now I suggest we create an implementation of a similar tree like the one above in Node.js based on the cubescript variables. The purpose of this is to quickly create and evaluate an API.
What excatly that tree will contain needs to be evaluated; specifically we should leave the entire syncing and differentials for now and just concentrate on creating a prototypical api.

This API can should then be exposed via a REST API and we should create bindings for Angular so we can actually use it in the GUI.

The api to declare the tree should look somewhat like this:

```
class Node
  # pass

class Directory
  ls: -> # Promise<Array<String>> Returns a list of the names of nodes inside this Directory
  resolve: (path) -> # Path -> Promise<Node> – Get a node relative to this one

class File extends Node
  [[abstract]] read: -> # Promise<...> – Get the contents of a file
  [[abstract]] write: -> # Promise<> – Write to the file. Promise is used for exception handling.

class Link extends Node
  read: -> # Promise<...> – Get the contents of a referenced file
  write: -> # Promise<> – Write to the referenced file. Promise is used for exception handling.
  resolve: (path) -> # Path -> Promise<Node> – Resolve relative to the referenced file
  [[abstract]] writePath: -> # Promise<Path> – Get path of this link
  [[abstract]] readPath: (path) -> # Promise<> – Set the path of this link

class Set extends Directory
  add: (payload) -> # Promise<> - Add an element to the set. 
  [[abstract]] add: (uuid, payload) -> # Promise<> – Add an element to the set with specific
  [[abstract]] ls: -> # ...
  [[abstract]] fopen: (uuid) -> # Promise<Node> – Open the specific Node referenced by the UUID

class Log extends Directory
  add: (payload) -> # Promise<>
  add: (uuid, payload) -> # Promise<>
  [[abstract]] add: (timestamp, uuid, payload) -> # Promise<>
  [[abstract]] ls: -> # ...
  [[abstract]] fopen: (uuid) -> # Promise<Node> 
```

And here is roughly how we should implement this: **TODO: Finish**

```
class PlayersDir

class InexorGameDir extends Directory
  constructor:
    super
      players

InexorFS = new Directory
  # Emulating the set here so we can stick to this API later
  games: new Directory
    current: new InexorGameDir
```

## C++ Implementation

This tree also needs to be implemented in C++; here are the implementation steps how I imagine them (prone to change).
(I know that most of the pseudocode below will not compile; I just hope it serves to illustrate the Idea).

(1) in order to do this we can build on the already existing `SharedVar<typename T>` and add a path parameter to I (somehow, I will have to figure that out). The basic features a SharedVar contais would then be (1) Observability (creating differentials) and (2) assignment of a path in the tree.

(2) In the next step we would need to build on that and add support for structures: Add a `SharableStructure` abstract base class; sharable structures inherit from that class and contain a buch of SharedVars; the shared vars are the variables of that structure that are actually synced between instances.
Now you can create a `SharedVar<MyStructure> foobar{ "/foo/bar", ... }` where MyStructure extends SharedStructure. SharedVar recognoces that MyStructure inherits from SharedStructure. Now, if MyStructure contains a sharedVar under `name/`, this could be accessed under `/foo/bar/name`.

(3) Now that we have the structures, we need the Log and the Set. `SharedSet<std::vector, int> my_number{ "/settings/my_number" }` would create a SharedSet containing lots of files with integer values backed by an std::vector. SharedSet/SharedLog would take anything SharedVar can take. We should also implement multiple bacing structures for performance (std::list, std::unordered_map, maybe boost::multimap for the SharedLog because it uses two keys, ...).

The last three steps, did not implement the protocol. In fact the only purpose this really served was annotating our code with the tree structure. Now comes the slightly harder part: We need to find some reflection data to extract the information we just annotated (https://github.com/AustinBrunkhorst/CPP-Reflection/) and then we need to parse (https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.compiler.parser) and update our protocol files to reflect the tree and we need generate glue code to generate protobuf diffs from our C++ differentials and apply them on the other side. (http://szelei.me/code-generator/, https://stackoverflow.com/questions/12111381/template-based-c-c-code-generation).
I know it sounds rather difficult but with the resources provided it should be doable.

In this process we need to be very careful in order to stay backwards compatible (particularly, the protocol files and possibly the reflection data should be stored on disk and manually checked in in order to ensure full control).

Finally, we also need to think about custom data structures that require custom diffs: We need to add support for them by allowing SharedStructures to implement special functions (diff, patch or so) that generate diffs with hand coded protocol files.

## Roadmap

* 0.1 First node.js tree
* 0.2 HTTP bindings and server for the node.js tree
* 0.3 Angular bindings for the node.js data
* 0.4 Moving the angular UI to using the tree data
* 0.5 Implement plain shared var syncing in C++
* 0.6 Implement shared structure syncing in C++
* 0.7 Implement SharedLog and SharedSet in C++
* 0.8 Remove the custom node.js tree and replace as much as possible with the C++ version
* 0.9 Deprecate Cubescript and the Cube UI
* 0.10 Reimplement the complete GUI 
* 1.0 remove Cubescript and the cube UI
* 2.0 Remove the old network code

