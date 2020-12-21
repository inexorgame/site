# Supported File Formats

The following overview describes which file formats can be loaded by the Inexor engine.
It also discusses which formats are not supported.

## Textures

Inexor engine uses [stb image loader](https://github.com/nothings/stb), so it can load the following image formats:

* [jpg](https://en.wikipedia.org/wiki/JPEG) (recommended)
* [png](https://en.wikipedia.org/wiki/Portable_Network_Graphics) (recommended)
* [tga](https://en.wikipedia.org/wiki/Truevision_TGA)
* [bmp](https://en.wikipedia.org/wiki/BMP_file_format)

Technically, it can load the following formats, but they are not recommended:

* [gif](https://en.wikipedia.org/wiki/GIF)
* hdr
* pic
* psd

Inexor does not support [dds](https://en.wikipedia.org/wiki/DirectDraw_Surface).
As a general rule, prefer png or jpeg files for textures.

## Music / Sounds

For ingame music or sound effects, use the following formats:

* [ogg vorbis](https://en.wikipedia.org/wiki/Vorbis) (recommend for in-game distribution)
* [flac](https://en.wikipedia.org/wiki/FLAC) (recommend for recording)
* [wav](https://en.wikipedia.org/wiki/WAV) (not recommended since it's an uncompressed format)

Inexor does not support [mp3](https://en.wikipedia.org/wiki/MP3) because it is not open source.

## Models / Animations

Inexor can load the following file formats

* [gltf 2.0](https://www.khronos.org/gltf/)

The support for gltf files is based on [tinygltf](https://github.com/syoyo/tinygltf). Use gltf2 for skeletal and vertex animated characters, weapons, items, and world objects. It supports animation blending, procedural pitch animation, and ragdoll physics for skeletally-animated characters.

![gltf](gltf_logo.png)

Inexor will not support [obj](https://en.wikipedia.org/wiki/Wavefront_.obj_file) file format because [gltf 2.0](https://www.khronos.org/gltf/) is the new open source standard for 3D art, whereas obj is very simple and outdated.
There will also be no support for [fbx](https://en.wikipedia.org/wiki/FBX) or since it is not an open source format.
We will not support [iqm](http://sauerbraten.org/iqm/) or md3/md5 because it is quite outdated as well.

## Configuration files

Because Inexor engine is using [nlohmann/json](https://github.com/nlohmann/json), we can load [json](https://en.wikipedia.org/wiki/JSON) files.
Inexor engine can also load [toml](https://en.wikipedia.org/wiki/TOML) files because we are using [toml11](https://github.com/ToruNiina/toml11).
We have deliberately decided not to use json for configuration files, since json doesn't support comments in the configuration file. Instead, we are using toml for configuration files.

More reasons why not to use json for configuration files can be found [here](https://www.lucidchart.com/techblog/2018/07/16/why-json-isnt-a-good-configuration-language/) and [here](https://medium.com/trabe/stop-using-json-config-files-ab9bc55d82fa).
