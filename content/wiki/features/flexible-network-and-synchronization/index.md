---
layout: feature
status: idea # idea | concept | specification | implemented
authors: IAmNotHanni
---

## Design decisions

* Generic concept
* Intuitive for programmers, modders and server owners
* Extensible for modding, additional gamemode, 3rd party applications
* Central place where to store data
* Open

## Differences between Cubescript and Inexor Tree

### Cubescript

* Currently data and game state are spread all over the cube2 code base
* Some variables are accessible via cubescript
* The variables are located in a single flat namespace
   * The names of the variables must be unique
* You don't see all variables/functions available with their current values
   * The variables get replaced/functions get executed when parsing your cubescript
     * faster than always syncing all vars, but not fast enough: it's blocking and it's depended on the parser

### Inexor Tree

* The variables are organized hierarchical
  * All variables are located in a namespace
  * The names of the variables must be unique within a namespace only
  * or within a class (which gets treated as namespace)
* Complete Tree always available everywhere 
  * All its its variables and functions always get synced
  * Overhead when you change a var instead of when you parse the script.
    * Still faster since non-blocking
    * Trade of was made to allow a design where even Inexor gameservers and clients could communicate this way.

### Example: Difference to Sauerbraten

**Sauerbraten** would let you set an "intermission" script and it will execute it when intermission is started. (and thats probably one of <5 places where such stuff gets executed)

In **Inexor** everything is stored in the InexorTree. One would attach in InexorFlex a listener on the /game/is_intermission variable which gets executed as soon as that variable changed. No waiting time for the script in InexorCore hence.

## Accessing the Inexor Tree
### C++
[[Inexor Tree C++-API]]

### NodeJS

Just use the globally available object `inexor.tree`.

    var node = inexor.tree.getNode("pathAsString");

The node can either contain child nodes _(container)_ or has a value _(leaf)_.

    var value = node.get();

Setting a value of a (leaf) node:

    node.set("newValue");

Getting the value of a leaf node using the object notation:

    var value = inexor.tree.path.to.the.node;

If the node is a container you get the node instead of the value:

    var node = inexor.tree.path.to.the;
    var value = node.getChild("node"); // inexor.tree.path.to.the.node

Setting the value of a (leaf) node using the object notation:

    inexor.tree.path.to.the.node = "newValue";

    var node = inexor.tree.path.to.the;
    node.node = "newValue";

Add a child node of datatype string:

    var node = inexor.tree.path.to.the;
    var childNode = node.addChild("testNode", "string", "initialValue");

Add a child node which is a container itself:

    var node = inexor.tree.path.to.the;
    var childNode = node.addChild("testNode", "object");
    var childChildNode = childNode.addChild("testNode", "int64", 42);

### REST API

The REST API is available on the [[Inexor Client]] and on the [[Inexor Server]]. Additionally, parts of the REST API of the [[Inexor Server]] is public available.

| HTTP Method   | URL                                          | Description   | Result         |
| ------------- | -------------------------------------------- | ------------- | -------------- |
| GET           | http://localhost:31416/tree/path/to/the/node | Returns the value of a single node, if the node is a leaf (no childs) | value          |
| GET           | http://localhost:31416/tree/path/to          | Returns the subtree as JSON, if the node has childs | `{ the: { node: 'value' } }` |
| POST          | http://localhost:31416/tree/path/to/the/node | Changes the value of a node | - |
| DELETE        | http://localhost:31416/tree/path/to/the/node | Deletes the node              | - |



### C++ Implementation

We use [GRPC](http://www.grpc.io/) as our communication system between InexorCore and all InexorFlex instances (possibly in different languages).  
The protocol is hence in a language independent file defined.  
This RpcTreeData.proto exists in two version at the moment, one for each tree: gameserver and gameclient have a different set of variables and consequently different trees and different protocols. This behavior will change in future versions (i.e. network modded servers communicating with modded clients is doable).  

The syncing happens by having a bidirectional streaming server on InexorCore side and equally clients on InexorFlex side.
So if you want to get support for another language to modify the tree, you'll simply grab the .proto and write the bidirectional streaming GRPC client (~50 lines) and voila: another language supported.


The gluecode generation takes our source code

### Step 1:
runs it through Doxygen to parse the code base (twice: once for the Inexor client, once for the Inexor gameserver target)  (We tried libClang before, but it was way too slow so we switched).  
This outputs an AST saved in xml.

### Step 2: 
Afterwards the "gluecodegenerator" tool (in `platform/tool/<OS>`/) gets invoked which searches the AST for SharedOption classes and SharedVars.  
This tool uses the template files inside inexor/rpc to generate the protobuf .proto file and a C++ file RpcContextandBinding.cpp (which contains code to get the synchronization going and couple the target specific tree with the implementation of a templated RpcServer).  
The template is written using Mustache (You have a template, you have some data, you render the template.. easy).


The SharedOption classes specify a specific behavior when they are added to SharedVars. Furthermore they can even add a specific behavior to all SharedVars they are not attached to.

Example: 
```cpp
class CustomPath : public SharedOption
{
public:
    // WARNING: either every or no arg can have a default value!!
    CustomPath(const char *path = "{{ns_path}}") {}

    const char *proto_template = "(path)=\"{{path}}\"";
    const char *cpp_init_check_template = "registerallpaths();";
    const char *cpp_receive_template = "if(strlen(receivedvalue.getOption(\"path\"))> 250) return;";
    const char *cpp_send_template = "";
};
```
The trick here is that we have multiple steps of rendering the template:
The variable name of the previous stage can be used in the template of the next.

Firstly we use the constructors default arguments (`= "{{ns_path}}"`) as the behavior when the SharedOption `CustomPath` is not attached to a SharedVar.
Therefore we got some data from the AST

TODO LIST HERE

This is available for the constructor args.  
The second stage is rendering all `const char *`-members of the class. Here we got the Data from the AST + the Constructor args available.  
The third and final stage is using those members + the constructor args data + the AST data to generate the final RpcTreeData.proto and RpcContextandBinding.cpp file.

### Step 3:

Protoc gets executed (usual Protobuf/gRPC procedure) to convert the language neutral .proto to something usable in C++ (the RPC service definition we use to get the RPC rolling and the Data Structures we send over the network).


