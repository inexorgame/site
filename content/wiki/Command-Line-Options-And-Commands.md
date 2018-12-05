### Configuring Inexor Flex

```
node server/index.js flex <port> [host] [webdir] [binary]

Option      | Type   | Default    | Description
----------- | ------ | ---------- | -----------
port        | number | 0          | The port of the flex webserver
host        | string | localhost  | The hostname to listen on.
webdir      | string | inexor-ui/ | The path to the user interface
binary      | string | null       | The path to the Inexor Core binary
```

### Command Line Commands

```

# By default Inexor starts an client
./inexor

# Starts a new client
./inexor start client

# Starts a new client with the given parameters
./inexor start client --width=640 --height=480 --fullscreen=0

# Starts a new client with the options in the given configuration file
./inexor start client --config=user.toml

# Starts a new client with the given map
./inexor start client --map=pandora

# Starts a new server with the given instance id and port
./inexor start server --instance=30001 --port=30000

# Starts a new server with the options in the given configuration file
./inexor start server --config=server.toml

# Adds a mediadir globally and for all already running instances
./inexor mediadir add /usr/local/share/games/inexorgame/data

# Adds a mediadir for the given instance id
./inexor mediadir add /usr/local/share/games/inexorgame/data --instance=30001

# Updates the tree
./inexor tree inexor.tree.path.to.the.node=value

```

[Implementation details](https://www.npmjs.com/package/yargs#commandmodule) for [yargs](https://www.npmjs.com/package/yargs) commands

### Sauerbraten Command Line Options

http://sauerbraten.org/docs/config.html#command_line_options
