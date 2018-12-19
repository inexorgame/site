Branches | Issues | Main developers
-------- | ------ | ---
[cef_fixex_prepr](/inexorgame/code/tree/cef_fixex_prepr) | ? | [@aschaeffer](/aschaeffer)

The HTML5/JavaScript user interface provides an menu component for loading and rendering menus. Menus are the glue between several user interface components.

## Data structure

* id (string)
* title (string)
* action (string)
* subentries (array)

If a menu item has sub entries it is a menu else it is a menu entry

## Inexor Tree

The inexor tree contains the complete user interface menu tree. The menu component reads the menu tree from the inexor tree in order to build a menu dynamically. The menu is dynamic

## Menu Manager

The menu manager provides several methods for manipulating the menu tree:

* menuEntry = addMenuEntry(parentId, id, title, action)
* removeMenuEntry(id)
* renameMenuEntry(id, newName)
* moveMenuEntry(newParentId, id)

## Menu definition as JSON data structure

```
{
    'name': 'root',
    'action': 'menu',
    'subMenus': [
        {
            'name': 'multiplayer',
            'action': 'menu',
            'subMenus': [
                {
                    'name': 'Server 1',
                    'action': 'connect',
                    'subMenus': [
                    ]
                }
            ]
        } , {
            'name': 'singleplayer',
            'action': 'menu',
            'subMenus': [
                {
                    'name': 'Server 1',
                    'action': 'connect',
                    'subMenus': [
                    ]
                }
            ]
        }
    ]
}
```