
This serves both as a documentation and todo, these components can be used within HTML

## Level
### Description
The level component can be used to display information a single map on the UI
### Displays
* avatar - displays title and thumbnail (perhaps video based on camera drives)
* detail - displays title, creation date, modified date, video, stats (entities, plays, kills, death, efficiency) etc


### Actions
* avatar - click - open a `modal` containing the `detail` display
* detail - play, edit, fork, delete

### Options
* map - string - name of the map to show the UI for
* display - string - display type (see displays)

### Usage
`<level map="tempest" display="avatar"></level>`

## Todo

* Player (or user)
* Server
* texture
