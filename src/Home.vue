<template>
  <div class="container">
    <img id="inexor_logo" class="img-fluid" src="src/assets/logo_rendered/inexor_logo_400.png">
    <h1 id="inexor_headline" class="cover-heading">Fast classic gameplay crossed with modern technology.</h1>
    <div id="inexor_blackbox">
    </div>
    <p class="lead">
      <ul id="inexor_ident">
        <li>Cooperatively create levels with the built-in map editor.</li>
        <li>Master manic multiplayer matches.</li>
        <li>Made with love, not money.</li>
        <li>It's free and open source.</li>
      </ul>
    </p>
    <p id="inexor_downloadbutton" class="lead">
      <a href="https://github.com/inexorgame/code/wiki/Install-Inexor-in-five-minutes" id="inexor_button" class="btn btn-lg btn-secondary">DOWNLOAD</a>
    </p>
  </div>
</template>

<style>

#inexor_logo {
  position:absolute;
  left:50%;
  top:100px;
  margin-left:-200px;
  margin-top:20px;
  margin-bottom:50px;
}

#inexor_headline {
  position:absolute;
  left:50%;
  top:280px;
  font-size:37.6px;
  margin-left:-440px;
  text-shadow:1px 1px 4px black;
}

#inexor_blackbox {
  position:absolute;
  left:0px;
  top:380px;
  width:100%;
  height:165px;
  background-color:rgba(0,0,0,0.7);
  border-top:rgba(255,255,255,0.5) 1px solid;
  border-bottom:rgba(255,255,255,0.5) 1px solid;
}

#inexor_ident {
  position:absolute;
  left:50%;
  top:380px;
  padding:10px 0px 10px 0px;
  font-family:arial;
  font-size:24px;
  list-style:none;
  text-align:left;
  margin-left:-440px;
}

#inexor_downloadbutton {
  position:absolute;
  left:50%;
  top:500px;
  width:200px;
  margin-left:-100px;
}

@keyframes inexor_blink {
  0%   {box-shadow:0px 0px 10px 1px white;}
  50%  {box-shadow:none;}
  100% {box-shadow:0px 0px 10px 1px white;}
}

#inexor_button {
  background-color:white;
  color:black;
  border:0px;
  margin-top:200px;
  border-radius:0px;
  animation-name: inexor_blink;
  animation-duration:1s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}

/*
* styles small displays
*/
@media (max-width: 900px) {
  #inexor_logo {
    top:300px;
  }

  #inexor_headline {
    top:500px;
    width:300px;
    left:50%;
    margin-left:-150px;
  }

  #inexor_blackbox {
    top:700px;
    height:200px;
  }

  #inexor_ident {
    top:700px;
    text-align:center;
    margin-left:-200px;
    width:400px;
  }

  #inexor_downloadbutton {
    top:800px;
  }
}

</style>
