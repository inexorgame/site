# Introduction

Importing Code generally requires good knowledge about both the source domain and the target domain.
Assuming you got knowledge about the Inexor Code, here is some specifics about the most dominant Sauerbraten Code specifics.

# Sauerbraten C++ Uniques

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
