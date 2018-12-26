
## Starting Inexor Flex

In the `flex` folder execute:

```
npm start
```

This will start Inexor Flex with the default profile which is adjustable via the Flex User Interface. See below for a more advanced usage.

## The API's of Inexor Flex

Inexor Flex provides a set of interfaces for machines and humans: `REST`, `CLI`, `URL`, `web application`

### API Call Hierarchy

* Inexor Flex REST API
  * User Interface (Browser)
  * Inexor Flex TreeClient (NodeJS module)
    * Inexor Flex Command Line API
      * Inexor Flex URL Scheme Handler
    * Other remote instances of Inexor Flex (for example: Synchronization of the server list)

### REST API

The core API of Inexor Flex is the REST API. All other possibilities uses the REST API directly or indirectly. Inexor flex starts a webserver (default port: `31416`) which provides the RESTful API and the user interfaces.

The REST API is prefixed by `/api` and an API version `/v1`:

```
http://&lt;localhost|hostname&gt;:31416/api/v1/ ...
```

Follow this link to see what's possible with the REST API: `TODO: link to generated REST API docs`

### Inexor Flex TreeClient

The Inexor Flex TreeClient is a NodeJS module which can be used to interact with a local or remote instance of Inexor Flex. This means you can write a NodeJS module, `require` the TreeClient module and call the provided methods without the need of creating RESTful HTTP request by yourself.

Moreover the Inexor Flex TreeClient can be used by Inexor Flex itself in order to communicate with other remote instances of Inexor Flex. For example the `ServerListManager`, which contains a list of all available servers, fetches the server list of other servers.

### Inexor Flex Command Line API

The Command Line API allows humans and scripts to interact with a running local instance of Inexor Flex from the command line. As mentioned above, the `Command Line Tool` uses the Inexor Flex TreeClient.

```
flex/inexor &lt;command&gt; &lt;subcommand&gt; ...
```

A full list of available command can be found here: [Command Line Options And Commands](../../run/Command-Line-Options-And-Commands.md)

The Command Line API is important for the desktop integration like the Linux `.desktop` files.

### Inexor Flex URL scheme handler

Another way of interacting with Inexor Flex is the URL scheme handler. By `opening` an URL starting with the protocol `inexor:` you can use the same commands as the Command Line API because the URL passed through to the Command Line API.

```
inexor:&lt;command&gt; &lt;subcommand&gt; ...
```

## Instances

### Lifecycle States

| State Name | Description                                         |
| ---------- | --------------------------------------------------- |
| stopped    | The Inexor Core instance exists, but is not running |
| started    | The Inexor Core instance is running                 |
| paused     | The Inexor Core instance is paused                  |
| starting   | The Inexor Core instance is starting                |
| stopping   | The Inexor Core instance is stopping                |

#### State Transitions

| Source State | Transition Name | Target State |
| ------------ | --------------- | ------------------------------------ |
|              | create          | stopped |
| stopped      | start           | started |
| started      | pause           | paused  |
| paused       | resume          | started |
| started      | stop            | stopped |
| stopped      | remove          |         |

### Inexor Tree Structure

| Tree Path                           | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| /instances/:instance_id/name        | The name of the instance                                     |
| /instances/:instance_id/name        | The grpc port                                                |
| /instances/:instance_id/description | A description text                                           |
| /instances/:instance_id/type        | The instance type (either server or client)                  |
| /instances/:instance_id/state       | The state (either 'stopped' or 'started')                    |
| /instances/:instance_id/instance    | The instance object (internal, contains the process handler) |

### How to start Inexor Flex with arguments

Start with debugging enabled:

```
npm start -- --level=debug
```

Start with even more debugging enabled:

```
npm start -- --level=debug
```

Start with profile `devenv` (please check out the documentation about profiles!):

```
npm run dev
```

Start with profile `devenv` with extensive debugging:

```
npm run dev -- --level=trace
```

Start with profile `devenv` and set a log file to use:

```
npm run dev -- --file=/tmp/test.log
```