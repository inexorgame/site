<template>
  <div>
    <div class="inner cover-top">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
            <img id="inexor_logo" class="img-fluid" src="src/assets/logo_rendered/inexor_logo_400.png">
            <h1 class="cover-heading" id="inexor_headline">Get it!</h1>
            <h4><a href="https://www.github.com/inexorgame" target="_blank">Or use the source, Luke!</a></h4>
          </div>
        </div>
      </div>
    </div>

    <div id="blackbox">
      <div class="container">
        <div class="inexor_padding d-flex justify-content-center">
          <div class="col col-md-4">
            <img class="inexor_dl_icon" src="src/assets/os_icons/mac_download2.png" alt="Download for Mac OS"><br>
            We are working on <u><a href="https://github.com/inexorgame/inexor-core/issues/385" target="_blank">macOS support!</a></u>
          </div>
          <div class="col col-md-4">
            <a href="#download" onclick="alert('Hello World!')"><img class="inexor_dl_icon" src="src/assets/os_icons/windows_download.png" alt="Download for Windows"><br>
            Download for Windows</a>
          </div>
          <div class="col col-md-4">
            <a href="#download" onclick="alert('Hello World!')"><img class="inexor_dl_icon" src="src/assets/os_icons/linux_download.png" alt="Download for Linux"><br>
            Download for Linux</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.inexor_padding {
  padding:15px;
}

#inexor_headline {
  margin-top: 30px;
}
#blackbox {
  margin-top: 30px;
  background-color:rgba(0,0,0,0.7);
  border-top:rgba(255,255,255,0.5) 1px solid;
  border-bottom:rgba(255,255,255,0.5) 1px solid;
}
#blackbox ul {
  padding:10px 0px 10px 0px;
  font-family:arial;
  font-size:24px;
  list-style:none;
  text-align:left;
}

@keyframes inexor_blink {
  0%   {box-shadow:0px 0px 10px 1px white;}
  50%  {box-shadow:none;}
  100% {box-shadow:0px 0px 10px 1px white;}
}

#inexor_button {
  width: 100%;
  margin: 40px 0;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  background-color:white;
  color:black;
  border:0px;
  border-radius:0px;
  animation-name: inexor_blink;
  animation-duration:3s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}

</style>
