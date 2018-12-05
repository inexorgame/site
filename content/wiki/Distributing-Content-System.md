### Goals

The efforts to make content available faster and the fact that content gets updated means that we have to think about how to store and distribute content. The problem of store and distribute data is a typical problem, which isn't specific to our game. 


### Features

* Storing files
* Storing metadata
* Search in files and metadata
* It fits in our toolstack: JSON, C++, JavaScript
* Replication built in
* Interoperable & Extensible
 * Multiple language drivers (C++, Java, PHP, ...)
 * MongoDB is scriptable with JavaScript

### Dependency management for content

Content depends on other content. The goal is to reduce redundancy which makes the game more lightweight and faster: less hard drive space needed, decreased download duration and increased map loading times. Nowadays we can't deliver one single package anymore: it would be too big and we would dictate what content the player have to play. Instead the game should dynamically update the content dependent on the players needs. There's no need to deliver 80 ctf maps if the player only plays regen capture for example.

#### Dependencies

* Maps
 * Textures
 * Map models
 * Map sounds
 * Skyboxes

### External Resources

* http://docs.mongodb.org/manual/core/gridfs/
* http://java.dzone.com/articles/when-use-gridfs-mongodb

