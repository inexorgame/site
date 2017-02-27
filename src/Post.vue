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

    <label class="switch">
      <label for="switch">Enable comments</label>
      <input type="checkbox" name="switch" v-on:change="commentsEnabled = !commentsEnabled">
      <div class="slider"></div>
    </label>

    <div v-if="commentsEnabled">
      <vue-disqus shortname="inexor-game"></vue-disqus>
    </div>
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'

export default {
  components: {
    VueDisqus
  },
  data () {
    return {
      loading: false,
      postMeta: {
        title: 'Awesome Inexor news',
        author: 'Inexor Team',
        date: '11/12/2013'
      },
      post: null,
      error: null,
      commentsEnabled: false
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

/*
 * Credit goes to W3C
 * https://www.w3schools.com/howto/howto_css_switch.asp
 * In the future this might be directly covered by Bootstrap 4
 * See related issue - https://github.com/twbs/bootstrap/issues/1935
 */

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
