# Blog Posts

<main >
    <article v-for="(post, index) in posts" :key="index" class="break-out-full-width relative flex justify-center p-4">
        <router-link :to="post.path" class="post-link sm:w-1/2 my-16 relative">
            <div class="bg-purple-lightest-faded border border-purple rounded p-4 h-full">
                <h3 class="post-link__title">
                    {{post.frontmatter.title}}
                </h3>
                <small class="font-semibold mb-2 text-gray-dark">{{post.frontmatter.date | formatDate}}</small>
                <p class="text-gray-darkest">{{post.frontmatter.summary}}</p>
                <div>Author: <span class="font-normal text-gray-darkest">{{post.frontmatter.author}}</span></div>
            </div>
        </router-link>
    </article>
</main>

<script>
export default {
    methods: {
        randomBackground() {
            return this.backgrounds[(Math.random() * this.backgrounds.length) | 0]
        }
    },
    computed: {
        posts() {
            return this.$site.pages
                .filter(page => page.frontmatter.layout == 'post')
                .sort((a,b) => new Date(a.frontmatter.date) - new Date(b.frontmatter.date))
                .reverse()
        }
    }
}
</script>

<style lang="stylus">
    .post-link
        text-decoration none !important
    .post-link:hover .post-link__title
        text-decoration underline
        
</style>