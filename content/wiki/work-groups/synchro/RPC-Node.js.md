Branches | Issues | Main developers
-------- | ------ | ---
master, a_teammate/gluegen_cpp_api | [#51](/inexorgame/code/issues/51), [#311](/inexorgame/code/pull/311) | [@a_teammate](/a-teammate), [@aschaeffer](/aschaeffer)

### Glossary
Abbreviation | Full Term
-------------|---------
IPC  | [Inter-process communication](https://en.wikipedia.org/wiki/Inter-process_communication) is done when different Processes need to communicate
RPC  | [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) is a subtopic of IPC

## Architecture

Instead of integrating a JavaScript engine (like V8/Spidermonkey) directly into Inexor we chose the way of binding node.js (a standalone JS engine) via IPC.  
Choosing a multi-process design over a multi-threaded design gives us the following advantages

* we do not need to maintain the JS code
   * (as much)
   * no need to integrate newer v8-versions every now and then into Inexor
* node.js is completely independ
   * if your script crashes your app still lives and vice versa
   * less worrying, less maintainance
* node.js works asynchronously out of the box
   * no need to invent our own custom solutions
* node.js has tons of shipped packages in its package managers

The implementation therefore uses [gRPC](http://www.grpc.io/docs/) as underlying library, which is a language neutral framework with bindings in more than 10 languages (and its ecosystem is growing rapidly).  
**This means our API ([[Inexor Tree]]) can be used 1:1 for many different purposes**:

* Different (Scripting) languages simultaneously
   * People want python? Easy
* Generell Server/Client communication like a gameclient to gameserver
   * Thanks to the new API classes/variables/functions could be synced without manually writing network code
 

# Future Steps

* More efficient IPC methods
  * Currently we use TCP, unix-sockets/named-pipes would be more efficient (or shared_memory)
    * Lets see what gRPC comes up with next
* Make multi RPC connections really work (currently only one is supported)
* Extend the [[Inexor Tree]]
