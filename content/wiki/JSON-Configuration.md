This page goes into details about our planned move from `.cfg`s to `.json`s.

## How was the configuration done in the past?

* CubeScript is used for settings and content configuration
  * some variables are persistent (and saved after a clean shutdown)
* content is loaded into the game through CubeScript commands
* `.cfg` files are a list of such commands which get executed

## Which problems did the old system have?

* On crash persistent vars won't get saved
* Content configuration files are invalid for distribution
  * since they get executed and hence are insecure
* CubeScript in general is not popular and not overly intuitive

## What will change?

* We replace CubeScript with node.js scripting
  * and have a nice [[Inexor Tree]] for interactions
* We can load and save parts of this tree from/to JSON
  * Persistent settings get saved on [Inexor-Flex](https://github.com/inexorgame/code/wiki/Overall-Architecture) side
* Content generally has JSON configuration files

## Benefits

* Static Data can be treated statically
  * and won't get executed (only modified)
  * JSON files are save to transmit to other people
  * Content distribution becomes permitted
* User settings always get saved
  * Even when the [Inexor-Kernel](https://github.com/inexorgame/code/wiki/Overall-Architecture) (C++-App) crashes


# Implementation

While in Javascript JSON is supported by design, we use on C++ side the library http://rapidjson.org/ to handle our JSON files.