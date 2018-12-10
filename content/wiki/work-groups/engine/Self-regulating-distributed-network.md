## Server list protocol - why a distributed network

In the past there's been multiple attempts (such as DDos) in Sauerbraten to bring down centralized authorities, which lead's us to design our network differently.
The main goals are:

- Maintain as less as possible
- Decentral, wherever possible
- Security (in terms of, prevent bot networks)

### Design ideas

There have been two general design ideas in the community, which I will briefly introduce:

#### CDN-based strategy
A server list could be distributed via cloud infrastructure (API) that will itself deliver the results via a CDN.
Networks such as CloudFlare, AWS or GitHub could be used here, which are known to very little uptime concerns.

- this however is proprietary

#### decentralized network
A decentralized network, in which each server represents a node, that distributes it's current server list to other nodes, consequently synchronizing new servers into the network.

- will only require very few servers (entry points)
- are easy to attack and take over entirely

## Self-regulating network

The ideas introduced earlier still bring problems in terms of security, and sometimes conflict with our ideals (proprietary).
This is why we'd like to introduce self-regulating networks for Inexor.

### The concept

In a decentralized network, each node represents a Tree instance.
There are 2 types of nodes, offline (usually players), and online nodes (servers).
Each server instance (online) holds an entity (server list), which it will distribute across existing nodes (entry points).

### Rating
For defined actions, there will be a karma system, providing rating to the network.
Each unique node (UUID) will have a karma on other nodes, which can be used to determine the trustness level of a node.

An example could look like:

- Player AA connects to server BB. This works fine, there have been no portscans or any abnormal behavoir, which is why AA will grant +1 karma to BB
- Server BB kicks AA. The server will give -3 karma rating, because of teamkilling kick. AA however will as well give BB -2 karma, because it has been kicked.

=> AA will list BB internally as red (negative)

=> BB will list AA netagively (online), so other servers can know about AA as a teamkiller

###### Customizing
Each node can of course decide to rank actions differently, or to prefer certain nodes.

### Server list increments

However there is still an issue with bot networking and the server list, which is why the server list will be versioned.

=> This means, that every online node will hold a history of server list records (GIT)

=> A graphical editor can be used to track changes in the network history

=> Malicious nodes can be easily identified

### Signed history commits
Since it is still possible to undertake such a network with a huge range of nodes, we will provide an additional security measurement: signed history.

The Inexor team will issue a GPG key, which then can be used to sign certain commits in the network history.

=> The latest signed commit will always be treated as most trustworthy

=> We can issue a rollback signal, which will tell the network to roll back history until commit X

Since the key is both delivered with Inexor, and available on GitHub, it will be very difficult for possible attackers to capture the entire network, because it is possible to force a stable revision of the network.

##### Custom signing keys
Ofcourse every node can decide upon itself which keys he/she want's to trust, and could easily add/remove keys.

#### Signing content, a brief note
The same mechanism that will be used to verify server history, can in terms be used to verify "secure" content, and distribute it over network as well (mirror).
