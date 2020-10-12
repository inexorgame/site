---
layout: feature
status: concept # idea | concept | specification | implemented
authors: Fohlen
---

# Distributed community content

The following is a draft of how distributed community content could work.

First of I'll start with some definitions:

- metadata: information such as e.g frags or the creator of a texture
- content: the actual content, e.g audio files, in binary format
- server: something a player can retrieve both metadata and content from
- client: consumes metadata and content
- network: all the nodes participating 
- node: either server or a client
- authentication providers: servers that let a user verify its identity on a node (e.g local or remote)
- popularity factor: an arbitrary parameter that decides how metadata is spread in the network

## The network architecture

In a distributed network, there have to be essentially some seed nodes. Every new node that joins the network asks these seed nodes about other existing nodes. Already existing nodes tell the seed nodes about their existence.

Using this method, nodes that have previously been on the network have a much larger list of seed nodes to contact. This essentially makes up the __network__.

Seed nodes are usually __servers__ and __authentication providers__. The Inexor team needs to first provide a few seed nodes in order for a network to build, and these are _hard-coded_.

### Distributing metadata over the network

Ideally, all the content in the network is available on all __nodes__ at all times. Since this is impractical (consuming a lot of resources), a modest trade-off is that the most _in-demand_ content is available at places _where_ it is needed.

Since those factors, "in demand" as well as "where" are quite arbitrary, we use the _popularity factor_ to determine which metadata will be distributed over the network.

#### Popularity factor

Every _node_ has their own popularity factor. This can be an arbitrary list of values, of which a collection of values is set as default for new nodes, but can be modified by the operator of the node.

An example for such a list would be:

- how often is the content played
- how many people play on the _game server_ in average
- when was the content published
- how many storage do I have available for sharing?
- how often would I like to propagate new metadata from the network (e.g every 5 minutes)
- (...)

Based on these parameters every node decides for themselves:

- how much metadata is stored
- how often the metadata is updated
- which specific kind of metadata is stored

This is particully usefull for specific servers, such as e.g coop servers, which do not want to store racing or competetive content (no point in updating stats every minute).

### Distributing the content

Now that we have the metadata settled, let's consider how the network would look like:

- new players would contact the seed nodes
- get a list of existing nodes (e.g other servers)
- download metadata about newest maps for e.g racing

But this doesn't solve the problem of storing actual content.

The technical solution to this is quite straighforward: the metadata contains a hyperlink and a checksum to tell the node where to find the content.

It is up to the __servers__ in the network to download the content and make it available. This can be done in exactly the same fashion as for the metadata, using the __popularity factor__.

### All about authentication

In the network introduced thus far, one cannot authenticate themselves. My suggestion is to use [SASL](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer) with HTTPS. The authentication would work like this:

- _node_ A requests authentication for _node_ B from _node_ C
- _node_ B is redirected for log in to _node_ C
- _node_ C asks for authentication from _node_ B
- _node_ B authenticates
- _node_ C verifies _node_ A that _node_ B is _B@C_

(note: in this example A is a server, B is a client, and C is an __authentication provider__, where A and C could be identical)

This allows for secure authentication using widely adopted standards (SASL, SSL) where implementations exist. The SSL certificates in place should come from Let's Encrypt.

### Scenario: user uploads a map

Ok, quite a lot of theory, but how would that look like on a practical example:

- A opens his game
- A contacts the seed nodes and gets a list of other existing nodes
- A asks all nodes he knows about metadata based on his popularity factors
- Since A is a client and does not share any metadata, there is no more interaction with the network
- Now, ideally, A has a list of servers and current content
- A decides to go into coop on server B
- A makes a map on server B and would like to share it
- A logs into server B and is now logged in as A@B (e.g fohlen@inexor.org)
- A tells B that he wants the current map to be uploaded
- B creates metadata
- More people use the map created by A
- It gets spread from server B to more servers
- Hooray"

The scenario for servers is similliar, however not identical:

- A hosts a server
- If A wants to offer authentication he also needs an SSL certificate
    - gets a valid FQDN
    - gets a SSL certificate
- A starts a server
    - server contacts seed nodes telling them that they want to be part of the network
    - fetches list of other servers
    - from all servers fetches metadata _and_ content based on popularity factors
- A can now use the server
- A connects with a client to another server B and authenticates as A@A
- A uses a texture of his own _server_ on B by using texture@A

#### Drawbacks to this approach

This approach also has some drawbacks:

- even though there are some libraries like libp2p, until everything is set up properly, its still an experiment
- requiring SSL from every __authentication provider__ is a bit of a setup burden
    - but makes the whole network much more secure
- propagating content may take a while
    - everyone has different settings what they want to download and what they want to share
    - "unpopular" content may not at all be distributed in the network
    - however it is still available at the server holding the content = good enough balance
    - for e.g coop servers would need different settings so new content is propagated faster, but should be doable
- maintaining the network is virtually impossible
    - we control the seed nodes but everything beyond that we cannot control
    - we have to trust our users not to put illegal stuff in the network
    - write legal terms that specify explicitely that we do not guarantee for the content in the network

