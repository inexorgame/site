## Game Features

 * Old-school fast & intense gameplay (read: similar to Doom 2 / Quake 1).
 * 23 multiplayer gameplay modes, mostly available in teamplay variants as well: ffa (free for all, deathmatch alike), instagib, efficiency, tactics, capture (domination/battlefield style), CTF (capture the flag), protect (one teammate have to carry the flag), hold (hold a randomly spawning flag for a specific time to score), collect (kill enemies and collect their skulls) and coop edit (create maps together!).
 * 7 weapons: double barrelled shotgun, rocket launcher, machine gun, rifle, grenade launcher, pistol and chainsaw.
 
## Engine Features

 * 6 directional heightfield in octree world structure allowing for instant easy in-game geometry editing (even in multiplayer, coop edit).
 * Rendering engine optimized for high geometry throughput, supporting hardware occlusion culling and software precomputed conservative PVS with occluder fusion.
 * Lightmap based lighting with accurate shadows from everything including mapmodels, smooth lighting for faceted geometry, and fast compiles. Soft shadowmap based shadows for dynamic entities.
 * Pixel and vertex shader support, each model and world texture can have its own shader assigned. Supports normal and parallax mapping, specular and dynamic lighting with bloom and glow, environment-mapped and planar reflections/refractions, and post-process effects.
 * Loading of md2/md3/md5/obj/smd/iqm models for skeletal and vertex animated characters, weapons, items, and world objects. Supports animation blending, procedural pitch animation, and ragdoll physics for skeletally-animated characters.
 * Simple stereo positional sound system.
 * Particle engine, supporting text particles, volumetric explosions, soft particles, and decals.
 * 3d menu/gui system, for in-world representation of choices. **(removed from Inexor due to refactoring of the entire UI system)**