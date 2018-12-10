# What's a HUD?

 - It shows game data like health, armor, crosshair, minimap...
 - It's a layer that is being rendered over the rendered game scene.
 - It does not accept any keyboard or mouse 

# What should & could be displayed

 - Server Log
 - Crosshair
 - Minimap
 - Health
 - Armor
 - Available Weapons
 - Ammunition (of the currently used weapon)
 - Kill feed
 - Scoreboard
     * Teams
     * Score
     * Gamemode
     * Map
     * Time left
     * Player-stats
          - Name
          - Ping
          - Clientnum
          - Kills
          - Death
          - Accuracy
          - Playermodel
 - Meta-Data
     * fps
     * network-stats

# How to implement?

Our approach on implementing a HUD is by using widgets.
One widget should implement one thing at a time: The Server Log, Crosshair, Scoreboard and so on.
A widget might be positioned and scaled by the user. 