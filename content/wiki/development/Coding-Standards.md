# Quick overview
**Develop modular, clean and document your work.**

* No spaghetti code
* No code duplication
* No overengineering
* Refactor your work
* Use comments 
* Other stuff, like e.g. [Sauerbraten Uniques](#sauerbraten-uniques)

# Documentation

[See the dedicated site.](Documentation)

# Whitespace

Inexor C++ code uses four spaces for indendation. No tabs.
The CMakeFiles use two spaces for indendation. No tabs.
We never use tabs.

There should be a new line at the end of files, but no empty lines.

Lines should not have any trailing whitespace, that is any whitespace just before the new line.

## Checking

Detecting whitespace errors is pretty hard, but git provides a few tools to help us detect those.

  ```shell
  # Mark empty lines at the ends of files, trailing spaces
  # and tabs used for indentation
  $ git config core.whitespace blank-at-eof,blank-at-eol,tab-in-indent
  # Mark them RED
  $ git config color.diff.whitespace "red red"
  # Always output colored diffs
  $ git config color.diff always
  ```

And here is how you can inspect your code:

  ```shell
  # Show the history of commits with their associated, colored diffs
  $ git log -p --color
  # Check for errors in the working tree
  $ git diff --color
  # Check for errors in the stage
  $ git diff --color --cached
  # After rebasing your branch, check your entire branch for space errors
  $ git diff master
  ```
This way you won't be able to detect tabs in the middle of lines and bad indentation (using 3 spaces where 4 should be used).
Bad indentation though is clearly visible to the eye and should just be taken care of by looking.

# Namespaces: Separation of Code and Code

Generally, the code should be divided into sensible units.
These units should have a somewhat sensible API and often provide their own namespace.
Each unit must be documented sensibly.

## Root

The root of the Inexor core code is the inexor/ dir in the repo.
It's namespace is

  ```
  inexor::
  ```

The root should mostly contain modules; not actual sources.

## Modules

Modules are sets of types, functions and classes that are sort
of working together to the same end.
Modules normally reside inside the source root, but if it
really makes sense, modules may be nested.

The name of the folder and the name of the namespace should
be the same:

  ```
  inexor/graphics <-> inexor::graphics
  ```

Each module must provide a readme.md file, describing the
purpose and the contents of that module and they should
provide a header with the same name as the module, which
can be used to include the module as a whole (normally by
including all other headers in the module).

  ```
  inexor $ ls graphics/
  readme.md
  graphics.h
  ...
  ```

### The util Module

There is a module called util; this is somewhat special; In
some cases you will create a rather generic utility, which
does not really belong to the current module, but that
functionality is still so small, that it does not make sense
to create a new module for it.

In such cases the functionality might be added to the util module.

An example of such a case is the uuidgen function.

## Files

There are, of course, two kinds of files: source files and
headers. These should always be paired, with the header
containing declarations and API documentation and the source
file containing implementations.  
Header and source always share the same basename; for
the extensions ".cpp" and ".h" must be used.

  ```
  inexor $ ls graphics/
  readme.md
  graphics.h
  skybox.cpp
  skybox.h
  ...
  ```

These source files should normally not exceed 1000 lines of
code. Often it is beneficial if one source pair contains a
single class or so. If a file represents a class, it should
generally be called the same as the class itself; in this
case, PascalCase should be used.

  ```
  inexor $ ls graphics/
  readme.md
  graphics.h
  skybox.cpp
  skybox.h
  CellRenderer.cpp
  CellRenderer.h
  ...
  ```

For source pairs that do not represent a single class or struct,
snake_case names should be used.
In such cases it might be beneficial to have a separate
namespace for the file (classes/structs are sort of namespaces).

  ```
  skybox.cpp, skybox.h -> inexor::graphics::skybox
  ```

# Consistency

## Pointers

Please use `char *pointer;` instead of `char* pointer;`

## Includes

Includes within Inexor should be relative to source:

  ```
  #include "rpc/rpc.h"
  #include "net/MessageConnect.h"

  using namespace inexor::rpc;
  ```

# Sauerbraten Uniques

## String

Large parts of the Inexor codebase are not using strings but only char arrays (limited to 260 chars). For new code it is preferred to use std::string, however this might not be possible in large parts of Inexor. Here are the basics how Sauer deals with strings:

`typedef char string[260]` in tools.h

* **defformatstring(_stringname_) (_"Example %s %d and %u", char *a, int b, uint c_);**
 * defines `string _stringname_` and formats the second expression
 * e.g. `a = "Values", b = -2, c = 5` will lead to `string stringname` being `"Example Values -2 and 5"`

* **formatstring(_stringname_) (_see above_);**
 * does **not** define `string _stringname_`
 * formatting works as above

## Containers

Large parts of the codebase are using standard types (maps,
vector, list) which are implemented in shared/tools.h.
In some parts of Inexor, standard types can be used, but for
the most, we are going to run into name collisions.

### Vectors

Vectors are extended arrays, which provide numerous abilities.
Sauerbraten's vectors are not those of the vector-class in c++.

Since vectors (including the std:: ones) provide a continuous
memory segment, large bits of the codebase use vectors as string
builders.

* **Create** them with `vector<variabletype> vectorname;`

* **Add** a variable with `vectorname.add(variable);`

     The new Entry will be at the last place.

* **Use** an entry with `vectorname[i];`

* **Remove** an entry with `vectorname.remove(i);`

    This will also resort the vector (the next entry will take i's position).

    So if `myintegers[0]` is `20`, `myintegers[1]` is `35` and `myintegers[2]` is `310`

    after `myintegers.remove(0); `
    
    `myintegers[0]` is `35` and `myintegers[1]` is `310`

* **Clear** the vector with `vectorname.shrink(0);`

    or (if you do not want to delete its contents) `vectorname.setsize(0);`

* **Length** receive the amount of entries in that vector with `int len = vectorname.length();`

* **inrange** `bool hasi = vectorname.inrange(i);` tells you whether `vectorname[i]` is actually a thing. This could not be the case if e.g. i is below zero or higher than the amount of entries.

### Loops

Sauer provides it's own kind of loop short cuts; these are
macros which, basically all wrap a for loop.

  ``` loop(R, X) ```

expands to

  ``` for (int R=0; V < X; V++) ```

There is also a variant with hardcoded iterators; these are
often used to nest loops.

  ```
  loopi(X) -> for (int i=0; i < X; i++)
  loopj(X) -> for (int j=0; j < X; j++)
  loopk(X) ...
  loopl(X)
  ```

Similar constructs also exist for looping backwards:
  
  ```
  loopirev(X) -> for (int i=X; i-- >= 0;)
  ```

There are some similar named but quite different loops; this
one loops over all indices "i" of an Inexor vector "V":

  ``` loopv(V) ```

This is a bit tricks; from the constructs above you would
expect that this loops until V with a iterator variable v.

These loop constructs are a bit unsafe, because they always
cast to int and they hide variable declaration.

In many cases it's safer to use C++11's foreach, iterators
or plain old loops.
