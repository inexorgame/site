---
layout: feature
status: specification # idea | concept | specification | implemented
# authors: 
---

# Inexor Package File Format (Proposal, WIP)

The Inexor package file format is used on many points across inexor. It is used for scripts, maps, texture-packs, and more.

This file discusses the contents of the Inexor package file format in detail.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Version 0.0.1

* File extension must be `.nxr`
* File name must not include `@`.
* Directory must be compressed with [brotli](https://github.com/google/brotli).
* At the head of the directory must be an `INFORMATION.toml`, following the [TOML-syntax](https://github.com/toml-lang/toml/). For contents see section "Information File".

## Information File

The information file is the `INFORMATION.toml` which must be located at the root of each Inexor package. It must follow [TOML-syntax](https://github.com/toml-lang/toml/). Variable-names should be `snake_case`. References to other packages are implemented by dependency resolution and Package (File) Reference Strings (see *Sections [[dependency]]*, *Package Reference String*, and *Package File Reference String*).

`name` (required, string): Name of the package. Must not include `@`.

`version` (recommended, Semantic Versioning String): Version of the package.

`publication_url` (string): URL to the publication of this package.

`license` (recommended, SPDX License Identifier): License under which the work is published.

`repository_url` (recommended, string): URL of the repositories root.

`author_package` (recommended, if `head_package` is not set): Username of the author under whose name this package is published. May not be set if `head_package` is set. An author with the same value as `name` must appear in one `[[author]]` section. Must not include `@`.

`head_package` (recommended, if `author_package` is not set, string): Name of the head package to which this package belongs. May not be set if `author_package` is set. Must not include `@`.

`type` (string): Type of the package. `script`, `map`, `texture_pack`, `other`.

`include` (list of Package File Reference Strings): Other TOML-files to include and parse as information file.

### Sections `[[model]]` / `[[map]]`

A model or the octree (map) to load. Using `[[map]]` is almost only syntactic sugar. The only difference is that `model_file` must reference an Inexor Octree File format.

`name` (required, string): Name of the model.

`model_file` (required, Package File Reference String): Location of the model file to render. The referenced file must be in Inexor Octree File format if the section is `[[map]]`. Supported file formats for section `[[model]]` (without plugins): Inexor Octree Format, `gLTF`.

#### Subsections `[[appearance]]`

`x` (recommended, float): (initial) X-coordinate where the model should appear.

`y` (recommended, float): (initial) Y-coordinate where the model should appear.

`z` (recommended, float): (initial) Z-coordinate where the model should appear.

`yaw` (float): Vertical axis rotation, in degree (0-360).

`pitch` (float): Transverse axis rotation, in degree (0-360).

`roll` (float): Longitudinal axis rotation, in degree (0-360).

`scale` (float): Size of the model. `1.0` if not set.

`initial_animation` (string): Name of the animation to run at initialization. Not animated if not set.

### Sections `[[material]]`

A material is a building element with certain, special characteristiscs. A material always has to inherit from another material. The root material is `default`, which is a simple, solid building block.

`name` (required, string): Name of the material.

`inherits_from_package` (Package Reference String): Name of the package where the material from which this material inherits is located. If not set, `inherits_from` must be either from this package or `default`.

`inherits_from` (required, string): Name of the material from which this material inherits.

`alpha` (float, default=1.0): The transparency of the material.

`texture` (Package File Reference String): Texture to render when applying to a block.

`normal_map` (Package File Reference String): Normal map to use for rendering this materials.

`fall_sound` (Package File Reference String): Sound which the material makes when a player falls on it.

`run_sound` (Package File Reference String): Sound which the material makes when a player runs on it.

`viscosity` (float): Viscosity of the material. Solid if not set. `1.0` for water.

### Sections `[[dependency]]`

A dependency must be another `.inx` Inexor Package file. This may be either from a repository or from a direct link.

> Inexor issues a warning if the `repository_url` is not in the repository-whitelist or if the file will be downloaded directly, i.e. if `direct_link` is used.

`direct_link` (string): Direct link to the downloadable inexor package file.

> Using `direct_link` will always issue a warning to the user when installing the package. The user then can:
>
> 1. Abort the installation/map loading (and disconnect).
> 2. Allow the download and installation of the package.
>
> Inexor tries to detect a repository in a `direct_link` and warn the user to use the correct dependency-settings instead.

`repository_url` (string): Repository root of the dependency. Same as `repository_url` of this package if not set.

> If the `repository_url` is not in the users whitelist, the user will warned about the unknown repository. The user then can:
>
> 1. Abort the installation/map loading (and disconnect).
> 2. Allow the download of all dependencies of this package from this repository.
> 3. Trust the repository (which adds the repository_url to the whitelist).

`head_package` (string): Head package of the dependency.

`author_package` (string): Author package of the dependency.

`version` (Semantic Versioning Constraint String): Version constraints for the dependency.

### Sections `[[author]]`

Required at least once. Authors which created or helped create the package.

`name` (required, string): Username of the author of contributing to this package. Must not include `@`.

`link` (recommended, string): Link to any contact information about the author (e.g. inexor-community profile)

`work` (string): Work of the author on the package (i.e. what the author did work on like scripts, layout).

### Sections `[[attribution]]`

Attribution sections allow the attribution of authors whose work is included or used to create the contents of this file.

`author_name` (required, string): Name of the author.

`work_name` (required, string): Name of the work of the author which is attributed.

`license` (required if not unlicensed, SPDX License Identifier): License under which the work is published.

`publish_date` (recommended, string): Date when the work was published. `MM/DD/YYYY`.

`source_url` (recommended, string): URL where the file was published.

# Types

This section describes all advanced types used in `INFORMATION.toml`.

## SPDX License Identifier

String of [SPDX-identifier](https://spdx.org/licenses/) of a license.

## Semantic Versioning String

A string following the [semantic versioning format](https://semver.org/).

## Semantic Versioning Constraint String

String describing a version constraint in [composer-style](https://getcomposer.org/doc/articles/versions.md#writing-version-constraints).

## Package Reference Strings

This section contains references to other packages to distinctly define and reference single packages.

For resolving imports, the **Package Reference String** or the **Package File Reference String** must be used.

For dependency declaration **none** of them must be used. (Instead, see *Sections [[dependency]]*.)

For all other purposes, the **Package Identifier String** or the **Package File Identifier String** should be used.

### Package Identifier String

A package identifier string helps to specify a specific version of a package. Its composition is following:

`<repository_url><head:'a'[uthor] or 'h'[ead_package]>/<head_package: head_package or author-name>/<package_name>.nxr@<version>`

The `repository_url` may be skipped (defaulting to the `repository_url` of this package.

The examples of the values are based on the following example of a full, valid Package Identifier String:

`https://community.inexor.org/repository/a/nothing/textures.nxr@0.0.1-alpha`

* `repository_url` (string): Base URL of the repository. May be left empty (defaulting to the `repository_url` of this package). Must be a directory (ending with a `/`). Example:`https://community.inexor.org/repository/`
* `head` (char): Head-type of the package. Either `a` (for **a**uthor-package) or `h` (for **h**ead-package). Example: `a`
* `head_package` (string): Either the name of the head-package or the name of the author-package (and thus the name of one author) in which the package was published. Depends on attribute `head` if author-package or head-package. Example: `nothing`
* `package_name` (string): The name of the package being referenced. Example: `textures`
* `version` (string): The referenced version of the package. Example: `0.0.1-alpha`

### Package File Identifier String

A file inside a package can also be directly targeted. Its composition is following:

`<package_identifier_string>/<file_path>`

The examples of the values are based on the following example of a full, valid Package File Identifier String (extending the example of Package Identifier String):

`https://community.inexor.org/repository/a/nothing/textures.nxr@0.0.1-alpha/egypt/stone.png`

* `package_identifier_string` (Package Identifier String): Package where the file is contained in. Example: `https://community.inexor.org/repository/a/nothing/textures.nxr@0.0.1-alpha`
* `file_path` (string): Location of the file in the package being targeted. Example:`egypt/stone.png`

### Package Reference String

Reference to a package, e.g. used when importing something. The repository-url and version constraint are not included, as they are resolved by the `[[dependency]]`-sections. Its composition is following:

`<head:'a'[uthor] or 'h'[eadpackage]>/<headpackage: headpackage or author-name>/<packagename>`

The examples of the values are based on the following example of a full, valid Package Reference String (based on the example of Package Identifier String): `a/nothing/textures`

* `head` (char): Head-type of the package. Either `a` (for **a**uthor-package) or `h` (for **h**ead-package). Example: `a`
* `head_package` (string): Either the name of the head-package or the name of the author-package (and thus the name of one author) in which the package was published. Depends on attribute `head` if author-package or head-package. Example: `nothing`
* `package_name` (string): The name of the package being referenced. Example: `textures`

### Package File Reference String

A file inside a package can also be directly referenced. Its composition is following:

`<package_reference_string><file_path>`

Example (extending the example before): `a/nothing/textures/egypt/stone.png`

* `package_reference_string` (string): Package in which the file is contained. Additionally includes a trailing `/` appended to the actual Package Reference String. May be skipped, which means that this package is referenced. Example: `a/nothing/textures/`
* `file_path` (string): Location of the file in the package being referenced. If the `package_reference_string` was skipped, then this may start with
  * `/` or `~/` to reference the root of this package
  * `../` to reference the parent directory of the file where this string is used
  * `./` or any other start to reference the directory of the file where this string is used

Example: `egypt/stone.png`

# Inexor Octree File Format

The Inexor octree format describes the structure of the maps (and even models) created in Inexor.

It is further described in `InexorOctreeFileFormat.md`.