Branches | Issues | Main developers
-------- | ------ | ---
[grpc](/inexorgame/code/tree/grpc) | ? | [@aschaeffer](/aschaeffer)

## How did the masterserver work in the past?

* The **masterserver** controls the listed servers.
* Each server registers itself to the masterserver.
* Each game client requests a server list from the masterserver.

## What are the problems with the original Sauerbraten masterserver?

* Single point of failure (centralized server list)!
* One person decides if a server is suitable or not!
* Proprietary data format!

## What we are about to change

* No single point of failure (decentralized server list).
* No centralized decisions about the "suitability" of servers.
 * Every server is welcome (including modified gameplay or altered user experiences)
 * Full transparency (highlighting modded servers).
 * Page-Rank like blacklist for malicious servers.
* Open data format
 * **JSON **can be read by machines and humans!
 * Available (REST API).
 * No specifid language required (use whatever programming language you want to).
 * Information can be used everywhere (other servers, other clients, websites, "cube-server-lister"-like software).
 * Extendibility and backwards compatibility.
  * The information format can be extended with additional information.

## Server Identity

* vendor (only alpha numeric, eg psl, dk, nl)
* serverid ("[vendor][number]", only alpha numeric, e.g. "psl4", "dk1", "nl4")
* ip
* port

## Server list storage

* Each server stores the list of other servers in it's own [[Inexor Tree]].
* Each client stores the list of (all) servers in it's own [[Inexor Tree]].

## Server list synchronization

### Between servers

* At server startup
  * chooses some known servers randomly and fetches the server list -> the own server list is updated now.
  * then push information about itself to the known servers -> the remote server lists are updated now.
* At server shutdown
  * The list of servers is written down locally, we need to know the list of servers during the next server startup.
* During runtime
  * Regularly, each server pushes information about itself to the known servers (once per hour?).
  * If a server can't push information to a remote server multiple times, the remote server gets removed from the own server list.
* Security
  * For security reasons, a server accepts changes from a remote server only if the **sender IP matches the IP in the data package**.
  * Blacklist
    * Malicious servers are blacklisted locally and changes from a remote server aren't accepted anymore.
    * If a remote server wants to push a change, the local server can check the malicious state on other remote servers.
    * Therefore the propagation about this server is stopped.
  * Whitelist
    * Servers can also whitelist remote servers which means they trust another known server.
    * Incoming changes from a whitelisted remote server are always accepted, even when other remote servers are blacklisting the remove server.

### Between server and client

* The client fetches the server list from randomly choosen servers using the Inexor Tree REST API.
* As soon as a server is known by the client, it can directly fetch information from the known server.
* Security
 * Clients can blacklist and whitelist servers locally.
 * Clients can check if a server is blacklisted or whitelisted by multiple remote servers.

## Server capabilities

* Game server provides information about his capabilities.
* Once a client knows about a game server it can ask it for it's capabilities.
* The list of capabilities is extensible (just extend the Inexor Tree with additional nodes).

Typical capabilities are:

* available game modes
* enabled game modes
* maximum number of players
* plugin extensions

## Inexor Tree

    /
      /server
        /serverid
      /servers
        /[serverid|self]
          /ip
          /port
          /vendor
          /serverid
          /title
          /description
          /modded
          /moddingdescription
          /started
          /maxslots
          /categories
          /motd
          /blacklisted
          /whitelisted

## Why not ENet?

ENet is fine for transferring the game data like position changes and other game events. Also, ENet is fast and has a low latency. But for some use cases it isn't necessary to have a low latency and enet makes things more complicated.

Server list propagation ("Masterserver") and server capabilities ("extinfo") are available globally and can be integrated in 3rd party apps (e.g. a homepage) easily.

## Solution
An accepted solution is proposed on this https://github.com/inexorgame/code/wiki/Self-regulating-distributed-network article

