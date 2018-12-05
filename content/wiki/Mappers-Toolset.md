Branches | Issues | Main developers
-------- | ------ | ---
_none_ | [#299](/inexorgame/code/issues/299) | [@MartinMuzatko](/MartinMuzatko)

**Depends on:** [CEF](HTML5 User Interface)

**State of Doc:** Work in Progress


## User Story
As a professional mapper, you have to configure a lot of aspects to have a toolset you can work with. Especially if you are new to this kind of game, it is very difficult to find out how to edit. The Motivation of this feature is, to have some onboarding - making it possible to guide a user through the steps that are required to get in control of the cube.

### Movement / Navigation
* Floatspeed Changer

![](http://i.imgur.com/4du3Ztw.png)

* Information at your Fingertips

![](http://i.imgur.com/ld7Eucb.png)

Implementing this, requires better configuration of the key bindings.
Depending on how you plan to implement several configurations (javascript?) this has to be configured.
The CFE Platform can be used to display the Mappers HUD, which can include the information above:
floatspeed, world size and other essential helpers/information like texture etc, but this could be part of the editing modes (display HUD depending on the edit mode)

### Editing Modes

At the core, editing specific parts of a map can be divided into these aspects or tasks:

* Cubes, Octree, Layout, Details
* Textures
* Lights, Environment (Skybox, Fog, Skylight)
* Blendpaint
* heightmap
* Entity tuning

Inspired by Garry's mod, I had always the idea of having an editors toolbar, where you can switch between the different modes or tools

![](http://i.imgur.com/b85gjcV.png)

`/blendpaintmode` or `/hmapedit` do nothing more than disabling other behavior of scroll (DeltaDoModifier).
The idea is to move away from GUIs and move the information and modes perhaps even tools to the HUD to create something like an inventory. Where editing Cubes is the main and default tool.

### Contextsensitive Options

Modern GUIs are context sensitive. How? If you are in spectator mode, you are not shown any editing GUI, if you are not master of the server, you do not need to see buttons for master commands like spectate/unspectate.

With these tools, if you are in a certain mode, you can focus on the task at hand and have all information available that you require for that specific task.

* Cubes, Octree, Layout, Details
* Textures
* Lights, Environment (Skybox, Fog, Skylight)
* Blendpaint
* heightmap
* Entity tuning

## Benefits

 * No more command remembering
 * Better Newbie onboarding 
 * Easier to edit

## Implementation

This is a feature that will span across several aspects of Inexor. GUI, Command Pallette, Keybindings, etc...

More info coming soon

