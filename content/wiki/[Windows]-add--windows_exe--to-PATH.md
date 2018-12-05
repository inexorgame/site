Adding the location of program executables to the `PATH` environment variable is needed to execute them on the command-line. Hence some scripts won't work otherwise

To do that, we do it here on the example of git:


## 1. Locate git.exe

If you already know the installation path for your Git software and the location of git.exe, go directly to Stage 2 below.

The location for git.exe will vary depending on what Git-software you have installed!  
The git.exe file is located inside your Git-software installation directory, usually inside a folder called bin.  

You could just use the default location (see below) if you haven't changed any location in the installer manually.
Or you could search for `git.exe` on your harddrive (_Note: If you are patient use the windows search. Otherwise use [Everything](https://www.voidtools.com/) to get search results instantly._)

Some examples of standard locations:

| Software | Standard location |
| -------- | ------------------|
| Git      | C:\Program Files (x86)\Git\bin |
| SmartGit | C:\Program Files (x86)\SmartGit\git\bin\git.exe |
| GitHub For Windows | C:\Users\'username'\AppData\Local\GitHub\PortableGit_'numbersandletters'\cmd\git.exe |

## 2. Set the git.exe path in the PATH environment variable

* Right-click My Computer on your desktop or start-menu, and select Properties.
* Click the Advanced system settings tab.
* Click the Environment Variables button.
* Under System Variables, click PATH (can also be called Path) and click Edit.
* Paste the location to your git.exe and insert a semicolon at the end as a separator between what you just pasted and what was already there (No spaces).

