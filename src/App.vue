<template>
  <div class="site-wrapper">
      <div class="cover-container">
        <header>
          <nav class="navbar navbar-toggleable-md navbar-inverse navbar-toggleable-xl">
            <div class="navbar-collapse collapse">
              <ul class="navbar-nav">
                <li class="nav-item"><router-link class="nav-link" to="/home">Home</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/blog">Blog</router-link></li>
                <li class="nav-item"><a href="https://github.com/inexor-game/code/wiki" class="nav-link">Wiki</a></li> <!-- We need to change that to a way to get the wiki directly from the website-->
                <li class="nav-item"><router-link class="nav-link" to="/people">People</router-link></li>
              </ul>
            </div>
            </nav>
          </header>
          <div class="inner cover">
            <router-view></router-view>
          </div>
        </div>

          <footer class="footer">
            <div class="container">
            <ul>
              <li><a href="https://github.com/inexor-game/" title="GitHub"><i class="fa fa-github fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://www.facebook.com/inexorgame" title="Facebook"><i class="fa fa-facebook fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://www.youtube.com/channel/UCKOcY8wxvWq8pGLcESSpfhw" title="YouTube"><i class="fa fa-youtube fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://twitter.com/inexorgame" title="Twitter"><i class="fa fa-twitter fa-2x" area-hidden="true"></i></a></li>
              <li><a href="https://riot.im/app/#/room/#inexor:matrix.org" title="Riot"><i class="fa fa-comments-o fa-2x " aria-hidden="true"></i></a></li>
              <li><a href="https://t.me/inexor" title="Telegram"><i class="fa fa-telegram fa-2x " area-hidden="true"></i></a></li>
              <li><a href="https://docs.inexor.org/" title="Inexor API Docs"><i class="fa fa-book fa-2x " area-hidden="true"></i></a></li>
            </ul>
          </div>
          </footer>
    </div>
  </template>

  <!--style forked from Bootstrap Cover https://v4-alpha.getbootstrap.com/examples/cover/cover.css -->
  <style>
  /*
  * Globals
  */

  body {
    background: url('//src/assets/background/laucin.jpg') fixed center center no-repeat;
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
    min-height: calc(100vh - 50px);
    margin-right: auto;
    margin-left: auto;
  }

  /*
  * Header
  */

.navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link{
  color: white;
}
.navbar-nav .nav-item {
      margin: 5%;
      color: white;
  }

  .navbar-toggleable-xl .navbar-collapse {
    left: 50%;
  }

  /*
  * Cover
  */

  .cover {
    padding: 50px;
  }
  .cover .btn-lg {
    padding: 10px 20px;
    font-weight: bold;
  }


  /*
  * Footer
  */

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

  .card {
    margin: 50px;
    background-color:rgba(50, 50, 50, 0.8);
    border-radius: 5px;
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
    if (window.scrollY > 500) {
      $('#navbar').fadeOut();
    }
    else {
      $('#navbar').fadeIn();
    }
  },false);

  export default {
    name: 'app',
    data() {
      return {
      }
    }
  }

  </script>
