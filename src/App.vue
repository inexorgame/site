<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">
        <header>
          <nav class="navbar navbar-toggleable-md navbar-inverse navbar-toggleable-xl">
            <div class="navbar-collapse collapse">
              <ul class="navbar-nav">
                <li class="nav-item"><router-link class="nav-link" to="/home">Home</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/blog">Blog</router-link></li>
                <li class="nav-item"><a href="https://github.com/inexorgame/code/wiki" class="nav-link">Wiki</a></li> <!-- We need to change that to a way to get the wiki directly from the website-->
                <li class="nav-item"><router-link class="nav-link" to="/people">People</router-link></li>
              </ul>
            </div>
          </nav>
        </header>
        <div class="inner cover">
          <router-view></router-view>
        </div>

        <footer>
            <ul>
              <li><a href="https://github.com/inexorgame/" title="GitHub"><i class="fa fa-github fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://www.facebook.com/inexorgame" title="Facebook"><i class="fa fa-facebook fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/channel/UCKOcY8wxvWq8pGLcESSpfhw" title="YouTube"><i class="fa fa-youtube fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://twitter.com/inexorgame" title="Twitter"><i class="fa fa-twitter fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://riot.im/app/#/room/#inexor:matrix.org" title="Riot"><i class="fa fa-comments-o fa-2x " aria-hidden="true"></i></a></li>
              <li><a href="https://t.me/inexor" title="Telegram"><i class="fa fa-telegram fa-2x " area-hidden="true"></i></a></li>
              <li><a href="https://docs.inexor.org/" title="Inexor API Docs"><i class="fa fa-book fa-2x " area-hidden="true"></i></a></li>
            </ul>
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

body {
  background: url('/src/assets/background/laucin.jpg') no-repeat center center fixed;
  background-size: cover;
}

/* Links */
a,
a:focus,
a:hover {
  color: white;
}

/* Custom default button */
.btn-default,
.btn-default:hover,
.btn-default:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #fff;
  border: 1px solid #fff;
}


/*
* Base structure
*/

*, *:before, *:after { /* https://css-tricks.com/box-sizing/ */
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  color: #fff;
  text-align: center;
  font-weight: bold;
}

/* Extra markup and styles for table-esque vertical and horizontal centering */
.site-wrapper {
  display: table;
  width: 100%;
  height: 100%; /* For at least Firefox */
  min-height: 100%;
  -webkit-box-shadow: inset 0 0 100px rgba(0,0,0,1);
  box-shadow: inset 0 0 100px rgba(0,0,0,1);
}
.site-wrapper-inner {
  display: table-cell;
  vertical-align: top;
}

.cover-container {
  margin-right: auto;
  margin-left: auto;
}

/* Padding for spacing */
.inner {
  margin-top: 5rem;
  padding: 2rem;
}

/*
* Header
*/

.navbar-nav {
  padding: 1.5rem 1rem 1rem 1rem;
  position: fixed;
  left: 0%;
  right:0;
  top: 0;

  background-color: rgba(11, 11, 11, 0.5);
}

.navbar-nav > li> a {
  border-bottom: thick solid rgba(255,255,255, 0);
}
.navbar-nav > li > a:hover {
  border-bottom: thick solid rgba(255,255,255, 0.5);
  transition: border-bottom, 0.2s;
}
.navbar-nav > .active > a,
.navbar-nav > .active > a:hover,
.navbar-nav > .active > a:focus {
  border-bottom: thick solid rgba(255,255,255, 0.5);
}

/*
* Cover
*/

.cover {
  min-height: 15em;
}

.cover .btn-lg {
  padding: 10px 20px;
  font-weight: bold;
}


/*
* Footer
*/

footer {
  margin: 5rem 1rem 0rem 1rem;
}

footer ul {
  margin: 0;
  margin-bottom: 1rem;
}
footer ul li {
  display: inline;
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
  margin-right:50px;
}
footer a:hover {
  color:white;
  text-shadow:1px 1px 4px black;
}

/*
 * Affix and center
 */

@media (min-width: 40em) {
  /* Start the vertical centering */
 .site-wrapper-inner {
   vertical-align: middle;
 }
}

@media (min-width: 82em) {
  .cover-container {
    width: 80rem;
  }
}

/*
* Inexor
*/

.card {
  margin: 50px;
  background-color:rgba(50, 50, 50, 0.8);
  border-radius: 5px;
}

.card h4 {
  word-wrap:break-word;
}

.text-muted {
  color: #aaa !important;
}
</style>

<script>

var i =0 ;
var bg_images = [
  "dust6.jpg",
  "haze.jpg",
  "averas.jpg",
  "cartel.jpg",
  "lager.jpg",
  "legacy.jpg",
  "laucin.jpg",
  "pandora.jpg",
  "star.jpg",
];

function loopThroughBackgroundImages() {
  /* if(i > bg_images.length -1) i = 0;
  $('#inexor_bg_outer').css('background-image', $('#inexor_bg_inner').css('background-image'));
  $('#inexor_bg_outer').css('opacity', 1);
  $('#inexor_bg_inner').css('background-image', 'url(src/assets/background/' + bg_images[i] + ')');
  $('#inexor_bg_outer').animate({opacity: '0'}, 2000);
  i++; */
}
loopThroughBackgroundImages();
window.setInterval(function () {loopThroughBackgroundImages();}, 10000);


window.addEventListener('scroll', function() {

  if (window.scrollY < 50) {
    $('nav').fadeIn();
  }
  else  {
    $('nav').fadeOut();
  }
});

export default {
  name: 'app',
  data() {
    return {
    }
  }
}

</script>
