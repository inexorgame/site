This document describes how Inexor code should be documented.
New code must always adhere to those rules.

The source code of Sauerbraten is mainly uncommented at the moment, but we are about to change that. Every new populated code should be clearly understandable, not only for you. The goal is to be get a quick overview by just reading the comments.

Commenting is not a hard task, but an important one. Your future self and other developers will appreciate the minutes you spend commenting.

Furthermore a tool generates the documentation in HTML format which will be [published on the website](https://docs.inexor.org).

# Generating Documentation

To generate the HTML documentation, install Doxygen and
run it in the document root:

  $ doxygen doxygen.conf

# What should be documented

In General the interface anything exposes must be documented,
in C++ code this would include the following:

* Classes/Structs should have a description header
* Functions, Methods and Macros should be commented in terms of
  + Arguments
  + Return Value
  + Side Effects (what state does this function alter)
  + Possible exceptions/Error Flags
  + Overloads
* Class/Global Variables should have a description
* Typedefs should also have a description
* Templates in general should have an extensive documentation
* Files should have a documentation, describing roughly what kind of stuff the file contains.
  + if the file name is a bit cryptic, for instance `skelmdl.h`, the first lines should contain something like:
  > /// Skeletal Models Header:  
    /// Header for model file formats with embedded skeletons

  + Files that are implicitly documented do not need a documentation, this includes
    - implementations of header files (`Fnord.cpp `is already commented in `Fnord.h`)
    - [Module][2] headers (`inexur/gui/gui.h`), because the module should already be documented (`inexur/gui/readme.md`)

# Comment Style

Comments that are not _Documentation_ (e.g. inside a method, sometimes implementation details) should always use C-Style online comments

```c++
    // This describes some implementation detail that is only
    // important for people touching this code, not for people
    // who only need to call this function we're inside.
```

Classes, functions, methods, fields must have API documentation,
this style uses triple-slash style.  
This is made up of a short description (The first line until
the dot) and some more elaborate documentation (The short
description and any text after that).
In addition to the description, some semantic information can
be added; these tags use javadoc at notation and are primarily
used to declare the input and output of functions.

```c++
    /// Safety dance.
    ///
    /// You can leave your friends if you want to,
    /// you can leave them all behind.
    ///
    /// @tparam I am a dirty object.
    /// @param Something old, which I will wear on my head.
    /// @param Something borrowed, which I will wear on my foot.
    /// @sideeffects Takes an object away from the fire.
    /// @return A pair of new things, the first made with the
    ///         old object and something from the fire; the
    ///         second made by combining the old and the new thing.
    /// @see fire
    /// @see std::pair
    template<typename T> std::pair<T,T> dance(T old_, T new_) {
      T flaming = fire->takeFlaimigObject();
      return std::makepair(old_+flaiming, new_+old_);
    }
```

Any documentation and any comments in general may be formatted using markdown syntax.

[Modules][2] should have a documentation inside a readme.md file.

[2]: https://github.com/inexorgame/code/issues/70 "Suggestion for a code module structure"
