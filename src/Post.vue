<template>
  <div class="container i-container">
    <div class="post-header">
      <h4>{{ postMeta.title }} </h4>
      <p>written by {{ postMeta.author }} on {{ postMeta.date }}</p>
    </div>

    <div v-html="post">

    </div>

    <div class="loading" v-if="loading">
      <strong>Drinking enough coffee until release...</strong>
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
      postMeta: {
        title: 'Awesome Inexor news',
        author: 'Inexor Team',
        date: '11/12/2013'
      },
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
          let parser = new DOMParser();
          let doc = parser.parseFromString(reader.result, 'text/html')
          let metadata = doc.querySelector('table');
          metadata.parentNode.removeChild(metadata)
          this.parseMetaData(metadata)
          this.post = doc.querySelector('#file').outerHTML;
        }
        reader.readAsText(response.body);
      }, (response) => {
        this.loading = false;
        this.error = response.statusText;
      })
    },
    // Since this is a really fast operation and we don't want our user to hang/wait for the title of the post, synchronous request is o.k.
    parseMetaData(table) {
      let tbody = table.querySelectorAll('tbody tr td');
      table.querySelectorAll('thead tr th').forEach((item) => {
        // IE9 < breaks this. That's bad luck.
        this.postMeta[item.textContent] = tbody[item.cellIndex].textContent
      })
    }
  }
}
</script>

<style>
ul {
  padding: 0;
  list-style-type: none;
}
</style>
