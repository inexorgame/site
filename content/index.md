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
    <div class="w-3/4 flex">
        <div class="w-1/3 px-2">
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
        <div class="w-1/3 px-2">
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
        <div class="w-1/3 px-2">
            <h3>Develop</h3>
            <div class="bg-gray-darkest-faded p-4 my-4 text-left">
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
    <router-link to="wiki/get-involved/" class="button my-4">Get involved 👋</router-link>
</div>

<div class="break-out-full-width features text-center bg-orange-light flex flex-col items-center text-orange-darkest py-16 mb-8">
    <h2 class="heading mb-8">
        Features
    </h2>
    <div class="w-3/4 flex flex-wrap">
        <div class="w-1/2 px-2">
            <h3>World Editor</h3>
            <div class="p-4 my-4 text-left">
                A new base of building blocks for the world editor should result in the same feeling as the Sauerbraten one (quick editing, effortless transition between playing and editing), but also integrate all other kinds of resources, like sounds, textures, externally created models and particles. Furthermore full version control of the changes on this world is planned to be provided, including resolving conflicts on merge between different versions of the map.
            </div>
        </div>
        <div class="w-1/2 px-2">
            <h3>Community-Driven Content</h3>
            <div class="p-4 my-4 text-left">
                Together with a content distribution features, the Inexor Cloud, it is possible to share content persistently across the whole community. There is no login requiered to play Inexor, but as soon as one wants to upload content persistently or interact in social network features, one can login via numerous thirdparty services like facebook, github, or gmail. People are still able to upload content without being logged in, but (similar to Sauerbraten) only temporarily with players concurrently connected to the same server and only with more restrictions on the kind of content (e.g. textures and geometry are fine, while shaders or scripts and plugins are not).
            </div>
        </div>
        <div class="w-1/2 px-2">
            <h3>Dynamic Worlds</h3>
            <div class="p-4 my-4 text-left">
                The games take place on different community-provided servers. Extending the set of gamemodes is possible in different degrees. To some extend with the help of 3D Visual Scripting, which integrates seamlessly with the ingame editing of static geometry. This allows adding triggers and complex relations between game objects to the scene. Also materials and particle swarms will be create-able via that integrated API.
            </div>
        </div>
    </div>
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