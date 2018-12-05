Our [CMake](https://cmake.org/) system let us generate platform specific build solutions from platform independent CMake-files.

CMake starts parsing the `CMakeLists.txt` in the uppermost directory and you `add_subdirectory(<foldername>)` to include a new file.

The base of our CMake-System has partially been taken from the Google Chromium project.
However it has been adapted largely.

## Further read

Check [cmake/functions.cmake](https://github.com/inexorgame/inexor-core/blob/master/cmake/functions.cmake) to get an overview over our wrappers around standard CMake-functions and the helper-functions which aid our modular source tree.

#### Example usage for a new module

See [filesystem/CMakeLists.txt](https://github.com/inexorgame/inexor-core/blob/master/inexor/filesystem/CMakeLists.txt)