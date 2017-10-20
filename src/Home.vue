<template>
  <div>
    <div class="inner cover-top">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
            <img id="inexor_logo" class="img-fluid" src="src/assets/logo_rendered/inexor_logo_400.png">
            <h1 class="cover-heading" id="inexor_headline">Fast classic gameplay crossed with modern technology.</h1>
          </div>
        </div>
      </div>
    </div>

    <div id="blackbox">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
            <ul>
              <li>Cooperatively create levels with the built-in map editor.</li>
              <li>Master manic multiplayer matches.</li>
              <li>Made with love, not money.</li>
              <li>It's free and open source.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-md-8">
          <a :href="getLink.link" id="inexor_button" class="btn btn-lg btn-secondary">Download <i :class="getLink.icon" aria-hidden="true"></i></a>
        </div>
         <div class="col col-md-8 download-link">
            <router-link class="nav-link" to="/download">Other Downloads</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["linux_link", "windows_link"],
  computed: {
    getLink() {
      const link = navigator.platform.toLocaleUpperCase() == "WIN32" ? {link: this.windows_link, icon: "fa fa-windows"}: {link: this.linux_link, icon: "fa fa-linux"};
      return link;
    }
  }
};
</script>

<style scoped>
#inexor_headline {
  margin-top: 30px;
}
#blackbox {
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  border-top: rgba(255, 255, 255, 0.5) 1px solid;
  border-bottom: rgba(255, 255, 255, 0.5) 1px solid;
}
#blackbox ul {
  padding: 10px 0px 10px 0px;
  font-family: arial;
  font-size: 24px;
  list-style: none;
  text-align: left;
}

@keyframes inexor_blink {
  0% {
    box-shadow: 0px 0px 10px 1px white;
  }
  50% {
    box-shadow: none;
  }
  100% {
    box-shadow: 0px 0px 10px 1px white;
  }
}

#inexor_button {
  width: 100%;
  margin: 40px 0;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  background-color: white;
  color: black;
  border: 0px;
  border-radius: 0px;
  animation-name: inexor_blink;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}
</style>
