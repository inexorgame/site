## Installing via a graphical installer

Our installers can be found at the [website](https://inexor.org/download)

### Linux
If you need a little bit of help or are confused about the `.snap` package, here's how it works

- if you are on Ubuntu >= 16.04 you have to install nothing
- on other platforms, you will need to [install snapcraft](https://docs.snapcraft.io/core/install)
- now when you downloaded the `.snap` package all there left to do is: `snap install package-name.snap --devmode --dangerous`

In the future we are looking forward to
- ship our package with the `stable` indicator, so you won't need the `--dangerous` and `--devmode` flags any longer
- ship our package in the [uAppExplorer](https://uappexplorer.com)

# Manual install using Node.js

Your prerequisites are
- you should know a little bit of bash or cmd (on Windows)
- you will need to have Node 7 or newer [installed](https://nodejs.org/en/)

Now, open a bash / cmd prompt and run the following

- `npm install --global @inexorgame/inexor-flex # on linux this may require sudo`
- once installation finished run `inexor-flex` in your command line

This will
- start the flex daemon
- instruct flex to download the core media repositories for you
- instruct flex to download the latest stable binary release for your platform
- once everything finished, start the Inexor for you!

You can visit [http://localhost:31416](http://localhost:31416) to see the status of currently running downloads.


