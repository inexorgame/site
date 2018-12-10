This page serves as simple basic instruction on how you can eliminate a lot of crashing bugs by simply using some tools!

Firstly you will probably notice that on crash you see a log of lastly executed commands (on Windows you see that in an additional appearing window, on Linux and OS/X it appears in the command line and of course in the log.txt file.)

What we do now is called *stepping* and it basicly means you go step by step through your program to see which line of code the error caused.

# Stepping on Windows (Visual Studio)

To enable stepping you have to set your configuration to Debug (Release won't work).
Now we need to find a way to start your executable inside Visual Studio. This requires the following steps:

### Start Inexor inside VS
1. Copy all necessary shared libs from `bin/windows/__your_architecture__/´ to your executable intermediate folder `build/inexor/client/Debug`
  * this basicly means you copy all files from the old place, except inexor.exe and inexor.pdb
  * if you do not have files inside `bin/windows/__your_architecture__/` (your_architeture of course beeing either win32 or win64 depending on your system), you need to build the `install` project inside your inexor solution once.
2. Set an execution folder (and arguments)
  1. Right click the `inexor` project inside your solution explorer, select `Properties` (Straight down on the bottom of the list)
  2. Select the `Debugging` section
  3. Add `-t0 -kmedia/core` to `Command Arguments` (This means we always want to start in windowed mode and since the data and code repo are seperated, media/core sets the path to where you cloned the data repo into)
  4. Forward the `working directory` to the base dir of your inexor project (or where your data repo is)
    * that's the place you'd normally start the inexor.bat from, so one above `media`
  5. Save and close
3. Set the `inexor` project as the startup project
  * This is done by right clicking the `inexor` project in the solution explorer again and selecting `Set as Startup-Project`

Now, we can start Inexor inside Visual Studio by simply pressing the `Debug` button in the toolbar (The play button in the upper middle of your screen :P ).

Now to the next and last part:

### Find the bug

Luckily we do not start from scratch, we`ve got some starting point: our output of the lastly executed functions!
So what we want to do now is:
 
1. Pause the program just before the bug probably occurs
2. Going step-by-step (call by call, function after function) forward, checking values and when what causes the bug.

For doing 1., we need to set a `Breakpoint` that is done by either:
* Right clicking a specific code line (in your place i'd choose the second last function of the callstack and in that function the first line after the brace) and select 'Breakpoint' -> `Insert Breakpoint`
* Or shorthand by just clicking left of the text line in the reserved area.

A red point will appear left of your line, marking that specific spot.

Now you have to start the program (click the Play-Button ;) ) and try to reproduce the bug somehow (if it lastly appeared while shooting rockets, you .. well you get the point)

Yay! We made it till here, now make it to the end: You'll notice that your program stopped and threw you back to the text-editor. The Breakpoint line is now also marked with a yellow arrow. This arrow marks your current line.

Now to the find the actual stepping:

You can control how fastly your code continues by using the Debug-Tool-Bar (it freshly appeared, there will be some arrows saying `Step over`, `Step into`, `Step out`.. if you hover them in your upper middle toolbar.
You can check values of variables by simply hovering them.

Here you go, you can find the error now easily by going step by step through your program till it crashes, noting the line and what values the variables in your line had when it crashed!


***


## Use external debuggers
If not anything works, try to use external debugging tools.
Thanks to [VALVE's Vogl](https://github.com/ValveSoftware/vogl), there is finally a good OpenGL graphic debugger out there. There is also [apitrace](https://apitrace.github.io/).

# Linux (gdb)

On Linux, the powerful gdb debugger is available. It features many capabilities to trace the programs' execution and monitor the programs' internal variables. It is even possible to call or return from functions in the middle of a debugging session independently of the normal execution.

Note that especially beginners should consider a frontend which features a graphical user interface. Here, the usage of gdb itself is explained.

## Preparation

Like inexor, the program should be compiled with debugging symbols.

In order to use ptrace in gdb the following command should be issued as root:

    # echo 0 > /proc/sys/kernel/yama/ptrace_scope

## Connect inexor to gdb

Start inexor like you normally would.

First, you have to find out the PID of the inexor process. That happens by issuing

    $ ps a | grep ./bin/linux/x86_64/inexor | grep -v grep | grep -v xargs

The first number is the PID which you are looking for.

Next, start gdb with the inexor executable as its only command line option:

    $ gdb inexor

To connect inexor to gdb, type in gdb

    (gdb) attach PID

where PID is the PID you got in the previous step.

## Debugging with gdb

There are plenty of tutorials on how gdb is used for debugging. Here, only the basics are explained for quick reference.

### Stop and continue execution

To stop the execution of inexor at any time, send the signal SIGINT to gdb by pressing \<ctrl+c\>.

To continue the execution after that or after a breakpoint has been triggered, enter

    (gdb) continue

### Backtrace

Especially if the program crashes

    (gdb) backtrace

gives a list of the functions that you get if you follow the stackframes back. That is useful to get a general idea where the problem might be. An alias that might be easier to remember is

    (gdb) where

### Breakpoints

Breakpoints are marks in the code at which the execution of a program should be paused. That gives opportunity to examine the state of the program. There are many options to place a breakpoint. One would be

    (gdb) break octaedit.cpp:42

where octaedit.cpp is the file and 42 is the line you want the breakpoint to be. Instead of a line you can also put a function name. You can also use classes and methods like in

    (gdb) break LinkedList<int>::remove

A list of breakpoints is available through

    (gdb) info break

You can disable breakpoints with

    (gdb) disable <number>

where \<number\> is the number of the breakpoint. To enable the breakpoint again, enter

    (gdb) enable <number>

To pause the program on breakpoints conditionally, issue

    (gdb) condition <number> <condition>

where \<number\> is the number of the breakpoint and \<condition\> is the condition that has to be valid in order to pause the program. An example for that would be

    (gdb) condition 1 item_to_remove==1

### Watchpoints

If you are rather interested in a variable than in a code segment, watchpoints might be a better alternative to breakpoints. Watchpoints are triggered if a particular variable is accessed.

You can place watchpoints by

    (gdb) watch <variable>

where \<variable\> is the variable of interest. The program stops if \<variable\> is modified. To stop the program as soon as the variable is read, issue

    (gdb) rwatch <variable>

and if you want to stop the program in both cases – if the variable is read from or written to – enter

    (gdb) awatch <variable>

Watchpoints are listed together with breakpoints

    (gdb) info break

and can also be disabled and enabled again.

### Examine

As soon as the program is stopped by sending SIGINT or triggering a breakpoint/watchpoint, the state of the program can be looked at more closely. There is a huge number of options how to examine the memory with gdb. Here, the most important are explained.

To list all the parameters of the current function, call

    (gdb) info args

and to list all the local variables of a function, call

    (gdb) info locals

If you want to print the value of one single variable, issue

    (gdb) print <variable>

### Stepping

After a breakpoint or watchpoint has been triggered, you can go one step further by issuing

    (gdb) step

which will also step into functions that are called. To avoid that and stay in the current function, you can issue

    (gdb) next

## Quit

To exit gdb, enter

    (gdb) quit

# Debugging tricks

## Sauerbraten debug leftovers
command name | parameter | function | appearance
---------------- | --- | ------------------------- | ------------------------- | 
/debugao | 0 or 1 | debug ambient occlusion (?)| ? | | 
/debugdepthfx | 0 or 1 | debug depth function | rectangular area in top left screen | | 
/debugglare | 0 or 1 | debug glare shader (/glare must be 1) | rectangular area in top left of the screen | | 
/debugjson | 0 or 1 | debug JSON parser? | ? | | 
/debugparticles | 0 or 1 | debug the old Sauerbraten particle system | text table in left middle of the screen | | 
/debugparticles | 0 or 1 | debug the old Sauerbraten particle system | text table in left middle screen | | 
/debugsm | 0 or 1 | debug shadow map | rectangular area in top left of the screen | | 
/debugsm | 0 or 1 | debug shadow map | rectangular area in top left of the screen | | 
/aidebug | 0 - 6 | debug artificial intelligence (bots) | shows waypoints, additional text and text over bots | |
/dbgalias | 0 - 5 | debug alias lookups? | ? | | 
/dbgblob | 0 or 1 | ? | ? | | 
/dbgdds | 0 or 1 | ? | ? | | 
/dbgdec | 0 or 1 | ? | ? | | 
/dbgexts | 0 or 1 | ? | ? | | 
/dbgffdl | 0 or 1 | ? | ? | | 
/dbgffsm | 0 or 1 | ? | ? | | 
/dbggrass | 0 or 1 | ? | ? | | 
/dbggz | 0 or 1 | ? | ? | | 
/dbgmodes | 0 or 1 | ? | ? | | 
/dbgmovie | 0 or 1 | ? | ? | | 
/dbgpcull | 0 or 1 | ? | ? | | 
/dbgpseed | 0 or 1 | ? | ? | | 
/dbgubu | 0 or 1 | ? | ? | | 
/dbgvars | 0 or 1 | ? | ? | | 
/dbgzip | 0 or 1 | ? | ? | | 

## Miliseconds and SDL_GetTicks()
So far you can use [SDL_GetTicks()](https://wiki.libsdl.org/SDL_GetTicks) to get the number of miliseconds since the SDL initialisation (program start.)
`unsigned long ulStartTime = SDL_GetTicks(); // Store current time
SDL_Delay(100); // Wait 100 miliseconds
unsigned long ulEndTime = SDL_GetTicks(); // Store end time
conoutf(CON_DEBUG, "Well that took around %llu miliseconds..", ulEndTime - ulStartTime);`

## Do something every 5 seconds (workaround)
Some things are just way too heavy to print every sub-calculation to the screen. You should limit the output.
One method to do this is to calculate the modulo of SDL_GetTicks(). It's very dirty though because some calls could be skipped!
`
if(SDL_GetTicks() % 5000 <= 20) {
    // How long was it ago that another five seconds passed?
    conoutf(CON_DEBUG, "See you in 5 seconds again!");
}
`

## Using static variables to control code flow
As you surely know, static variables keep their values and will not be deleted from the Stack after the function is called. They are very similar to global variables but can't be accessed outside of the code block (block scope).

`for(int i=0; i<100; i++) {
     static int test = 0;
     test++;
     if(test > 30 && test < 40) conoutf(CON_DEBUG, %d lays between 30 and 40, i);
     // break, continue...
}` 
