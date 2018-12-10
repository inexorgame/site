It is possible to activate debug capabilites for `inexorgame/code` using the following steps:

1. [Get an API token](https://github.com/travis-ci/travis.rb#token) using the Travis CLI
2. Send a `POST` request to the Travis API replacing `TOKEN` and `JOB_ID` in below script (save as `post.sh`)
3. Fire it up with `chmod u+x post.sh`, `./post.sh`
4. Head back to the web UI and in the log of your job. you should see the following lines to connect to the VM:
5. Connect from your computer using SSH into the interactive session, and once you're done, just type exit and your build will terminate. 
```
Setting up debug tools.
Preparing debug sessions.
Use the following SSH command to access the interactive debugging environment:
ssh ukjiuCEkxBBnRAe32Y8xCH0zj@ny2.tmate.io
```

Here's the code for `post.sh`:
```bash
#! /usr/bin/env bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token <TOKEN>" \
  -d '{ "quiet": true }' \
  https://api.travis-ci.org/job/<JOB_ID>/debug
```

