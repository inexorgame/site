---
layout: home
---
<style lang="stylus">
    .intro
        background-image url("../assets/background_blur/pandora.jpg")
</style>

<div class="break-out-full-width intro text-center bg-purple-darker flex flex-col items-center text-purple-lightest py-16 mb-8">
    <h1 class="mb-8 flex items-center">
        <img src="../assets/logo/inexor_cube_alpha.png" class="mr-8 w-24">
        <div class="text-left flex flex-col uppercase text-white">
            <span>Inexor</span>
            <small class="text-lg text-purple-light">
                Open Next Generation FPS Sandbox
            </small>
        </div>
    </h1>
    <div class="w-3/4 flex">
        <div class="w-1/3 px-2">
            <h3>Blog</h3>
            <div class="bg-purple-darkest-faded rounded p-4 my-4 text-left">
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
            <div class="bg-purple-darkest-faded rounded p-4 my-4 text-left">
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
            <div class="bg-purple-darkest-faded rounded p-4 my-4 text-left">
            </div>
        </div>
    </div>
</div>

## The Vision
There are opportunities only an open-source game can offer.
There are paths only those can walk who do not fear theft of their work.

We want to create a game which allows people to create the game.
To have fun learning continuously more stuff as they dig deeper into making it their own.
To develop the right mindset to attack challenging problems.
To work and create cooperatively in a team rather than on your own.

Those who see it as enhancement when someone else starts working with their creation will find their place in this project.
Inexor will always try to bring people together.

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

dam dam dam!!