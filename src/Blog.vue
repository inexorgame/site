<template>
  <div class="container i-container">
    <form class="form-inline float-xs-top">
      <input class="form-control" type="text" v-model="query" placeholder="Search">
      <button class="btn btn-outline-success" v-on:click="filterBlogEntries" type="button">Search</button>
    </form>
    <div v-if="notfound" class="notfound">
      <strong>We couldn't find the article you are looking for..</strong>
      <img src="/src/assets/sitting_ogro.jpg" />
    </div>
    <div v-else class="card" v-for="post in posts">
      <div class="card-block">
        <h4 class="card-title"><a v-bind:href="/#/ + post.path">{{ post.display_name }}</a></h4>
        <h6 class="card-subtitle text-muted"></h6>
      </div>
    </div>
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
      query: null,
      loading: false,
      posts: null,
      error: null,
      notfound: null
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
    filterBlogEntries() {
      // Search for: markdown in inexor-game/blog-data under path post/
      // TODO: conditional reloading of older posts 
      let query = 'https://api.github.com/search/code?q=in:file+language:markdown+repo:inexor-game/blog-data+path:post/+' + this.query;
      this.$http.get(query).then((response) => {
        response.json();
        if (response.body.total_count > 0) {
          let strikes = response.body.items.map(v => v.path)
          this.posts = this.posts.filter(v => strikes.includes(v.path))
          this.posts = this.posts.sort((a, b) => {
            if (strikes.indexOf(a.path) < strikes.indexOf(b.path)) {
              return -1;
            }
            if (strikes.indexOf(b.path) < strikes.indexOf(a.path)) {
              return 1;
            }

            return 0;
          })
        } else {
          this.notfound = true;
        }
      }, (response) => {
        this.error = response.statusText;
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
