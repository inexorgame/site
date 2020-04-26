---
layout:     post
date:       2020-04-26 17:00:00 +0200
author:     Hanni
title:      Vulkan API renderer release v0.1-alpha.2
summary:    v0.1-alpha.1
---
Hello fellow hackers!

Let there be octree! We are happy to announce the release of our second Vulkan API tech demo.
The release can be found here: https://github.com/inexorgame/vulkan-renderer/releases
Please download the release and try it. Make sure to update your graphics drivers before testing!

In this demo, we present a simple octree implementation which uses bistreams to store data.
The implementation supports arbitrary indentations of octree geometry.
Hold down left mouse button and move the mouse to rotate the octree.


https://user-images.githubusercontent.com/7914428/80316970-33957880-8801-11ea-9099-fc49eb94e33e.jpg

# We need your feedback! 
Please join our discord! https://discord.gg/acUW8k7 and submit your logfiles.

# Continuous integration
Thanks to the effort of our contributors, we now have Github Actions and Travis CI!
This marks an improtant contribution which ensures the overall quality of this project.

https://github.com/inexorgame/vulkan-renderer/actions

https://travis-ci.org/inexorgame/vulkan-renderer

## What is Vulkan?
![Vulkan API logo here..](https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vulkan.svg/500px-Vulkan.svg.png)

Vulkan is a new, low level API ([application programming interface](https://en.wikipedia.org/wiki/Application_programming_interface)) for high-performance graphics programming and computing. It is seen by some as the successor to OpenGL, although it is important to state that is is very different from it. Vulkan is not just a new version of OpenGL or an extension of it. Both Vulkan and OpenGL are being developed by the [Khronos Group](https://www.khronos.org/). Like DirectX 12 or Apple's Metal, Vulkan is a low level API which allows for much deeper control over the graphics card and the driver. This offers better performance (higher FPS) due to reduction of overhead and driver guesswork during runtime. In general, Vulkan does a lot of work during the initialisation of the application but therefore reduces work during rendering. Since Vulkan is much more explicit, it is neccesary to write more code and to think about how to abstract it. Rendering a first triangle for example will take much more work than you are used to from OpenGL. The benefits of this low level design outweigh the additional effort though!


## Why use Vulkan?
* Unlike OpenGL, Vulkan fits the design of modern GPUs as it is not just one single [state machine](https://stackoverflow.com/questions/31282678/what-is-the-opengl-state-machine).
* Vulkan is a low-level API which gives much more control over GPU behaviour. This reduces driver guesswork und avoids undefined behaviour of graphics drivers.
* The API is asynchronous and encourages multithreaded rendering. This is a major advantage over OpenGL! Vulkan also wants you to use the GPU asynchronously.
* Lower and more predictable CPU load which results in [better performance](https://stackoverflow.com/questions/56766983/what-can-vulkan-do-specifically-that-opengl-4-6-cannot) and a reduction of driver guesswork.
* The reduction of CPU workload and it's improved predictability can enforce the GPU to be the limiting factor (as it should be), instead of the CPU.
* Vulkan implies memory-management to be done by the application (by you) rather than the driver.
* Vulkan is a fresh start, whereas OpenGL contains a myriad of hacks to support very rare use cases.
* Available on a variety of platforms: Windows, Linux, mobile devices and much more!
* [Validation layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers) and diagnostics can be independently activated during development, allowing better error handling and debugging compared with OpenGL or DirectX. Upon release builds, the validation layers can be deactivated easily.
* Vulkan pre-compiles shaders to a [standardised bytecode format](https://en.wikipedia.org/wiki/Standard_Portable_Intermediate_Representation). This again reduces driver guesswork during runtime.
* Vulkan API and most of the drivers are [open source](https://en.wikipedia.org/wiki/Open_source)! (unlike DirectX 12 for example)
* Vulkan has layers and extensions as part of its design. For example it's easy to put steam overlay into a game simply by enabling Valve's steam overlay layer.
* Vulkan is being developed through an [unprecedented collaboration](https://www.khronos.org/members/list) of major industry-leading companies. It is not being developed by one company only (like DirectX by Microsoft). As Vulkan's motto states, it really is `industry-forged`.
* The [ending of the OpenGL era](https://www.reddit.com/r/opengl/comments/b44tyu/apple_is_deprecating_opengl/) has begun.


## Getting into Vulkan
You really should watch these expert talks on YouTube:

* [GDC 2018 - Getting explicit: How Hard is Vulkan really?](https://www.youtube.com/watch?v=0R23npUCCnw)
Dustin Land, Software engineer, id-Software.

* [DevU 2017: Getting Started with Vulkan](https://www.youtube.com/watch?v=yHZ3-AMJA6Y)
Developers from Imagination, Google and LunarG.

* [Porting your engine to Vulkan or DX12](https://www.youtube.com/watch?v=6NWfznwFnMs)
Adam Sawicki, Developer Software Engineer, AMD.

* [Vulkan Best Practices Roundtable discussion](https://www.youtube.com/watch?v=owuJRPKIUAg)
NVidia, Imagination, Qualcomm, id-Software, EPIC-games and Google.

* [Vulkan Memory Management](https://www.youtube.com/watch?v=rXSdDE7NWmA)
Jordan Logan, Developer technology engineer, AMD.

* [Vulkan Memory Managenent](https://www.youtube.com/watch?v=zSG6dPq57P8)
Steven Tovey, Developer technology engineer, AMD.

* [Vulkan: State of the Union 2019](https://www.youtube.com/watch?v=KLZsAJQBR5o)
Developers from ARM, LunarG, NVidia.


## Whats next?
The next tech demo will be released on May 10th, 2020.

Thanks you all,
Hanni
