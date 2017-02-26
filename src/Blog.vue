<template>
  <div class="container i-container">
    <div class="col-md-12">
      <form class="form-inline float-xs-top">
        <div class="form-group">
          <label for="date" v-on:change="sortPosts">Sort by date</label>
          <select type="select" name="date" class="form-control">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
          </select>
        </div>
        <div class="form-group">
          <input v-validate="'required|min:4'" name="search" class="form-control" type="text" v-model="query" placeholder="Search" @keydown.enter.prevent="">
        </div>
        <button class="btn btn-outline-success" v-bind:disabled="errors.has('search')" v-on:click="filterBlogEntries" type="button">Search</button>
      </form>
    </div>

    <div v-if="notfound" class="notfound">
      <div class="col-md-12"><strong>We couldn't find the article you are looking for..</strong></div>
      <div class="col-xs-12"><img src="/src/assets/sitting_ogro.jpg" style="border-radius: 5px;"/></div>
    </div>
    <div v-else v-for="post in filteredPosts ">
      <div class="col-md-12"><h4 class="card-title"><a v-bind:href="/#/ + post.path">{{ post.display_name }}</a></h4></div>
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
      filteredPosts: null,
      error: null,
      notfound: null
    }
  },
  created () {
    this.fetchBlogEntries();
  },
  watch: {
    '$route': 'fetchBlogEntries',
    'query': (q) => {
      if (q.length < 3) {
        this.filteredPosts = this.posts;
        this.notfound = false; // Don't fire
      }
    }
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
          this.parseBlogArray(response.body.tree).then((posts) => {
            this.posts = posts;
            this.filteredPosts = this.posts;
            this.sortPosts(); // Default sort descendingly
          })
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
          this.filteredPosts = this.posts.filter(v => strikes.includes(v.path))
          this.notfound = false;
        } else {
          this.notfound = true;
        }
      }, (response) => {
        this.error = response.statusText;
      })

    },
    parseBlogArray(arr) {
      return new Promise((resolve, reject) => {
        const path = /post\/\d{4}\/?.+\.md/; // Test for path containing /post/YEAR/*.md
        const date = /\d{2}\-\d{2}/; // Test for 04-07 kind of dates
        const number = /\d{2}/; // Test for 2-digit numbers

        try {
          let tree = arr.filter(value => path.test(value.path));
          let posts = tree.map((value) => {
            let path = value.path.split('/')
            let path_ = path.slice(2) // Select the third element, /POST/YEAR/ <-
            let date_ = date[Symbol.match](path_)
            let title_ = date[Symbol.split](path_)

            value.display_name = String(title_.slice(1)).replace('.md', ' ');
            value.display_name = value.display_name.replace(/\-/g, ' ');
            value.year = String(path.slice(1, 2));
            value.month = number[Symbol.split](date_).slice(0, 1);
            value.day = number[Symbol.split](date_).slice(1, 2);
            return value;
          })
          resolve(posts)
        } catch (e) {
          reject(e);
        }
      })
    },
    sortPosts(order='desc') {
      // Maybe outsource this
      let compare_asc = (a, b) => {
        if (b.year <= a.year && b.month <= a.month && b.day < a.day) {
          return -1
        } else if (a.year == b.year && a.month == b.month && a.day == b.day) {
          return 0;
        } else {
          return 1;
        }
      }

      let compare_desc = (a, b) => {
        if (a.year <= b.year && a.month <= b.month && a.day < b.day) {
          return -1
        } else if (a.year == b.year && a.month == b.month && a.day == b.day) {
          return 0;
        } else {
          return 1;
        }
      }

      if (this.filteredPosts.length > 0) {
        if (order == 'asc') {
          this.filteredPosts = this.filteredPosts.sort(compare_asc);
        } else if (order == 'desc') {
          this.filteredPosts = this.filteredPosts.sort(compare_desc);
        }
      }
    }
  }
}
</script>

<style>
h4:first-letter {
    text-transform:capitalize;
}
</style>
