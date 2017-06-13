<template>
  <div class="container i-container">
    <div class="row">
      <div class="col-md-12">
        <div class="inexor-article">
          <h1>{{ postMeta.title }}</h1>
          <p class="text-muted">written by {{ postMeta.author }} on {{ postMeta.date }}</p>
          <div class="loading" v-if="loading">
            <strong>Drinking enough coffee until release...</strong>
          </div>
          <div v-html="post">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="inexor-comments">
          <h4> Toggle Comments </h4>
          <label class="switch">
            <input type="checkbox" name="switch" v-on:change="commentsEnabled = !commentsEnabled">
            <div class="slider round"></div>
          </label>
          <div v-if="!(error === 'OK')" class="error">
            {{ error }}
          </div>
          <div v-if="commentsEnabled">
            <vue-disqus shortname="inexor-game"></vue-disqus>
          </div>
        </div>

      </div>

    </div>
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
      error: false,
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
      let vm = this;
      vm.error = vm.post = null;
      vm.loading = true;
      let xhr= new XMLHttpRequest();
      xhr.open('GET', 'https://api.github.com/repos/inexor-game/blog-data/contents' + this.$route.path, true);
      xhr.setRequestHeader('Accept', 'application/vnd.github.v3.html');
      xhr.onreadystatechange = function() {
        let self = this;
        if (self.readyState !== 4 || self.status != 200) {
          vm.loading = false;
          vm.error = this.statusText;
        } else {
          let parser = new DOMParser();
          let doc = parser.parseFromString(self.responseText, 'text/html')
          let metadata = doc.querySelector('table');
          metadata.parentNode.removeChild(metadata)
          vm.parseMetaData(metadata)
          vm.post = doc.querySelector('#file').outerHTML;
          vm.loading = false;
        }
      }
      xhr.send();
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

.inexor-article h1, .inexor-article > p {
  text-align: center;
}
.inexor-article {
  padding: 50px;
  background-color: rgba(50, 50, 50, 0.5);
  text-align: left;
  border-radius: 5px;
}

.inexor-comments {
  padding: 50px;
  background: linear-gradient(rgba(50, 50, 50, 0.5), rgba(0, 0, 0, 0.8));
}

.inexor-comments > h4 {
  text-align: center;
}

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

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
