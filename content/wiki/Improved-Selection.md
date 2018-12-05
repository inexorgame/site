# Cube Selection

**This is not built in yet**

## Rationale

The Sauerbraten selection is very basic at the moment:
it is possible to select cube and to delete and extrude
those. Extrusion is only possible in one direction,
therefore each selection has a direction which can be
changed.

The goal of this document is to propose a much more powerful
selection tools and a roadmap how to implement those.

### Please consider

* Selections with complex shapes
  * With diagonal edges
  * With multiple elements, not touching each other
  * With multiple cube sizes
* 3D Extrusion/Intrusion
  * Expansion? Objects just becoming bigger?
  * More modes?
* Automatic selection
  * Wizard staff
  * Surface only
* Coop Edit/sharing of selection
* Saving of selections
* Undo/Redo
* Programmatic selection. DSL?

## UX

* Add hints on which keys to use
* Add GUI that can completely replace the keys
