---
layout: home
---
<style lang="stylus">
    .intro
        background-image url("../assets/background_blur/cartel.jpg")
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
    <div class="w-3/4 flex flex-wrap">
        <div class="w-full md:w-1/2 px-2">
            <h3>Blog</h3>
            <div class="bg-gray-darkest-faded p-4 my-4 text-left">
                <div v-for="post in latestPosts" class="my-4">
                    <h4>
                        <router-link :to="post.path">
                            {{post.title}}
                        </router-link>
                    </h4>
                    {{post.frontmatter.date | formatDate}}
                </div>
                <router-link to="/blog/">
                    Browse all {{posts.length}} blogposts
                </router-link>
            </div>
        </div>
        <div class="w-full md:w-1/2 px-2">
            <h3>Docs</h3>
            <div class="bg-gray-darkest-faded p-4 my-4 text-left">
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

## The Vision

Inexor is aiming to be an in-game multiplayer game creating sandbox.

The first games it will implement are the popular gamemodes of "Cube2: Sauerbraten". [Sauerbraten](http://sauerbraten.org/) started as an open-source DOOM-Clone with focus on old-school blazing fast multiplayer FPS action. Furthermore it added an intuative ingame multiplayer map creator to the mix, which quickly became its heart and breath. A lot of possibilities in its own scripting language made people extend Sauerbraten far beyond its limits, keeping it alive far beyond official development was halted.

We want to create a game which allows people to **create** the game.
To have fun learning continuously more stuff as they dig deeper into making it their own. To work and create cooperatively in a team rather than on your own.

Those who see it as enhancement when someone else starts working with their creation will find their place in this project.
Inexor will always try to bring people together.

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
                    link: './wiki/Contact.html',
                    text: 'Get Involved',
                }
            ]
        }
    }
}
</script>