Branches | Issues | Main developers
--- | --- | --- 
master |   | [@a-teammate](/a-teammate), [@aschaeffer](/aschaeffer)

## Motivation

Logging is an important requirement for software nowadays. Inexor is now able to log to multiple loggers, which writes to multiple targets (called sinks) with a customizable logging format. The advantage is the flexibility of the new logging system. Please notice that logoutf and conoutf have been replaced by the logging system (see Usage below).

* Log levels
  * Debug
  * Info
  * Warn
  * Error
  * Critical
* Log targets (= Sinks)
  * Inexor Ingame Console
  * Stdout / Stderr
  * Daily Logfile
  * Rotating Logfile
  * MSVC
  * Syslog
* Log format
  * Date / Time
  * Logger name
  * Log level
  * Message

## Default loggers in Inexor

* global
* chat
* gameplay
* edit
* server
* frag_involved
* frag_not_involved

## Cubescript commands

* loglevel `<logger_name> <log_level>`
  * Example: /loglevel "global" "warning"
* logformat `<logger_name> <pattern>`
  * Example: /logformat "global" "%H:%M:%S [%n] [%l] %v"
  * see [spdlog formatting strings](https://github.com/gabime/spdlog/wiki/3.-Custom-formatting) for reference 

## How to use the loggers

You can choose between stream like logging like:
```cpp
    spdlog::get("global")->debug() << "Debug message " << some_var << " " << some_other_var;
    spdlog::get("global")->info() << "Info message " << some_var << " " << some_other_var;
    spdlog::get("global")->warn() << "Warning message " << some_var << " " << some_other_var;
    spdlog::get("edit")->error() << "Error message " << some_var << " " << some_other_var;
    
    // or step by step:
    auto global_logger = spdlog::get("global");
    global_logger->info() << "Message";
```

and the more printf like python style as described [here](http://cppformat.github.io/latest/syntax.html#formatspec) looks as following:  

```cpp
    spdlog::get("global")->info("Easy padding in numbers like {:08d}", 12);
    spdlog::get("global")->info("Positional args are {1} {0}..", "too", "supported");
 
    spdlog::get("global")->info("Support for int: {0:d};  hex: {0:x};  oct: {0:o}; bin: {0:b}", 42);
    //note how we only pass one integer, but reference it multiply times with {0}
     
    spdlog::get("global")->info("Support for float precision {:03.2f}", 1.23456);
    //0 == sign aligned, 3 == width, .2 == precision, f == float

    spdlog::get("global")->info("{:<30}", "left aligned");
```

### Colors
Colors are implemented in the new logging system using ANSI color codes (24bit mode).
For ease of use 7 colors are predefined for the C++ part of the logging-system.

`COL_GREEN`, `COL_RED`, `COL_YELLOW`, `COL_BLUE`, `COL_GREY`, `COL_WHITE`, `COL_MAGENTA`, `COL_ORANGE`

They are casual (C-)strings:

```cpp
   spdlog::get("global")->info() << COL_RED << "This output is red. " << COL_GREEN << "Followed by some green stuff";
```
### Links
1. https://github.com/gabime/spdlog/wiki/1.-QuickStart Introduction to spdlog
2. http://cppformat.github.io/latest/syntax.html C++Format spec (used by spdlog for formatting)