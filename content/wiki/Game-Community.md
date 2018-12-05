This page tries to describe how we can make ingame communication work with users and how they can interact with each other. How they can create and share content and invite others to work with them.


<!-- TOC -->

- [Collaboration](#collaboration)
    - [Fast onboarding](#fast-onboarding)
    - [Publishing content](#publishing-content)
    - [Retrieving content](#retrieving-content)
- [Account / Profile](#account--profile)
    - [Public profile](#public-profile)
- [Clans](#clans)
    - [Creating a Clan](#creating-a-clan)
    - [Clan Content / Maps](#clan-content--maps)
- [Notifications](#notifications)
- [Personal Scoreboard](#personal-scoreboard)

<!-- /TOC -->

## Collaboration

This spans a lot more topics, as content creation and collaboration is a central topic for Inexor. Sauerbraten works in a somewhat peer-to-peer fashion, where maps are downloaded and shared ingame via edit mode.

### Fast onboarding

We want users to get into the game as quickly as possible, but still allow for elaborate user involvement.
Users can establish their place with the community. Allowing for easily sharing their contents, arranging games (duels, clan-fights, etc) or getting in touch with other players.

> Inexor will end up being kind of a sandbox, and in fact it is already. Users should be able to create their own themes and distribute them among their friends.  
> From [[The-Main-Theme]]

It is important to recite this here, to discuss the implementation details. At which points in the game can the user interact with the community? And how?

### Publishing content

It would be great to have a similar experience as Steam has with its workshop - where users can publish their own content, download others. This could work ingame as also as a website to see the content. This would allow us to offer something as [Quadropolis](http://quadropolis.us/) (which was the community hub of Sauerbraten) as our own service to our users.

What kind of content?

* Maps
* Textures
* Models
* Sounds
* Prefabs

Maps can be published to be hosted by our content servers. This allows users to have one central place where they can share their maps easily. This is somewhat related to a **cloud** concept and can also get costly quite easily, when we consider what data we would need to store. However, this also comes with many benefits.

* Content can be licensed
* Content can be showcased
* Always downloadable and easily installed without anyone needing to pre-package and send
* Decide how public or private your content is (share with friends, clan, everyone)
* Allow who can edit the content (map)
* Allow independent collaboration to the same origin (Like git works)
* Allow forks of content with the same licensing conditions
* Once logged in, you can access your content from anywhere, even private
* See a dependency graph of content used (this map requires textures from package A, B, C)

The old-fashioned `/sendmap` and `/getmap` commands will still persist in a way, that users do not need to publish everything to content servers. However, this might be different for content like textures, models, sounds

### Retrieving content

A Quadropolis clone that can be browsed ingame or exposed to a website. With the difference, that ingame you can almost instantly start exploring the map - without any messy installation instructions and moving folders around. Inexor Flex makes sharing media already possible. This mechanism can be used to download game content provided by other users on the fly.

## Account / Profile

Every user can start out without an account. If you want to share or even maybe protect your created content, you need an account. For this, we need an authentication server and content server. Creating an account can happen ingame or on a website

### Public profile

A profile can consist of many properties:

* Username
* Avatar
* Created content
    * Recently created/published/work in progress
    * Downloaded/played X times on servers by Y users
* Is part of X Clans
* Account created on Date X
* Last time online
* Currently online on Server


## Clans

Users can create and join clans to better organize themselves as a group. But what exactly is a clan? Maybe clan is not the correct word, as these kind of groups can be used to do a variety of things:

* Have a managed group for organizing editing sessions
* Organize clan-maps that everyone can edit anytime without needing to `/sendmap`
* Have a chat spanning multiple servers with persistence
* Prepare and manage clan fights
* Easily join clan fights and get auto-assigned to the correct team
* Create a clan-page to 
  * promote content created within the group
  * list scoring within the clan
  * list members and type of membership
  * let people know how to get involved

### Creating a Clan

A clan can be created by anyone. There need to be a few things set up.

* Clan tag - clans still use a tagname to be put in front of a username.
* Clan page - maybe in Markdown?
* Memberships
    * Availability - can anyone join? is there a joining process?
    * Clan roles - specify leading and organizing roles
    * Manage members
    * Invite new players (only very subtle and if users allow to)
* Collaboration
    * Users can open up a map for usage within a clan

### Clan Content / Maps

The openness of Sauerbraten allowed players to be very creative. Players used that openness, to create clan-maps like headquarters for meetings, or maps where everyone could add their own house. What was the most annoying, was that nobody could work on it independently. There was always one with the latest version of something and maps would have needed to be merged manually and tediously.

Clans should be able to collaboratively but independently work on a map that is stored at our content servers.

## Notifications

## Personal Scoreboard