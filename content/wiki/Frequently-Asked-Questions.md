## Who are you?

We're **currently** mostly people from the old Sauerbraten community. We are a group of programmers, mappers, artists..

Yes, you are of course also welcome if you are not!
The really only important part is: be willing to learn. That's it. We all started somewhere some-when.

## Why did you fork?

For over one decade now the Sauerbraten community has seen astonishing projects trying to extract the maximum out of Sauerbraten. The amount and variety of the ideas the community came up with is impressive.
However the Sauerbraten project is regarded (by its very small circle of private developers) to better remain as stable as possible.
The [bus factor](https://en.wikipedia.org/wiki/Bus_factor) was just not high enough to keep on going for them after the lead developer hasn't had enough time for the project anymore.

## Why didn't you start with another engine?

We do not want to remain in the state of creating an engine, without providing the Sauerbraten people with something they can play.
Hence its an iterative process to get the fundamental changes and renewals _ready enough_, adding features and still keep a playable state.

## Will Inexor stay compatible with Cube2:Sauerbraten?

No. In the old days people came up with their own mods which were still compatible with the vanilla Cube2: Sauerbraten.  
But it has been exactly that wish for compatibility to Cube2 which obligated mod developers to stay within the old boundaries of the cube engine technologies.  
In order to make a new game we need to break up the old ties. This is a fork, not a mod!


## Is maintaining as little as possible a key reason for most questions here?
Yes.

While its true that "I can code you that in a few lines" sometimes works, most of the times it gives no benefit:

1. two weeks later you need a similar function: you write that one, too. This adds up, sooner or later its not as specific as before.

2. You need to document it, you need to communicate it with your other developers. This is more time intense than including an optimized third party-library.

3. **There will be bugs.** There are always bugs, of course. But you will be the only user and hence the only one troubled with those bugs (and the only one fixing those).

4. There are always people smarter than you (or more knowledgeable in the specific problem domain). As there are always people less smart as you.

Select your third party-libraries wisely, but most of the time using something other people spend passion in is better than using the thing you wrote in 20 lines and 20 minutes.

## Why do you drop Cubescript?

There is no pure-data format in Sauerbraten.

However if you want to share content with others you'll run into one big problem:  
You should not trust the source you got the content from.

As any content in Sauerbraten is configured in a custom scripting language called Cubescript you are asking for trouble as soon as you expose that.

It is problematic in another way:
As its a custom language with the only user being us it will be hard to maintain:
the parsers and compilers won't be nearly as optimized (/fast) as e.g. LuaJit or V8 (the JavaScript-engine in Chrome and node.js), the Core Language API will be not documented, less bug free.. (See the question `Is maintaining as little as possible a key reason for most questions here?` above)

## Why an HTML based GUI?

The UI is one of the parts users really need. Whatever functionality you want to provide in the interface, it should be easy to do.
We want to write as little UI code as possible, but it should be feature rich, intuitive and good looking.

These are problems already solved: Your web-browser does exactly.  
Additionally it adds possibilities for features you didn't even know about.

The consequence is that the Inexor UI uses Javascript and HTML.
It is nothing different than a browser in your game. In fact, we even use a version of the Chrome browser called [Chromium embedded framework](https://en.wikipedia.org/wiki/Chromium_Embedded_Framework) which is specifically tailored to be used in such scenarios.


## Why did you chose node.js as scripting environment?
#### Instead of Lua/Python/..?

This question comes up often in the IRC. Specifically people want to know why we want to move away from Cubescript and why not use some common gaming language like LUA.

The decision what scripting language to choose, was made because of a couple of factors:

1. Maintenance: We want to have to maintain as little code as possible ourselves.
2. Ecosystem around the language
     * documentations, tutorials..
     * a good library infrastructure is a must, see 1.
3. How well the language is known.

As we chose to build the UI in HTML (and JavaScript), another additional feature would be that it interacts cleanly with the UI.

Node.js is a fully featured, but extensible server framework (often used to provide a website on a server).
JS is extremely well known;

There is a very large base of libraries for both node.js and browser. In fact node.js allows us to easily write business grade applications from scratch in a fraction of the time as without using packages.

LUA would be problematic in terms of writing a GUI framework and a standard library ourselves:  
LUA is indeed well known, but our specific GUI libs and stdlibs would not be.

Python or Ruby (or Erlang or groovy ...) are certainly as excellent as node.js, but since we will be using JavaScript in the browser, better introduce just one language.

Node.js is a different process next to Inexor. As this introduces some complexities to the API we are working on hiding these from the regular developer through the [[Inexor Tree]].  
The web browser uses http to comunicate with node.js.

The distributed system also has some advantages:

1. Node.js can very easily be replaced by other languages
2. It is much easier to implement in C++  (provided we don't want to implement standard libraries for those languages ourselves)
3. The protocols designed in this process can replace enet in the future
4. Since the GUI is simply web, we get a web GUI for servers and for clients for free. You can open it in a browser.

See also [[Overall Architecture]] [[HTML5 User Interface]] and [[RPC Node.js]].
