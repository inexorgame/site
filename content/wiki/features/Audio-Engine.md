---
layout: feature
status: concept # idea | concept | specification | implemented
authors: azkoonn
---

# Audio Engine
## Goals
> The overarching goal is to implement `module_sound` in order to further refactor and modularize Inexor's code.
* Multithreading
	* allows realtime effects based on available resources
	* guarantee a sound will be played in time
		(don’t block other threads or get blocked by them – we need to write to the buffer timely)
* Asynchronous resource loading
	* Allow for flexible memory allocation based on currently present sound sources
	* A must for vast sound repository and editing environment
	* play a short, quiet 440Hz sine wave tone if a file is missing for easy map debugging
* Class-based code design
	* a modern way to ensure easy usage and interoperability
* Accessibility
	* sound system should be able to generate subtitles
	* useful for debugging as well

### Proposed tooling:
* OpenAL Soft – https://openal-soft.org/
* ALMixer
* ogg Vorbis audio codec

#### Alternatives for OpenAL Soft:
* [rtaudio](https://www.music.mcgill.ca/~gary/rtaudio/)
* [PortAudio](http://www.portaudio.com/)
* [SoLoud](http://sol.gfxile.net/soloud/)
* [AudioKit](https://audiokitpro.com/)

## Music structure
Unlike sounds, which are played back as a reaction to certain actions and events, music is only played back as a single instance in the background. While such separation of music and sounds is logical and should be maintained, instead of a single, simple, premixed track, Inexor is planned to utilize dynamic music compositions which react to in-game events.

Modifiers such as enemy distance factor, health, speed, amount of enemies will influence both mixing of different stems as well as effects (e.g. low health would put low-pass filter on everything; muting drums on death; leaving just the atmos on map selection screen or adding reverb when paused). To achieve this, musical compositions must be prepared as separate stems (that is, a separate file for each layer like drums, lead melody, ambiance and so on), perhaps considering alternative layouts (such as a faster drum track when there are many enemies with clear line of sight).

Instead of multiple high quality streams for each song it’s better to utilize tracker-like approach, e.g. every drum sample is only saved once and played every time. (MIDI allows for the same level of control, however it is unable to store samples by itself; hence a combination was needed). Appropriate FX will allow for the music to sound like it’s a harmonious track, e.g. by allowing the artist to sidechain everything with kickdrum, no matter which version of drum track is playing. Additional modes, such as single-instance (i.e. previous playback of a drum is cancelled on re-trigger), will further simplify and shorten the design process for such soundtrack.

### Implementation
It is suggested to have separate entities for managing sounds and music because of huge differences outlined above. Music engine would listen for in-game events and game states and appriopriately mix music without user intervention, simply given a track ID when loading a map.
Another possibility is to generate the music procedurally, however it may not allow for as much control over the quality.

Sound engine would most likely need access to some sort of level geometry (compare with next section), as well as in-game states (e.g. some guns emit additional warning sound when shooting out the last bullets).

## Realtime 3D sound propagation
Realistic 3D graphics in realtime are quite developed these days. 3D sound propagation however is still not really in the focus of development. Sadly, there is no open source library for this to this day. Time to change this!
This would require our materials to sport their auditory behaviour besides their visual nature. This mean additional parameters for sound such as transmissiveness, reflectivity and attenuation, or absorption for different pitches. Another parameter than could be determined based on material as well as geometry is resonance – explosions could shake walls. This data could be useful in future for physics – harder materials are better conductors for sound and withstand more, but tend to fail in more vigurous manner.

### Examples:
[Raya Space Station Scene – YouTube](https://www.youtube.com/watch?v=EWatzCC7rk0)

[GSound Demonstration – YouTube](https://www.youtube.com/watch?v=buU8gPG2cHI)

[RAYA - realtime game audio engine in Quake 3 – YouTube](https://www.youtube.com/watch?v=05EL5SumE_E)

[GSOUND - website](http://gamma.cs.unc.edu/GSOUND/)

[Raya - website](http://www.dsp.agh.edu.pl/en:resources:rayav)

### Be smart about it.
An obvious area of optimization would be dynamically adjusting the amount, distance and bounce-count of rays, taking individual materials into consideration. However, there is much to be said about possible algorithms as well. Consider how rays close to each right next to the source end up very sparsely reflecting from a distant wall. This requires a compromise between amount of rays and accuracy of reverberation. This could be solved by periodically splitting rays if they are to actually hit anything in a distance, however such solutions require real life benchmarks. Ideally, some choice will be left to the end user to allow them to tailor their experience and balance hardware requirements.

#### Option A:
CPU or GPGPU-based 3D sound propagation algorithm utilizing existing octree, perhaps limiting geometry complexity to a certain minimum cube size.
* Ray tracing: each sound source shoots out rays (self-explanatory).
* Path tracing: sound sources have associated geometric volume (based on a constant, their loudness or amount of free space around – the exact algorithm and its constraints are to be determined) which  - once hit by a ray – counts towards the output (perhaps with a fall off depending on how far from the actual point source it passes).

#### Option B:
azkoonn’s algorithm which offers theoretically perfect scalability: rays can be cast simultaneously and their number can be adjusted. In simple environments the effects could be believable with minimal effort.

Pseudocode loop:
```
start evaluation:
	if line of sight is clear
		play sound
		end loop
	else
		attenuation=1
		insert 3..16 virtual points in a circle around both source and listener
		loop
			move the points outwards by a given amount
			if line of sight of each pair is clear
				play sound with given attenuation
				end loop
			else
				attenuation++
				if attenuation >= maxAttenuation
					play sound with maxAttenuation
					end loop
```

Attenuation could also be based on the actual lenght of sum of rays that got through. There are two factors to consider, lowering volume and applying a low-pass filter. Expanding in a plane needs to be terminated once the virtual points and source/listener no longer see each other. Similarly, rather than in a loop, a given amount might be evaluated all at once with different priorities, perhaps unwanted jobs then be cancelled should they still be enqueued. Another consideration is using available left-over processing power until a deadline for filling the buffer is met (that could be useful on low power devices).
This should produce fairly believable results at a fraction of the cost of actual raycasting all around the source.


### Option C:
Measure the distance in straight line and distance it travels inside of geometry (proposed: two distance counters switched every face encountered) for attenuation. The fastest solution, as it only effectively requires one ray per source.
