<template>
  <div>
    <div class="card" v-for="post in posts">
      <div class="card-block">
        <h4 class="card-title"><a v-bind:href="/#/ + post.path">{{ post.display_name }}</a></h4>
        <h6 class="card-subtitle text-muted"></h6>
      </div>
    </ul>
    <div class="loading" v-if="loading">
      <strong>Writing interesting articles...</strong>
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      posts: null,
      error: null
    }
  },
  created () {
    this.fetchBlogEntries();
  },
  watch: {
    '$route': 'fetchBlogEntries'
  },
  methods: {
    fetchBlogEntries () {
      this.error = this.posts = null;
      this.loading = true;

      this.$http.get('https://api.github.com/repos/inexor-game/blog-data/commits/HEAD').then((response) => {
        response.json();
        let sha = response.body['sha']; // Get the HEAD sha
        let tree = 'https://api.github.com/repos/inexor-game/blog-data/git/trees/' + sha + '?recursive=1';

        this.$http.get(tree).then((response) => {
          this.loading = false;
          response.json()
          this.parseBlogArray(response.body.tree).then((posts) => this.posts = posts)
        }, (response) => {
        this.loading = false;
        this.error = response.statusText;
        })
      })
    },
    parseBlogArray(arr) {
      return new Promise((resolve, reject) => {
        const path = /(post\/)\d{4}\//g; // Test for path containing /post/YEAR/
        const date = /\d{2}-/g;
        // PUHHH. We made up some uggly, fu**ed up syntax format for parsing.

        try {
          let tree = arr.filter(value => path.test(value.path));
          let posts = tree.map((value) => {
            let path = value.path.split('/')
            let path_ = path.slice(2)
            let date_ = date[Symbol.match](path_)
            let title_ = date[Symbol.split](path_)

            value.display_name = String(title_.slice(2)).replace('.md', ' ');
            value.year = String(path.slice(1, 2));
            value.month = date_.slice(0, 1).join()
            return value;
          })
          resolve(posts)
        } catch (e) {
          reject(e);
        }
      })
    }
  }
}
</script>
