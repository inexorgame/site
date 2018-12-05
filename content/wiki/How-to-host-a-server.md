# Ubuntu/Linux

This page shows how to create environment for running multiple servers.

    Please replace [name] with the name of your server.

## Clone Inexor sources

    mkdir -p /srv/inexor/git
    cd /srv/inexor/git
    git clone --recursive https://github.com/inexorgame/code.git inexor-code

## Build environment and building

    apt-get install git cmake build-essential libsdl2{,-mixer,-image}-dev libgl1-mesa-dev libprotobuf-dev protobuf-compiler libenet-dev libudev-dev libboost-all-dev
    mkdir -p /srv/inexor/build
    cd /srv/inexor/build
    cmake /srv/inexor/git/inexor-code -DBUILD_CLIENT=0 -DBUILD_MASTER=0 -DBUILD_SERVER=1
    cd /srv/inexor/git/inexor-code
    make install

## Create server directory

    mkdir -p /srv/inexor/servers
    ln -s /srv/inexor/git/inexor-code /srv/inexor/servers/[name]

    mkdir -p /etc/inexor/[name]/
    cp /srv/inexor/git/inexor-code/server-init.cfg /etc/inexor/[name]/[name].cfg
    nano /etc/inexor/[name]/[name].cfg

    mkdir -p /var/log/inexor/[name]

## Run the server

    cd /srv/inexor/servers/[name]
    bin/linux/x86_64/server -g/var/log/inexor/[name]/[name].log -x/etc/inexor/[name]/[name].cfg >/dev/null &

## Stop the server

    kill `ps ax|grep [name]|grep server|cut -f1 -d" "

# Starting a server in Inexor flex
To start a server in Inexor flex, go to "instances" and click "start":

![error: could not find image!](https://raw.githubusercontent.com/inexorgame/visualisations/e475eb76f10a16a8d594ee5ad863bee335ac9ccc/wiki/Inexor_FLEX_start_default_production_server.jpg)

Then click "connect":

![error: could not find image!](https://raw.githubusercontent.com/inexorgame/visualisations/e475eb76f10a16a8d594ee5ad863bee335ac9ccc/wiki/Inexor_FLEX_connect_to_default_production_server.jpg)

