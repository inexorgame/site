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
          <a :href="downloadConfig.link" id="inexor_button" class="btn btn-lg btn-secondary">Download <i :class="downloadConfig.icon" aria-hidden="true"></i></a>
        </div>
         <div class="col col-md-8 download-link">
            <router-link class="nav-link" to="/download">Other Downloads</router-link>
        </div>
      </div>
    </div>

    <div id="videolist">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import downloadLinksMixin from './downloadLinksMixin.js'

export default {
  mixins: [downloadLinksMixin],
  computed: {
    downloadConfig() {
      let downloadConfig;

      if (navigator.platform.includes('Win')) {
          downloadConfig = {
              link: this.downloadLinks['windows'],
              icon: 'fa fa-windows'
          }
      } else if (navigator.platform.includes("Mac")) {
          downloadConfig = {
              link: this.downloadLinks['osx'],
              icon: 'fa fa-apple'
          }
      } else {
          downloadConfig = {
              link: this.downloadLinks['linux'],
              icon: 'fa fa-linux'
          }
      }

      return downloadConfig;
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
