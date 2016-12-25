<template>
  <div class="container-fluid">
    <div class="col-sm-4" v-for="member in members">
      <div class="card people">
        <img class="card-img" v-bind:src="member.avatar_url" width="150px" height="120px"/>
        <div class="card-img-overlay">
          <h4 class="card-title">{{ member.login }}</h4>
          <a v-bind:href="member.html_url"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <strong>Gathering folks...</strong>
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

<style>
.people {
  background-color: transparent;
  border-color: transparent;
}
</style>
