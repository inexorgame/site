---
layout: home
title: Inexor - Next Gen FPS Sandbox
---
<style lang="stylus">
    .intro
        background-image url("../assets/background/turmoil.jpg")
        background-position 0 60%
        background-size cover
    .clipped
        clip-path: polygon(0% 2rem, 2rem 0%, calc(100% - 2rem) 0%, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0% calc(100% - 2rem));
        backdrop-filter: blur(5px) opacity(80%);
    /* .features
        background-image url("../assets/background_blur/averas.jpg") */
</style>

<div class="break-out-full-width intro text-center bg-purple-darker flex flex-col items-center text-purple-lightest py-16 mb-8">
    <h1 class="mb-8 flex items-center">
        <img src="../assets/logo/inexor_cube_alpha.png" class="mr-8 w-24">
        <div class="text-left flex flex-col uppercase text-white">
            <span>Inexor</span>
            <small class="text-lg subtitle">
                Open Next Generation FPS Sandbox
            </small>
        </div>
    </h1>
    <div class="w-3/4 flex flex-wrap items-stretch">
        <div class="w-full md:w-1/2 px-2">
            <div class="bg-gray-darkest-faded my-4 text-left clipped pb-12">
                <h3 class="text-center bg-black-faded py-2">News</h3>
                <div v-for="post in latestPosts" class="my-4 px-4">
                    <h4 class="text-lg">
                        <router-link :to="post.path">
                            {{post.title}}
                        </router-link>
                    </h4>
                    {{post.frontmatter.date | formatDate}}
                </div>
                <router-link to="/blog/" class="px-4">
                    Browse all {{posts.length}} blogposts
                </router-link>
            </div>
        </div>
        <div class="w-full md:w-1/2 px-2">
            <div class="bg-gray-darkest-faded my-4 text-left clipped pb-8">
                <h3 class="text-center bg-black-faded py-2">Docs</h3>
                <div class="px-4">
                    <ul>
                        <li v-for="doc in docs">
                            <router-link :to="doc.link">
                                {{doc.text}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

## Vulkan API tech demo

[Get our latest tech demo here!](https://github.com/inexorgame/vulkan-renderer/releases/edit/v0.1-alpha.1)

Join our discord! [https://discord.gg/acUW8k7](https://discord.gg/acUW8k7)

## What is Inexor?
* Inexor will be a new first person shooter game which is based on a new octree-based game engine.
* Inexor focuses on classic gameplay as we've seen in Cube2 or the Quake series.
* Inexor will be written from ground up new in modern C++17.
* You can contribute anything you want: code, content, ideas..
* Inexor and all its content is 100% open source!

## What is the point of Inexor?
* We want to create a game which has classic gameplay but a very powerful embedded world editor.
* Inexor is a sandbox: There is no separation between engine editor and the game itself. Creating the game is part of the game.
* People's ideas for the game will no longer be limited by the underlying engine technology.
* Players can express their map or game mode ideas without any restrictions by us, using a visual scripting enviroment - even collectively in multiplayer.

## Who is behind Inexor?
* A collective of game programmers, artists, or people who are very passionate about gaming.
* There is no strict hierarchy behind this organisation.
* Everybody is welcome.
* Inexor will always try to bring people together.

## How to contribute?
* Currently, we are in the process of writing the game engine.
* Programmers and testers are most needed right now.
* Artists and mappers are also welcome, but the time for creating maps has not come yet.

## Why develop a new game engine?
* We need a new octree-based game engine which is based on a task-based, multithreaded engine.
* Vulkan API is a new graphics API which allows us to gain better performance.

## How to get into contact?
* Please join our discord server! Just search for `inexor`.
* You can also write us: `info@inexor.org`.

## When will Inexor be playable?
* This depends on the speed of our progress.
* We can't forsee this yet.

## I found a bug in Inexor, what now?
* Open a [ticket](https://github.com/inexorgame/vulkan-renderer).

## Which systems will be supported?
* This release contains files for Windows only.
* We are working to get the [Linux build](https://github.com/inexorgame/vulkan-renderer/issues/19) working as fast as possible.
* We might support Android in the future.
* Because Apple decided not to support Vulkan API natively, we will not Mac OS.
We are not planing on using [moltenVK](https://github.com/KhronosGroup/MoltenVK) to get our projects running on Mac OS either.

## Is Inexor a fork of Cube2?
* No, Inexor is a new code base which has no dependencies in cube-engine.

## What will be different in Inexor compared with Cube2?
* It is too early to answer this question as we're in the process of writing the game engine first.
* The answer to this question will very much depend on your input.

## Will you use any code parts from cube-engine?
* No. Cube engine is single threaded. This was fine back in the day of its creation but nowadays it acts as a bottleneck for the gpu.

## Will Inexor be compatible with Cube2 or other games?
* No, because Inexor's objective is different.
* We don't want to limit ourselves by supporting old technology?

## Can I import my maps from Cube2 into Inexor?
* We are working on a [map converter](https://github.com/inexorgame/cube2-map-importer).
* It is not ready yet.

## What's next?
* **v0.1-alpha.2**: April 25th, 2020.


<div class="flex justify-end">
    <router-link to="wiki/Get-Involved.html" class="button my-4">Get involved 👋</router-link>
</div>

<script>
export default {
    computed: {
        posts() {
            return this.$site.pages
                .filter(page => page.frontmatter.layout == 'post')
        },
        latestPosts() {
            return this.posts            
                .sort((a,b) => new Date(a.frontmatter.date) - new Date(b.frontmatter.date))
                .reverse()
                .slice(0, 3)
        },
        docs() {
            return [
                {
                    link: './wiki/',
                    text: 'Wiki Overview',
                },
                {
                    link: './wiki/Get-Involved.html',
                    text: 'Get Involved',
                },
                {
                    link: './wiki/Contact.html',
                    text: 'Contact',
                },
                {
                    link: './wiki/features/',
                    text: 'Features',
                },
            ]
        }
    }
}
</script>
