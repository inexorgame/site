Branches | Issues | Main developers
--- | --- | --- 
[hanni/3DVisualScripting](/inexorgame/code/tree/hanni/3DVisualScripting) |  [#99](/inexorgame/code/issues/99), [#111](/inexorgame/code/issues/111) | [@IAmNotHanni](/IAmNotHanni)

# Introduction
This article was written for readers without any previous knowledge. It's objective is to introduce you to some important concepts of scripting languages and visual scripting. This lays the foundation for the understanding of Inexor's [visual scripting engine](https://github.com/inexorgame/inexor-core/wiki/%5BIntent%5D-Introduction).

## What is a script?
Scripts allow you to write or change your program without having to re[compile](https://en.wikipedia.org/wiki/Compiler) the source code into a new executable file (like an .exe file). As instead, scripts are run by an [interpreter](https://en.wikipedia.org/wiki/Interpreter_(computing)). The executable file which contains this interpreter to make the script work is often referred as [runtime enviroment](https://en.wikipedia.org/wiki/Runtime_system). Once your runtime enviroment is set up and running you usually focus on writing scripts. Script code can be changed after the program in which the interpreter is embedded has been compiled. Script code can even be changed while the program is running. Changing the source code of your runtime enviroment and recompiling it should only be done when neccesary. The development of the scripting language and it's interpreter is usually not your job and is carried out by professionaly for you.

[Scripting languages](https://en.wikipedia.org/wiki/Scripting_language) are usually easier to understand and faster to learn than high level programming languages like C++. One of the most popular scripting languages is [JavaScript](https://en.wikipedia.org/wiki/JavaScript), which runs in your browser while you are reading this. It was JavaScript which made the development of modern websites possible and every popular website uses it today. JavaScript quickly gained popularity for other uses due to the development of [NodeJS](https://nodejs.org/en/). NodeJS had a big impact on developers because it makes it possible to use JavaScript to write desktop applications! NodeJS runs on [Google's V8 engine](https://developers.google.com/v8/) which powers Google Chrome. Since [NodeJS](https://nodejs.org/en/) is integrated into Inexor we have the full power of Javascript available for us. For further information read about [[Inexor-Flex]].

## How are scripts being used in games?
The big part of every modern game is created with scripts nowadays. **One of many benefits is that the development of the game is separated from the development of the game engine!** People who want to make games no longer have to deal with the technical part of programming. They just use the tools which have been created by the game engine developers to realize their projects.

![error: image not found!](https://raw.githubusercontent.com/inexorgame/visualisations/a10c0c475f5b663e13fb39b5404ca174ad887b04/wiki/scripting_illustration.png)

Professional game developers of today would never [hardcode](https://en.wikipedia.org/wiki/Hard_coding) anything. This makes it difficult to make changes in the source code afterwards because you would have to reconsider your code and the way it is structured. The first thing which pops into your mind when thinking of scripts in games is probably the logic of the scene. [Use cases](https://en.wikipedia.org/wiki/Use_case) like: _What is supposed to happen if the player hits this red button?_  
But it is not just the gameplay logic which is determined by scripts. Surprisingly many components of modern games are being developed with scripts: physics, networking, user interfaces, pickups, artificial intelligence and many more.   

**Scripts are essential for dynamic gameplay designs of today!**

## What are the benefits?
As already mentioned Inexor uses JavaScript as scripting language by embedding NodeJS into the game. Here's a list of reasons why we do this:

#### simplicity
* Scripting languages are easier to learn and to understand than high level programming languages like C++.
* Writing scripts requires less technical knowledge about software engineering.

#### productivity
* You don't have to recompile your code into a new binary every time you've made a change.
* You can test your scripts in realtime because you don't have to restart your runtime enviroment.
* Important functions, events and variables are already put together for you by game engine developers in a so called **framework**. Those are the puzzle pieces you can put together to create your game.
* Since everything you need is in the **framework** you don't have to worry about [dependency management](https://en.wikipedia.org/wiki/Package_manager).

#### speed
* Modern interpreters feature high speed script execution which is close to compiled code.

#### security
* JavaScript code runs in a [sandbox](https://en.wikipedia.org/wiki/Sandbox_(computer_security)) which shields off your operating system.

#### portability
* Scripts run on every [platform](https://en.wikipedia.org/wiki/Computing_platform) (Windows, Linux, Mac..) on which the interpreter is available.
* If you've tested your script on your platform you can rest assured that it will work on all other platforms as well.
* There is no need to [port](https://en.wikipedia.org/wiki/Porting) your source code for a new platform.

#### multithreading
* Scripts can be started in separate [threads](https://en.wikipedia.org/wiki/Thread_(computing)) which helps to distribute processor and memory usage.

## Some JavaScript examples
Imagine you would like to add a button to your map that opens door 1 and plays a sound as soon as a player presses it. This could be done with the following script:

```
callback OnPlayerPressButton(player, button)
{
    OpenDoor(1);
    PlaySound('door_open');
}
```

Here's another example:
imagine an explosive barrel that blows up when you shoot it. The barrel also explodes when somebody pushes a button. It could be done with the following script:

```
callback OnPlayerShootsBarrel(player, barrel)
{
    CreateExplosion();
}

callback OnPlayerPressButton(player, button)
{
    CreateExplosion();
}
```

## Before we continue
You are now familiar with some basic concepts of scripting. All those concepts apply to the following passages as well. You should think of your own game scenarios which you would like to implement with scripting now. Please watch some videos about JavaScript to get a better idea of what all this is about:

[![error: image not found](https://img.youtube.com/vi/vEROU2XtPR8/0.jpg)](https://www.youtube.com/watch?v=vEROU2XtPR8)

# Visual Scripting
Visual scripting takes all this to the next level. Every script code can be expressed as a [graph](https://en.wikipedia.org/wiki/Graph_theory)!
Instead of writing your script code in a text editor, you just playfully put together specific **relations** between certain **nodes** to a **graph**.

**It is the types of nodes and their relations with each others that represent a script code.**

This may sound complicated to you but it's really nothing but putting together stuff with arrows. To illustrate this, the first code example from above can be rewritten as the following corresponding **visual script**:

![error: image not found!](https://raw.githubusercontent.com/inexorgame/visualisations/aa4aa88812784dbb473c2e16c75a4e3d39c187ec/wiki/vs_graph_example_1.png)

What you may noticed already:
* An event node (here OnPlayerPressButton) starts code execution.
* The direction of execution is indicated by the arrows (= **relations**) which are green.
* The red arrows show which parameters are used.

Here is the visual script for the second example:

![error: image not found!](https://raw.githubusercontent.com/inexorgame/visualisations/4ce7e69803cbc25eb95a41ffaf1f22f1143f887e/wiki/vs_graph_example_2.png)

Two event emitter nodes will cause the same function call. This visual script represents the idea that both shooting the barrel and pressing the button will cause the explosion.

## What are the benefits of visual scripting?

#### It makes everything even more simple
* **You don't have to learn a programming language anymore to create game logic!**
* Big chunks of script code can be visualized clearly.
* Visual scripts can be converted into script files. This is much more difficult to do the other way!
* Interpreting visual scripts is much easier since it's a representation of the interpreter's data model.
* Complex code components can be illustrated easily.
* Since you connect nodes with your mouse there is less typing required.
* Sorting and grouping nodes helps illustrating code parts.
* Complex code parts which are not relevant for you are hidden.

#### Syntax error prevention
The visual scripting system exactly controls how nodes are linked together. [Syntax errors](https://en.wikipedia.org/wiki/Syntax_error) like in the following example are not possible in a graph representation of script code:

```
callback OnPlayerPressButton player) // syntax error: forgot (
{
    // Heal the player as soon as he presses the button
    RestorePlayerHealth(player);
}
```

> **Logic errors** however are still possible. Neither a compiler nor an interpreter can discuss the logic of your code. If your intention is to kill the player as soon as he hits the button although you intended to heal him that's an example of a logic mistake!

## Do other game engines use visual scripting?

Every modern game engine has a visual scripting enviroment. 
* [Unreal Engine 4 ](https://www.unrealengine.com/en-US/blog) for example has a system called [Blueprint](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/) (formerly called Kismet).
* [CryEngine](http://crytek.com/) has a visual scripting enviroment called [Flowgraph](https://www.cryengine.com/features/sandbox-tools#features/flowgraph).
* [Blender](https://www.blender.org/) has a built in visual scripting enviroment called Blender Game Engine.
* [Unity](https://unity3d.com/de/) has a visual scripting editor available in the assets store.
* [Godot Engine](https://godotengine.org)

# Visual Scripting in 3D!
Now that we have discussed visual scripting in 2 dimensions, lets go one step further. All those programming concepts can be applied in 3 dimensions as well! 
In most visual scripting systems the **graph** is edited in a planar 2D window that is separated from the game world. 
* Inexor disagrees with this concept and lets you place you nodes directly into the map!
* It is intuitive to place script code (= **nodes** and **relations**) at the place where it affects the game world!
* **The map itself is our visual scripting enviroment!**

## Implementing a 3D visual scripting enviroment

![error: image not found!](https://raw.githubusercontent.com/inexorgame/artwork/master/intent/Intent_rendered_512px.png)

see: [[INTENT 3D Visual Scripting System]]