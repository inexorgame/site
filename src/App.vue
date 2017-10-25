<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">

        <transition name="fade" mode="in-out">
          <div class="inexor_bg" v-if="!toggle_bg" v-bind:style='bg_1' key="1">
          </div>
          <div class="inexor_bg" v-else v-bind:style='bg_2' key="2">
          </div>
        </transition>

        <nav class="navbar navbar-expand-md navbar-inverse fixed-top navbar-expand-xl">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            &#9776;
          </button>

          <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link class="nav-link" to="/home">Home</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/download">Download</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/blog">Blog</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/news">News</router-link></li>
              <!--<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle disabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Community</a>
                <div class="dropdown-menu show">
                  <router-link class="dropdown-item" to="/news">News</router-link>
                </div>
              </li>-->
              <li class="nav-item"><router-link class="nav-link" to="/people">People</router-link></li>
              <li class="nav-item"><a href="https://github.com/inexorgame/inexor-core/wiki" target="_blank" class="nav-link">Wiki</a></li> <!-- We need to change that to a way to get the wiki directly from the website-->
            </ul>
          </div>
        </nav>
      </div>

      <router-view></router-view>

      <div class="cover-container footer-wrapper">
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-md-1 col-3 col-centered"><a href="https://github.com/inexorgame/" title="GitHub"><i class="fa fa-github fa-2x" area-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://www.facebook.com/inexorgame" title="Facebook"><i class="fa fa-facebook fa-2x" area-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://www.youtube.com/channel/UCKOcY8wxvWq8pGLcESSpfhw" title="YouTube"><i class="fa fa-youtube fa-2x" area-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://twitter.com/inexorgame" title="Twitter"><i class="fa fa-twitter fa-2x" area-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://riot.im/app/#/room/#inexor:matrix.org" title="Riot"><i class="fa fa-comments-o fa-2x " aria-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://t.me/inexor" title="Telegram"><i class="fa fa-telegram fa-2x " area-hidden="true"></i></a></div>
              <div class="col-md-1 col-3 col-centered"><a href="https://docs.inexor.org/" title="Inexor API Docs"><i class="fa fa-book fa-2x " area-hidden="true"></i></a></div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  </div>
</template>

<!--style forked from Bootstrap Cover https://v4-alpha.getbootstrap.com/examples/cover/cover.css -->
<style>
/*
* Globals
*/

/* Links */
a,
a:focus,
a:hover {
  color: white;
}

/* Custom default button */

.btn {
  text-shadow: none; /* Prevent inheritance from `body` */
}
.btn-default,
.btn-default:hover,
.btn-default:focus {
  color: #333;
  background-color: #fff;
  border: 1px solid #fff;
}


/*
* Base structure
*/

html,
body {
  height: 100vh; /* https://stackoverflow.com/questions/24944925/background-image-jumps-when-address-bar-hides-ios-android-mobile-chrome/25020295#25020295 */
}

body {
  overflow-y:scroll;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0,0,0,.5);
  background-color: #111;
}

/*
* Inexor classes
*/

.inexor_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  top: 0;
  left: 0;
  bottom: 0;
  z-index:-1;
}

/* Extra markup and styles for table-esque vertical and horizontal centering */
.site-wrapper {
  display: table;
  width: 100%;
  height: 100%; /* For at least Firefox */
  min-height: 100%;
  box-shadow: inset 0 0 100px rgba(0,0,0,1);
}
.site-wrapper-inner {
  display: table-cell;
  vertical-align: top;
  top: 0;
  min-height: 100%;
  position: relative;
  padding-bottom: 65px; /* height of the footer */
}

@media (max-width: 767px) {
  .site-wrapper-inner {
    padding-bottom: 130px; /* height of the footer */
  }
}

.cover-container {
  margin-right: auto;
  margin-left: auto;
  position: relative;
}

.footer-wrapper {
  bottom: 0;
  width: 100%;
  position: absolute;
}

/* Padding for spacing */
.inner {
  padding: 30px;
}

/*
* Header
*/


.navbar-toggler {
  color: #FFF;
  width: 100%;
  padding: 10px
}

.navbar {
  padding:0;
  border-top:solid 5px rgba(0, 0, 0, 0.7);
}
@media (max-width: 767px) {
  .navbar {
    border-top: none;
    background: rgba(0, 0, 0, 0.7);
  }
}

.navbar-nav > li > a {
  line-height:60px;
  padding:0 10px 0 10px;
  min-width:100px;
}

.navbar-nav > li > a:hover,
.navbar-nav > .active > a,
.navbar-nav > .active > a:hover,
.navbar-nav > .active > a:focus {
  height:60px;
  background-color:rgba(0, 0, 0, 0.7);
}

/*
* Cover
*/

.cover {
  padding: 8rem 20px;
}
.cover-top {
  padding: 8rem 20px 0 20px;
}

.cover .btn-lg {
  padding: 10px 20px;
  font-weight: bold;
}


/*
* Footer
*/

@media (min-width: 960px) {
  footer {
    margin-left: 20%;
    margin-right: 20%;
 }

}


.col-centered {
  margin: 0 auto;
  float: none;
  padding: 1rem;
}


/*
* Make social media icons white
*/

footer a {
  color:white;
}
footer a:hover {
  color:white;
  text-decoration:underline;
}

footer a {
  color:white;
}
footer a:hover {
  color:white;
  text-shadow:1px 1px 4px black;
}

/*
 * Affix and center
 */


@media (min-width: 82em) {
  .cover-container {
    width: 80rem;
    left: calc( 50% - 40rem );
    right: calc( 50% - 40rem );
  }
}

/*
* Inexor
*/

.card {
  border:rgba(255,255,255,0.5) 1px solid;
  margin: 10% 10% 10% 0px;
  padding:10px;
  background-color:rgba(0,0,0,0.7);
  border-radius: 5px;
}

.card h4 {
  word-wrap:break-word;
}

.text-muted {
  color: #aaa !important;
}

.fade-enter-active {
  transition: opacity 2s;
}
.fade-enter {
  opacity: 0;
}
.download-link{
  margin-top: -1.6em
}

</style>

<script>

export default {
  name: 'app',
  data() {
    return {
      toggle_bg: true,

      bg_1: {
        'background-image': "url('/src/assets/background_blur/laucin.jpg')"
      },
      bg_2: {
      },

      i: 0,
      bg_images: [
        "dust6.jpg",
        "laucin.jpg",
        "haze.jpg",
        "averas.jpg",
        "cartel.jpg",
        "lager.jpg",
        "legacy.jpg",
        "pandora.jpg",
        "star.jpg",
      ]
    }
  },
  created() {
    window.addEventListener('scroll', function() {
      if (window.scrollY < 50) {
        $('nav').fadeIn();
      }
      else  {
        $('nav').fadeOut();
      }
    });

    this.loopThroughBackgroundImages();
  },
  methods: {
     loopThroughBackgroundImages: function loopThroughBackgroundImages() {
       let vm = this;
       vm.$set( ( vm.toggle_bg ? vm.bg_1: vm.bg_2 ), 'background-image', 'url(/src/assets/background_blur/' + vm.bg_images[vm.i] + ')' ) ;
       vm.toggle_bg = !vm.toggle_bg;

      vm.i++;
      if(vm.i > vm.bg_images.length -1) vm.i = 0;

      /*
        make sure next image is loaded before cycling to it, otherwise cycle when it's done loading.
      */
      let next_img = new Image();
      let t0 = performance.now();
      next_img.src = '/src/assets/background/' + vm.bg_images[vm.i];

      next_img.onload = function() {
        let t1 = performance.now()
        setTimeout(vm.loopThroughBackgroundImages, Math.max(0, 5000 - (t1 - t0)) );
      }
    },
  }
}

</script>
