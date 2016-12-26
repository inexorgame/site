<template>
  <div>
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


    }
  }
}
</script>
