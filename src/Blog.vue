<template>
  <div class="inner cover">
    <div class="container">
      <div class="row">
        <div class="col-12">
        <form class="form-inline">

          <label for="date" class="sr-only">Sort by date</label>
          <select id="inexor_select_sort_order" type="select" name="date" class="inexor_search_style form-control mb-2 mr-sm-2 mb-sm-0" v-on:change="sortPosts(order)" v-model="order">
            <option value="desc" selected>Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <input id="inexor_search_bar" v-validate="'required|min:4'" name="search" class="inexor_search_style form-control mb-2 mr-sm-2 mb-sm-0" type="text" v-bind:class="{ 'has-warning': errors.has('search') }" v-model="query" placeholder="Search" @keydown.enter.prevent="filterBlogEntries(order)">
          <button id="inexor_search_button" class="inexor_search_style btn btn-outline-success mb-2 mr-sm-2 mb-sm-0" v-bind:disabled="errors.has('search')" v-on:click="filterBlogEntries" type="button">Search</button>
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
    },
  },
  methods: {
    compare_asc (a, b) {
        if (
            (b.year > a.year) ||
            (b.year == a.year && b.month > a.month) ||
            (b.year == a.year && b.month == a.month && b.day > a.day)
        ) {
            return -1;
        } else if (b.year == a.year && b.month == a.month && b.day == a.day) {
            return 0;
        } else {
            return 1;
        }
    },
    compare_desc (a, b) {
        if (
            (b.year > a.year) ||
            (b.year == a.year && b.month > a.month) ||
            (b.year == a.year && b.month == a.month && b.day > a.day)
        ) {
            return 1;
        } else if (b.year == a.year && b.month == a.month && b.day == a.day) {
            return 0;
        } else {
            return -1;
        }
    },
    async fetchBlogEntries () {
      this.error = this.posts = null;
      this.loading = true;
      try {
        let response = await fetch('https://api.github.com/repos/inexorgame/blog-data/commits/HEAD');
        let commit = await response.json();
        response = await fetch(`https://api.github.com/repos/inexorgame/blog-data/git/trees/${commit.sha}?recursive=1`);
        let tree = await response.json()
        this.loading = false;
        let posts = this.parseBlogArray(tree.tree);
        this.posts = posts;
        this.filteredPosts = posts;
        // Default sort descendingly
        this.sortPosts('desc');
      } catch (error) {
        this.loading = false;
      }
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
      const path = /post\/\d{4}\/?.+\.md/; // Test for path containing /post/YEAR/*.md
      let tree = arr.filter(value => path.test(value.path));
      let posts = tree.map((value) => {
        let path = value.path.split('/')
        let path_ = path.slice(2) // Select the third element, /POST/YEAR/ <-

        path_ = path_.toString(); // form: 'post/2018/01-27-title.md'
        let date_ = path_.substring(0, 5); // gets the date substring 
        let title_ = path_.substring(5);   // gets title substring

        value.display_name = String(title_.slice(1)).replace('.md', ' ').trim();
        value.display_name = value.display_name.replace(/\-/g, ' ');
        value.year = String(path.slice(1, 2));
        value.month = date_.substring(0, 2);
        value.day = date_.substring(3, 5);
        value.post_path = value.path.replace('.md', ''); // Path to forward to the post component
        return value;
      })
      return posts
    },
    sortPosts(order) {
      const vm = this
      // NOTE: Lol. Actually this is a bug, and JavaScript should not compare strings that way. Anyhow, nice that it works.
      if (this.filteredPosts.length > 0) {
        if (order === "asc") {
          this.filteredPosts = this.filteredPosts.sort(vm.compare_asc);
        } else if (order === "desc") {
          this.filteredPosts = this.filteredPosts.sort(vm.compare_desc);
        }
      }
    }
  }
}
</script>

<style scoped>

.loading {
  padding:15px;
}

.inexor_search_style {
    background: rgba(0,0,0,0.7);
    color: white;
    border:rgba(255,255,255,0.5) 1px solid;
}

#inexor_select_sort_order {
  padding:0px;
  width:120px;
}

#inexor_search_bar {
  width:300px;
}

#inexor_search_button {
}

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
