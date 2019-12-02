* [Windows](#windows)
* [Linux](#linux)
* [macOS](#macos)
* [Run Inexor](https://github.com/inexorgame/code/wiki/Run-Inexor)
* [Troubleshooting](#troubleshooting)

***

# Dependencies

There are seven hard dependencies currently for building Inexor.  
You will need to obtain them in some form (see the specific [Windows](#windows) and [Linux](#linux) sections below)

* git
  * a version control system
* [CMake >= v3.9.2](https://www.cmake.org/download/)
  * Generates our platform specific build code from cross platform scripts
* A Compiler
  * Translates the human-readable source code to executable binary code
* [Python](https://www.python.org/downloads/)
  * version doesn't matter, although 2.x is preferred to 3.x
  * we need it for our package manager Conan
* [Conan](https://www.conan.io)
  * Our C++ package manager for our dependencies
    * don't forget to add our Conan repository: `conan remote add inexor https://api.bintray.com/conan/inexorgame/inexor-conan --insert`

On Linux you will be able to download all these through your package manager.

# Windows

## Setup

* Download and install Microsoft [Visual Studio **2017** Community Edition](https://www.visualstudio.com) (or VS 2015 Update 2 or newer)
  * choose at least the "Desktop Development with C++" module in the setup
  * _It is essential that either 2017/2015 is installed, older version's won't work with future steps_
* Download and install Git
   * Use one of the following tools if you don't already have Git:
     * [SmartGit](http://www.syntevo.com/smartgit/download) - Feature rich, intuitive GUI [Recommended]
       * You'll need to manually [**add Git to your PATH**](https://github.com/inexorgame/code/wiki/%5BWindows%5D-add-git-to-PATH)
     * [GitHub Desktop](https://desktop.github.com) - Very simple and clean UI.
     * [git-scm.com](https://git-scm.com/download) is the official Git website, and has downloads for the CLI version, and links to several GUIs.
* Download and install [CMake](https://www.cmake.org/download/)
   * And add it to your PATH
* Download and install [Python](https://www.python.org/downloads/) and install **pip** with it
   * And add it to your PATH
* Download and install [Conan](https://www.conan.io/downloads)
   * `pip install conan`
   * `conan remote add inexor https://api.bintray.com/conan/inexorgame/inexor-conan --insert`
   * _Insert these commands into Windows Powershell or any other terminal you deem appropriate_

## Fetching the Repository

You will have to clone the Project somewhere.

* If you use SmartGit:
  * click `Repository` and `Clone` (or press `Ctrl+Shift+O`)
  * Select "Remote Git ... repository", URL = https://github.com/inexorgame/entity-system
  * On the next Page select `Fetch all Heads and Tags`
  * Select a folder on the next page. Your local Git repository will be created here. 
  * Select `Finish`

* If you use GitHub Desktop:
  * Go to the overview of our `inexor-core` repository and click on `Clone in Desktop`
  * Choose a directory in which the repository is getting cloned
  * Click `Ok`

## Create the Visual Studio files
  _(or the project file for another generator)_
Run CMake. You probably want to use the CMake Gui as [described here](#cmake-gui).

## Compile Inexor
* If you use Visual Studio:
  * Open `build/Inexor.sln `
     * It will automatically open with Visual Studio
  * Right click the **`INSTALL`** solution in solution explorer, and click build.

## Run
To be written down here.

***

# Linux
## Fetching the sources

The first step of building this project is rather obvious, but for sake of completeness here you have it.

* Download the repository, you can either use the command line ```git clone --recursive https://github.com/inexorgame/inexor-core.git``` or your favorite git GUI.

## Install the build requirements

The next step is to get all the required dependencies to compile. You'll need an environment that can build C++ programs such as Eclipse, CLion, NetBeans.

Specifically, on Linux you will need CMake >= 3.9.2, Conan, make and GCC >= 6 or Clang >= 5 as your compiler. The version numbers are minimum: They might work with older versions (but it's not official supported) and newer versions are better!
Also install your distribution's development packages of Mesa

OS  | What to do
--- | ---------------------------------------------------------------------------------------------------
Debian/Debian-derived/Ubuntu | `sudo apt-get install git cmake build-essential nodejs python-pip` <br> CEF dependencies (you will get automatically asked to install those when you run Conan): `sudo apt-get install libpangocairo-1.0-0 libxcomposite1 libxrandr2 libxcursor1 libatk1.0-0 libcups2 libnss3 libgconf-2-4 libxss1 libasound2 libxtst6`
Fedora   | `sudo dnf install git cmake mesa-libgl-devel`
OpenSUSE | `zypper in -t pattern devel_C_C++` then run `zypper install mesa-libgl-devel node cmake git`
ArchLinux | Run `sudo pacman -S --needed git cmake mesa mesa-libgl glew glm`. [`conan`](https://aur.archlinux.org/packages/conan/), [`freeglut`](https://www.archlinux.org/packages/extra/x86_64/freeglut/), [`esound`](https://aur.archlinux.org/packages/esound/) (AUR) is also required. <br> CEF dependencies: `sudo pacman -S --needed pango cairo libxi libxcomposite alsa-lib libxtst gconf libxrandr`.

### Installing conan.io
Conan.io is usually to be installed using the python package manager `pip`
Simply `pip3 install conan --user` should do it.

Afterwards you need to change the compiler version in `~/.conan/profiles/default` to
```
compiler.libcxx=libstdc++11
```
TODO: modify this file or add another profile when executing the CMakeLists.txt.

## Running CMake

Run CMake, which generates build files or project files for your favourite IDE or tool.
If you have CMake in your path you can run `(mkdir build && cmake ..)`, you probably will need to add a `-G "<generator>"` flag to make it generate a project file for your precious IDE (you do not need this for makefiles on linux).  
Alternatively use the example lines below.

The most commonly used generators will probably include `Visual Studio`, `CodeBlocks`, `MinGW Makefiles`, `Unix Makefiles` and `Xcode`. There are also makefiles for Eclipse, Sublime Text and a lot others. The complete list can be found [here](https://cmake.org/cmake/help/git-master/manual/cmake-generators.7.html).

### Parallel builds

You need to set the environment var `MAKEFLAGS` to include the numbers of cores you can use.
(With conan we build all dependencies if not previously build. **So set this before running Conan**)

Do `setenv MAKEFLAGS '-j 8'` or `export MAKEFLAGS='-j 8'` before building for having 8 jobs running (usually you want `jobs = your_number_of_cores + 2` 2 is a margin for disk IO)

### Examples

TODO:
```bash
(mkdir build && cd build && conan install .. --build=missing && conan build ..) # Should work for any setting any compiler, any OS
# By default conan install uses build_type `Release`.
(mkdir build && cd build && conan install .. -s build_type=Debug --build=missing && conan build ..)
# to create a debug build and build it.
(mkdir build && cd build && conan install .. -s compiler=gcc -s compiler.version=6.3 --build=missing && conan build ..)
# to set a specific compiler and version if you got multiple ones installed. you need to
# Reading some stuff up in the Conan docs might be helpful here
# Furthermore you need to export CC and CXX enviroment variables, search the net for infos.
```

## Actually building the sources


##### Otherwise:
This step greatly depends on your IDE or environment but if you have used makefiles you can probably just run `(cd build && make install)`. Add `-j<number of cores>` to make to run it multithreaded. Note that `make install` will not install any files globally, but only within the directory structure of the project.

## Run

TODO

# Other

**If anything fails:  Remove your build folder, try again.** ("did you try to restart it?")

## CMake GUI

The order is:
1. you run `CMake` in the build dir.
2. you run `make` in the build dir / open the IDE specific file.

The first step might allow some better costumisations with the CMake Gui (as you see all parameters in the overview)

   * Select your Inexor root directory for `Where is the source code`
   * Create a new directory within the root directory named `build`
   * Select the new `build` directory for `Where to build the binaries`
   * Click `Configure`
   * Select your desired generator
     * If you use Visual Studio select VS-Version *Visual Studio 15 2017* and (if you have) the x64-Version so e.g. `Visual Studio 15 2017 Win64`
   * Click `Generate` to generate a project file


# macOS
  * if you haven't already install [brew](https://brew.sh)
  * execute `brew install conan`
  * execute `brew install git`  
  * we only supporting Apple Clang >= 9.0



# Troubleshooting

This is a list of common problems and their solutions

* `Keep your directories clean, don't build in the main directory!`
  
   This error means that you are telling CMake to generate project files inside the project's root directory.
   You should keep your root directory clean and create a directory named build inside the root directory.
   Then tell CMake to generate to that directory instead of the root directory.
   To do this from the commandline, just use `(mkdir build; cd build && cmake -G "<your generator>" ..)`.
