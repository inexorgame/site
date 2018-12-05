In contrast to the cube2 engine Inexor uses standard web technologies for user interfaces. This means the user interfaces are implemented using HTML5+, CSS3+ and JavaScript.

By super-seeding the self-implementation we introduce a lot of massive changes. This wiki page describes the function of the overall system.

### The `Inexor Core` game client

The `Inexor Core` game client uses the Chromium Embedded Framework (short: `CEF`) for rendering websites. The rendering happens in separate processes which is important for the performance of the game. Rendering the websites doesn't affect the main process of game.

A website is rendered on a transparent texture layer in front of the game. As `CEF` writes directly on the texture in the gfx memory the Inexor Core game client only has to blend the texture. This makes the user interface having a very low impact on the performance.

Furthermore the `Inexor Core` game client can handle multiple user interfaces. Each has user interface is rendered on a separate transparent texture. We call this method `layers` because we can show or hide an user interface or rearrange their order of appearance.

### `Inexor Flex`

Flex delivers the websites shown in the `Inexor Core` game client. Flex is able to provide multiple user interfaces at the same time.

Furthermore Inexor Flex also provides user interfaces for the `Inexor Core` game server or for managing Inexor Flex itself.

Ingame, UIs are applied as layers. E.g. HUD, Console and Menus.
Standalone means, that the UI can also be served as a webpage outside the game.

UIs like the HUD are not receptive to mouse or keyboard inputs, to make the main game still interactive.

Currently the following user interfaces are in development and are going to be provided by default:

| User Interface | Project | Ingame | Standalone | Description |
| --- | --- | --- | --- | --- |
| Flex | [ui-flex](/inexorgame/ui-flex) | <ul><li>[ ] </li></ul> | <ul><li>[x] </li></ul> | Management of instances, media repositories, user interfaces, logging and updating Inexor |
| HUD | [ui-client-hud](/inexorgame/ui-client-hud) | <ul><li>[x] </li></ul> | <ul><li>[ ] </li></ul> | Heads up display - providing context-relative information without mouse/keyboard input |
| Main Menus | [ui-client-interface](/inexorgame/ui-client-interface) | <ul><li>[x] </li></ul> | <ul><li>[ ] </li></ul> | Ingame dialogs like settings, profile, community, server browser. See [[Main-Menu-UI]] |
| Console | [ui-console](/inexorgame/ui-console) | <ul><li>[x] </li></ul> | <ul><li>[x] </li></ul> | The console prints text messages (chat or command output) and allows to input commands. The console is used in the game client but also in a web browser for managing game servers |
| Editing UI | | <ul><li>[x] </li></ul> | <ul><li>[ ] </li></ul> | UI to navigate and manage the editing experience. Inspecting selected entities, textures, models, etc. See [[Edit-Menu-UIs]] |

It's possible to extend Inexor to provide user interfaces as plugin. Here are some ideas:

| User Interface | Description |
| --- | --- |
| Server Admin Panel | A server owner can provide an additional user interface for the management of the server |
| Clan/Community | The game client shows information about your mates |
| Map generation UI | Tools to aid in map creation. Terrain, Blendmap and mapsettings helpers |
