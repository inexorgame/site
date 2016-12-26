<template>
  <div class="container i-container">
    <div v-html="post">
      <div class="loading" v-if="loading">
        <strong>Drinking enough coffee until release...</strong>
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    this.fetchBlogEntry();
  },
  watch: {
    '$route': 'fetchBlogEntry'
  },
  methods: {
    fetchBlogEntry() {
      this.error = this.post = null;
      this.loading = true;

      this.$http.get('https://api.github.com/repos/inexor-game/blog-data/contents/' + this.$route.path, {
        headers: {
          'Accept': 'application/vnd.github.v3.html'
        }
      }).then((response) => {
        this.loading = false;
        let reader = new FileReader();
        reader.onloadend = () => {
          this.post = reader.result;
        }
        reader.readAsText(response.body);
      }, (response) => {
        this.loading = false;
        this.error = response.statusText;
      })
    }
  }
}
</script>
