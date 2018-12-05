Branches | Issues | Main developers
--- | --- | --- 
master |  [#128](/inexorgame/code/pull/128) | [@a-teammate](/a-teammate)

------------
This will be dropped again in favor of dynamic lighting.
Reason:
* Makes dynamic worlds possible
* Better editing experience
* Cleaner shader and rendering system
------------



Pictures are louder than words:

Complete Album for comparison of some maps with and without AO: [http://www.bilderhoster.net/g/m3gld18a.html](http://www.bilderhoster.net/g/m3gld18a.html)

No Ambient Occlusion:
![without AO](http://www.bilderhoster.net/safeforgallerie/5wchcazj.jpg)
With Ambient Occlusion:
![with AO](http://www.bilderhoster.net/safeforgallerie/cs8y55xn.jpg)

### Is it fps-expensive?
No its not, unlike Tesseract, we implemented it into the current lightmap-system. 
This means your FPS do not change at all!


Even in other Branches (without this extension) and Sauerbraten Collect, your maps will still look the same (with the Ambient Occlusion Shadows). 

That is because it depends just on the calclight-process (/calclight 1).

However calclighting may take a little longer. 

### Commands
* `ambientocclusion <darkness>` where darkness is a value between 0 (for off) and 255 (really dark corners)
* `ambientocclusionradius <thickness>` where radius is a value between 1.0 (thin line) and 10.0 (big shadow)

_The Thickness furthermore also depends on what "lightprecision" (32 is default: a normal resolution for your lightmap) you use, so a smaller value for that means the resolution of your lightmap is bigger and hence your  previously thick AO-Shadows become thinner._
 
