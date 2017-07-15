<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
      <form class="form-inline">

        <label for="date" class="sr-only">Sort by date</label>
        <select type="select" name="date" class="form-control mb-2 mr-sm-2 mb-sm-0" v-on:change="sortPosts(order)" v-model="order">
          <option value="desc" selected>Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <input v-validate="'required|min:4'" name="search" class="form-control mb-2 mr-sm-2 mb-sm-0" type="text" v-bind:class="{ 'has-warning': errors.has('search') }" v-model="query" placeholder="Search" @keydown.enter.prevent="filterBlogEntries(order)">
        <button class="btn btn-outline-success mb-2 mr-sm-2 mb-sm-0" v-bind:disabled="errors.has('search')" v-on:click="filterBlogEntries" type="button">Search</button>
      </form>
    </div>
    </div>

    <div class="row">
      <div v-if="notfound" class="col-12">
        <div class="card card-block">
          <div class="card-title">
            <h4>We couldn't find the article you are looking for..</h4>
          </div>
          <div class="card-text">
            <img src="/src/assets/sitting_ogro.jpg" style="border-radius: 5px;"/>
          </div>
        </div>
      </div>
      <div v-else v-for="post in filteredPosts" class="col-lg-4 col-md-6">
        <div class="card blog-card">
          <div class="card-block">
            <h4 class="card-title">{{ post.display_name }}</h4>
            <p class="card-text text-muted">written on {{ post.day }}.{{ post.month }}.{{ post.year }}</p>
            <router-link :to="post.post_path">Read more</router-link>
          </div>
        </div>
      </div>
      <div class="loading" v-if="loading">
        <h4>Writing interesting articles...</h4>
      </div>

      <div v-if="error">
          <h4>Something went wrong</h4>
          <p class="text-muted">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const compare_asc = (a, b) => {
  if (b.year <= a.year && b.month <= a.month && b.day < a.day) {
    return 1
  } else if (a.year == b.year && a.month == b.month && a.day == b.day) {
    return 0;
  } else {
    return -1;
  }
}

const compare_desc = (a, b) => {
  if (a.year <= b.year && a.month <= b.month && a.day < b.day) {
    return -1
  } else if (a.year == b.year && a.month == b.month && a.day == b.day) {
    return 0;
  } else {
    return 1;
  }
}

export default {
  data () {
    return {
      query: null,
      loading: false,
      posts: null,
      filteredPosts: null,
      error: null,
      notfound: null,
      order: 'desc',
    }
  },
  created () {
    this.fetchBlogEntries();
  },
  watch: {
    'query': function(q) {
      if (q.length < 4) {
        this.filteredPosts = this.posts;
        this.notfound = false;
      }
    }
  },
  methods: {
    fetchBlogEntries () {
      this.error = this.posts = null;
      this.loading = true;

      this.$http.get('https://api.github.com/repos/inexorgame/blog-data/commits/HEAD').then((response) => {
        response.json();
        let sha = response.body['sha']; // Get the HEAD sha
        let tree = 'https://api.github.com/repos/inexorgame/blog-data/git/trees/' + sha + '?recursive=1';

        this.$http.get(tree).then((response) => {
          this.loading = false;
          response.json()
          this.parseBlogArray(response.body.tree).then((posts) => {
            this.posts = posts;
            this.filteredPosts = this.posts;
            this.sortPosts('desc'); // Default sort descendingly
          })
        }, (response) => {
          this.loading = false;
          this.error = response.statusText;
        })
      })
    },
    filterBlogEntries() {
      let query = 'https://api.github.com/search/code?q=in:file+language:markdown+repo:inexorgame/blog-data+path:post/+' + this.query;
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

            value.display_name = String(title_.slice(1)).replace('.md', ' ').trim();
            value.display_name = value.display_name.replace(/\-/g, ' ');
            value.year = String(path.slice(1, 2));
            value.month = String(/\-/[Symbol.split](date_).slice(0, 1));
            value.day = String(/\-/[Symbol.split](date_).slice(1, 2));
            value.post_path = value.path.replace('.md', ''); // Path to forward to the post component
            return value;
          })
          resolve(posts)
        } catch (e) {
          reject(e);
        }
      })
    },
    sortPosts(order) {
      // NOTE: Lol. Actually this is a bug, and JavaScript should not compare strings that way. Anyhow, nice that it works.
      if (this.filteredPosts.length > 0) {
        if (order == "asc") {
          this.filteredPosts = this.filteredPosts.sort(compare_asc);
        } else if (order == "desc") {
          this.filteredPosts = this.filteredPosts.sort(compare_desc);
        }
      }
    }
  }
}
</script>

<style>

.blog-card {
  height: 10rem;
}
.blog-card h4 {
  text-align: center;
  vertical-align: middle;
}

.blog-card a {
  position: absolute;
  bottom: 1rem;
  left: 10%;
  right: 10%;
}

.blog-card h4:first-letter {
  text-transform:capitalize;
}
</style>
