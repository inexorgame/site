# [Conan](https://www.conan.io/) Introduction

For our package manager we provide some packages as conan is pretty new and not all our dependencies are covered from other maintainers.

Basically you have a `conanfile.py` in which you can do various things to build a dependency.

## The problems it solves

1. Binary incompatibility
   * a library built for x86 can not be linked into an executable of x86_64 (**32 bit** vs **64 bit**)
   * _[on Windows: a lib built for **Debug** can not be linked into an exe of build type **Release**]_
   * _[on Windows: a lib built with the setting MT (static runtime) can not be linked into a MD binary]_
   * _[on Linux: a lib built with a new GCC can (often) not be linked with an old GCC (vice versa its possible though)]_
   * _[on Windows: until Visual Studio 2017 every release broke the ABI -> you can't link VS 2013 built binaries when building with VS 2015]_
2. Dependency version conflicts
   * You got `libgcrypt` version 2.0 installed, the library `CEF` depends on `libgcrypt` version 1.0
       * oftentimes you can't install both in parallel and more problematically: make it findable by your build tool

These are the very crucial points which will break you neck several times as you develop in a team with several different machines. And they did to us.

But that's not even all! As soon as you invented a non-standard way of build procedure automation to get everyone on any machine building with consistent settings, you will face the situation that building those dependencies takes forever.

------

3. Cache the packages on conan.io
   * If the settings are guaranteed to be compatible -> Download a prebuilt package from conan.io

# Best practices for creating a package

http://docs.conan.io/en/latest/reference/conanfile.html gives you the basics.

Note: We assume cmake and git being installed on any machine
* Export `.pdb` files on windows
   * A linker warning will occur [(which can't be turned off)](http://www.bfilipek.com/2015/04/pdb-was-not-found-linker-warning.html) if you did not export them
* Fix absolute paths on Mac
   * [See the "Tip" section here](https://conanio.readthedocs.io/en/latest/manage_deps/conanfile_txt.html#imports)
* Avoid `apt-get`
   * using apt is a) OS dependent b) gives you back all the problems we wanted to solve.
* .. more to come