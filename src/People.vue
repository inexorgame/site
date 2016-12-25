<template>
  <div>
    <li v-for="member in members">
      {{ member.login }}
    </li>
    <div class="loading" v-if="loading">
      Gathering folks...
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
      members: null,
      error: null
    }
  },
  created () {
    this.fetchMembers();
  },
  watch: {
    '$route': 'fetchMembers'
  },
  methods: {
    fetchMembers () {
      this.error = this.members = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      this.$http.get('https://api.github.com/orgs/inexor-game/members').then((response) => {
        this.loading = false;
        response.json();

        this.members = response.body;
      }, (response) => {
        this.loading = false;
        this.error = response.statusText;
      });
    }
  }
}
</script>
