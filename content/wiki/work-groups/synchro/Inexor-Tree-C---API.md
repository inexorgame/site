# C++ API for creating the Inexor Tree

The Inexor Tree in Inexor Core is actually just a number of exposed variables.  
The only difference between a normal variable and a variable shared in the tree is, that upon change, the change gets distributed to all other components which have the same Tree.  

The Tree contains no functions, only data.

## Generate the invisible code

We use an in-house code generator for building the synchronization code for all *SharedVars*.
We must do this, since C++ has very poor support of [code reflection](

The "InexorGlueGen" code generator gets executed whenever the build folder was deleted or when explicitly triggered by building the target `gen_bindings_client` or `gen_bindings_server` (i.e. `make gen_bindings_client` when using make).
This is necessary when you added, removed or modified *SharedVars*.

## SharedVars
Declaring SharedVars is possible for various types of variables:

* The primitive types `char *`, `float`, `int`
* A std::vector
     * *Later: std::array, std::deque or std::map*
       * or any other which can be dropped in for these (e.g. a std::unordered_map)
* A class or struct
* *Later: A pointer to any of the above*

All SharedVars must be in **global scope**.

#### The Path in the Tree

When declaring a SharedVar it's path in the Tree is implicitly given following the *namespace* and the *class variables* in which it is contained.

Exemplary the variable `::rendering::screen.width` (where `rendering` is a namespace in which a variable of a struct-type called `screen` is placed, which contains a variable `width`) results in the path `rendering/screen/width`.

**Note:**
The namespace `inexor` – which is used in C++ as the uppermost namespace for all (non-legacy) code – gets ignored when creating the Tree path.
I.e. the variable `::inexor::rendering::screen.width` will be placed in the Tree as `rendering/screen/width`.

### Primitives

The code
```cpp
namespace rendering {
    SHAREDVAR(int, maxfps, Default(200)|Range(0, 1000)|Persistent());
}
```
creates a SharedVar of type `int` named `maxfps`.
It gets initialized with the value `200`, each time the variable is set, it is clamped to the range of 0 to 1000, see [SharedVarAttributes](#SharedVar-Attributes).
The resulting path of the variable in the Inexor Tree is `rendering/maxfps`.

### Classes SharedVars

Often a good design tries to encapsulate connected variables in a class or struct.

In the nature of C++ it is clear, that only `public` class elements can be synchronized. All *SharedVar*-elements must be public or get ignored.

```cpp
namespace inexor {
namespace rendering {
    class screen_t
    {
      public:
        SHAREDVAR(int, width, Default(1024)|Range(0, 10000));
    };
    SHAREDVAR(screen_t, screen, Persistent());
} } // ns inexor::rendering
```

### Lists of SharedVars

### Pointer to SharedVars



### Using SharedVars

You can treat the variable as if it is a normal primitive.  
For example a SharedVar `maxfps` could be used just like a normal variable
```cpp
int minframetime = 1/maxfps;
```
However when setting the SharedVar, the change will be synchronized to any other component which has the tree
```cpp
maxfps = 300;
```

## SharedVar-Attributes

With *SharedVar-Attributes* one can attach logic to the variables with minimal effort.
Each *SharedVar-Attribute* is actually a class definition, hence they get syntax-highlighted correctly in most IDEs.
Using the Operator `|` one can attach more than just a single *SharedVar-Attribute* to a *SharedVar*.

Although it is easily possible to create SharedVar-Attributes oneself, there are currently four SharedVar-Attributes usable by default.

* Default(value)
  * set the default value of the primitive SharedVar
  * if no such "Default"-Attribute is given, the default value is `0`, `0.0` or `""`)
* Range(minimal, maximal)
  * clamps the values of the numerical SharedVar (int or float) to the respective range.
* Persistent()
  * remember the value of the variable after shutdown of Inexor
* OnChange(functor)
  * execute a given code as soon as the variable changes (


**Do not use logic as arguments for SharedVar-Attributes**!
    * e.g. `Range(1024, std::min(1200, 1440))` will definitely not work!
    * Preprocessor logic is not forbidden though: defines will be correctly replaced before parsing the SharedVar.
