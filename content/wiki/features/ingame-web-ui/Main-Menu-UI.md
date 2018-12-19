Main project page: https://github.com/inexorgame/inexor-core/wiki/User-Interfaces  
The main menu provides the means to navigate the core contents of the game.

<!-- TOC -->

- [Main pages](#main-pages)
- [Content components](#content-components)
- [Further planning](#further-planning)
- [Key indicators](#key-indicators)
    - [First impression](#first-impression)
    - [Involving users](#involving-users)
- [Design](#design)
    - [Examples](#examples)
- [Pages](#pages)
    - [Splash screen](#splash-screen)
    - [Main Menu/Navigation](#main-menunavigation)
        - [Context awareness](#context-awareness)
        - [Dedicated Areas](#dedicated-areas)
        - [Website-like](#website-like)
        - [Context awareness](#context-awareness-1)
    - [Server browser](#server-browser)
    - [Settings](#settings)
        - [Video](#video)
    - [Profile/Account](#profileaccount)
    - [Community](#community)
    - [Own content (Recently created/worked on)](#own-content-recently-createdworked-on)

<!-- /TOC -->

## Main pages

* Splash screen
* Server browser
* Settings
* Profile/Account
* Community
* Own content (Recently created/worked on)

## Content components

Contents can be re-used across all menus. The display of a map can be used when managing published contents, but also when displaying a server browser.

All content types (or components) have different views depending on the context.
In a context menu or dropdown, you may only need the map name, and not the entire picture, description, author etc.

![](https://i.imgur.com/0ygVlGR.png)

Below is a list of content types and their properties and how they are linked together.

## Further planning

See issue: https://github.com/inexorgame/inexor-core/issues/586  
Contains a roadmap and current tasks to push this project further.

## Key indicators

### First impression

Since this part of the game is accountable the first impression, it is very important to come to an agreement how the UI should look, feel and behave.

### Involving users

The ingame community plays a central role, when it comes to collaboration.
Community features are documented here: [[Game-Community]]
Further implementation details how this is reflected in the menus, can be found further down in [[Main-Menu-UI#community]]

## Design

> In order to be unique, another FPS in gray and black is not what we are aiming for. But the opposite: it should be colorful and weird.  
> From [[The-Main-Theme]]

We need to find a mix of offering the colorful weird UI we are looking for, but still allow for easy navigation.
A good next step is to compare to other splash screens/main menus of other games that offer a similar experience what we aim for.

### Examples

## Pages

This section defines what content is found on the individual pages and what its purpose is. We also define how they are interlinked with each other.

### Splash screen

A short animation to introduce game logo, name, maybe even running version.
Can also contain a background video of the different mechanisms of the game to give a better insight what the player is getting into.

![](https://i.imgur.com/BxgKaEW.png)

The splash screen doesn't necessarily need a play button and could seamlessly fade into the main menu.

### Main Menu/Navigation

The main menu should offer a meaningful navigation towards the most relevant content for the user. While Content can be ordered by priority, most games fall into a cliche when it comes to organizing menu items:

* singleplayer
* multiplayer
* settings
* exit

But we have a lot more items to fit and to prioritize.

#### Context awareness

To reflect the requirements outlined in [#520](https://github.com/inexorgame/inexor-core/issues/520), the main menu should be aware of the players context. This can be expressed in various ways.

The background can indicate different states during the game.

**Gamestart and outside server:** slightly blurry video of a camera pan on a map.  
**On a server:** with faded out background, so you can still see what is happening in the background.  
**Singleplayer:** Current map as background or something that indicates that the game is paused.  

While during gamestart, we could only show the main menu items, during gameplay, we could display gamemode-related content.

**Editing:** Show buttons to the different map settings UIs  


We need to decide, whether or not we provide a main menu to navigate the other pages, or if the navigation is always visible. Different layout concepts are outlined below.

#### Dedicated Areas

Similar to Assassins Creed, menu items are layed out to be reachable via arrow keys/joystick (up/down/left/right) and each page has its own dedicated screen, removing all the other navigation items.
![](https://i.imgur.com/mQqPYVr.jpg)
See Video: https://www.youtube.com/watch?v=iacnap9ph9g

This makes a great navigation for games that rely on other input methods than keyboard and mouse. E.g. Gamepad.
For a limited set of options, this may make sense.

In the sketch below, every section gets its preview of subsections.  
E.g. recently played servers in Multiplayer, or if not yet played, a few recommendations.  
Or recently created Community content and a button to explore more.  
Or for singleplayer, the latest savegame or next mission/tutorial to play.  

![](https://i.imgur.com/iSMrVnD.png)

This also has a few disadvantages. Users do not know whether or not they can click on the heading of each card, or if this is everything, this might be counter-intuitive especially for the settings section. Which multiplayer for instance includes a "browse all servers" button.

#### Website-like

Having the different tabs/pages always visible for navigation, can help in finding relevant menus quicker.

#### Context awareness

To reflect the requirements outlined in [#520](https://github.com/inexorgame/inexor-core/issues/520), the main menu should be aware of the players context. This can be expressed in various ways.

The background can indicate different states during the game.

**Gamestart and outside server:** slightly blurry video of a camera pan on a map.  
**On a server:** with faded out background, so you can still see what is happening in the background.  
**Singleplayer:** Current map as background or something that indicates that the game is paused.  

While during gamestart, we could only show the main menu items, during gameplay, we could display gamemode-related content.

**Editing:** Show buttons to the different map settings UIs  

### Server browser

Finding, filtering, sorting and joining servers.
Hosting servers.
We need to prioritize which server properties to display:

* Servername
* ServerIP/Domain
* Players
* MaxPlayers
* Current Map
* Mode (In Sauerbraten, there is public, protected, private and auth)
* N Friends playing here
* Is clan server
* Is favorite
* List Players

These are all properties that can be used together with filters, sorting options or even a full-text search.  
There are many ways to interact with a server:

* Join server
* List players
* Mark server as favorite

Below is an early draft of how the server browser may look like.

![](https://i.imgur.com/UPEs6v0.png)

### Settings

Settings for the game can have many levels of complexity, since everything is a variable.

* General
  * Video
    * Rendering
    * Resolution
    * FOV
    * Performance filter
      * Particles
      * Lights
      * Glass
      * Models
  * Audio
    * Master
    * Map-Sounds
    * Player-Sounds
      * Footsteps
      * Jumps
      * Weapon
    * Music
  * Mouse
    * Sensitivity
  * Keybindings
  * Communication (Console)
    * Console
      * Filter (Events)
      * Colors
      * History
    * Link to profile settings
* Editing
  * Edit HUD
    * Crosshair
* Fighting
  * Game-mode specific settings
    * FOV, Crosshair, Zen-mode
  * Game HUD
    * Settings for widgets
      * Display Time
      * Crosshair
      * Damage compass
      * HUD Gun
  * Teamchat
    * Shortcuts (Cover me, restore flag, etc)
  * Scoreboard


#### Video

Sauerbraten went as far as allowing users to define whether or not to use glare, or fullbright models.

I would simplify this a bit in terms of performance levels.
There are still some settings that players have a personal taste for. E.g. Motion blur or fadetime of dead bodies.

### Profile/Account

Users should be able to enjoy the contents of the game without needing an account. However, to better connect with the community, users can authenticate with Inexor or another Single Sign On Service of choice (Twitter, Github, Google).
There is an issue about authentication here: https://github.com/inexorgame/inexor-core/issues/459

*Subpages:*

* Registration
* Login
* Profile (Settings and Display)
  * Avatar
  * Name
  * Color (For Chat, Maptitle signature, etc)
  * Linked accounts (google, twitter, github) or Password
  * Communities (add clan tag to my name)
  * Friends

### Community

This is about exploring and creating communities (clans, groups) and contents of other people

### Own content (Recently created/worked on)

Show history of maps recently worked on, recently played on server
