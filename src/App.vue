<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">
        <header id="navbar" class="masthead clearfix">
          <div class="inner">
            <nav>
              <ul class="nav masthead-nav inexor_nav">
                <li><router-link to="/home">Home</router-link></li>
                <li><a href="#" class="not-active">Ingame</a></li>
                <li><router-link to="/blog">Blog</router-link></li>
                <li><a href="https://github.com/inexor-game/code/wiki">Wiki</a></li>
                <li><router-link to="/people">People</router-link></li>
              </ul>
            </nav>
          </div>
        </header>

        <div class="inner cover">
          <router-view></router-view>
        </div>

        <footer class="footer" id="inexor_footer">
          <p>
            <a href="https://github.com/inexor-game/"><i class="fa fa-github fa-2x" area-hidden="true"></i></a>
            <a href="https://www.facebook.com/inexorgame"><i class="fa fa-facebook fa-2x" area-hidden="true"></i></a>
            <a href="https://www.youtube.com/channel/UCKOcY8wxvWq8pGLcESSpfhw"><i class="fa fa-youtube fa-2x" area-hidden="true"></i></a>
            <a href="https://twitter.com/inexorgame"><i class="fa fa-twitter fa-2x" area-hidden="true"></i></a>
            <a href="https://webchat.freenode.net/?channels=#inexor"><i class="fa fa-comments-o fa-2x" aria-hidden="true"></i></a>
            <a href="https://t.me/inexor"><i class="fa fa-telegram fa-2x" area-hidden="true"></i></a>
            <a href="https://docs.inexor.org/"><i class="fa fa-book fa-2x" area-hidden="true"></i></a>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'Inexor'
    }
  }
}

</script>

<style>
  /*
   * Globals
   */

  /* Links */
  a,
  a:focus,
  a:hover {
    color: black;
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
    text-shadow: 1px 1px 3px rgba(0,0,0,.5), 1px 1px 3px rgba(0,0,0,.5);
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
    padding: 30px;
  }


  /*
   * Header
   */

  .masthead-nav > li {
    display: inline-block;
  }
  .masthead-nav > li + li {
    margin-left: 20px;
  }
  .masthead-nav > li > a {
    padding-right: 0;
    padding-left: 0;
    font-size: 16px;
    font-weight: bold;
    color:white;
    border-bottom: 2px solid transparent;
  }
  .masthead-nav > li > a:hover,
  .masthead-nav > li > a:focus {
    background-color: transparent;
    border-bottom-color: #a9a9a9;
    border-bottom-color: rgba(255,255,255,.25);
    text-decoration:none;
  }
  .masthead-nav > .active > a,
  .masthead-nav > .active > a:hover,
  .masthead-nav > .active > a:focus {
    color: #fff;
    border-bottom-color: #fff;
  }

  /**
   * Hacked inexor navigation
   */
  .inexor_nav {
    position:absolute;
    left:50%;
    top:15px;
    width:500px;
    height:30px;
    margin-left:-250px;
  }

  @media (min-width: 768px) {
    .masthead-brand {
      float: left;
    }
    .masthead-nav {
      float: right;
    }
  }


  /*
   * Cover
   */

  .cover {
    padding: 0 20px;
  }
  .cover .btn-lg {
    padding: 10px 20px;
    font-weight: bold;
  }


  /*
   * Footer
   */

   /*
    * Make icons white
    */
    a {
       color:white;
       margin-right:20px;
    }
    a:hover {
      color:white;
      text-shadow:1px 1px 4px black;
    }

    #inexor_footer {
      position:absolute;
      left:50%;
      top:100%;
      height:50px;
      width:400px;
      margin-top:-50px;
      margin-left:-200px;
    }


  .mastfoot {
    color: #999; /* IE8 proofing */
    color: rgba(255,255,255,.5);
  }


  /*
   * Affix and center
   */

  @media (min-width: 768px) {
    /* Pull out the header and footer */
    .masthead {
      position: fixed;
      top: 0;
    }
    .mastfoot {
      position: fixed;
      bottom: 0;
    }
    /* Start the vertical centering */
    .site-wrapper-inner {
      vertical-align: middle;
    }
    /* Handle the widths */
    .masthead,
    .mastfoot,
    .cover-container {
      width: 100%; /* Must be percentage or pixels for horizontal alignment */
    }
  }

  @media (min-width: 992px) {
    .masthead,
    .mastfoot,
    .cover-container {
      width: 900px;
    }
  }

  /* For links that are not yet active, but might be in the future */
  .not-active {
   pointer-events: none;
   cursor: default;
  }

  /* For site loading / navigation */
  .loading {

  }

  .i-masthead, .i-mastfoot {
    background-color: black;
    opacity: 0.5;
  }

  .i-container {
    margin-top: 100px;
    margin-bottom: 100px;
  }

</style>
