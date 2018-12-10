So you either built Inexor from source, installed it with `yarn add global @inexorgame/inexor-flex` or you used the windows installer.

To make it run you simply execute `inexor-flex client start 31417` on the command line (so in any cmd/powershell/terminal window).

*{**Attention: Currently you need to do this differently:** go into the installation directory of inexor-flex (usually somewhere in a `<installpath>/node_modules/@inexorgame/inexor-flex` folder) and run `yarn start`.}*

~~However you may need to tell your OS where this mysterious `inexor-flex` command is located.  
**Note:** No need for users of the windows installer.  
This is done by either:~~  

**~~A) installing flex globally~~**
   * ~~`yarn add global @inexorgame/inexor-flex`~~
   * ~~Note however that on Linux you will end up requiring `sudo` permissions to do that with the node.js solution provided by some distributions. **Don't do that!** Instead use [nvm](https://github.com/creationix/nvm#installation) to install node.js (or go for **B)**)~~
 
**B) add flex to the PATH**
   * After `yarn install @inexorgame/inexor-flex` you have a subfolder `node_modules/.bin`.
   * Add that [directory to the PATH](https://www.google.de/search?q=add+folder+to+path) (that directory: the absolute path of that .bin folder)

## Troubleshooting

#### Media folders corrupted

If you see an error like
```
May 27 17:38:52 flex.media.repository.GitRepositoryManager[18154] ERROR: [additional] Failed to get current branch: reference 'refs/heads/master' not found. The repository additional seems to be corrupt
May 27 17:38:52 flex.media.repository.GitRepositoryManager[18154] ERROR: [essential] Failed to get current branch: reference 'refs/heads/master' not found. The repository essential seems to be corrupt
```
you need to delete those folders, so it restarts cloning the media repositories. This is on our bug-list.
If you do not know where those media folders are located, open the Flex-UI (http://localhost:31416) and in the tab `Information` you have it listed. Just delete all subfolders of Inexor's media path.

## Manual build - How do I run it?

To run the Inexor you built manually, you need to add the parent folder of your `bin` folder to [`<flex-folder>/config/releases.toml/explicit_release_folders`](https://github.com/inexorgame/inexor-flex/blob/master/config/releases.toml#L12).  

Then you need to tell the instances of your profile to use that specific version:

As the comment in the releases.toml suggests, the version name is now the name of that parent folder you added to the releases.toml.  
So we modify in [`config/client/instances.toml`](https://github.com/inexorgame/inexor-flex/blob/master/config/client/instances.toml#L9) the `versionRange` entry to the parents folders name.  
(Note: if we start with i.e. `npm run dev` or `npm run serverfarm` we would need to edit the instances.toml in the according profile `config/dev/instances.toml` or `config/serverfarm/instances.toml`)

Example:
Let's say we cloned to `/home/inexor-dev/inexor-core/` we built it and now there is a `/home/inexor-dev/inexor-core/bin` folder filled with files.

Now we add
```
explicit_release_folders = [
"/home/inexor-dev/inexor-core/"
]
```
to the `releases.toml`.
The release now is named "inexor-core" and we need to tell the instances we start with `npm start`/`inexor-flex` that it shall use that "inexor-core" version. Hence we modify the specific line in the `instances.toml`:
```
versionRange = "inexor-core"
channelSearch = "*"
```