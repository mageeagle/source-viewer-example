## Max/MSP Example for Source Viewer
This example is to demonstrate how the [Source Viewer Web Interface](https://source-viewer.vercel.app/) works [(Github)](https://github.com/mageeagle/source-viewer), which contains a node.js osc server built with osc-js, which is basically a bridge, which a client could send/receive OSC messages via UDP, and relay messages to the browser client via WebSockets.

osc-server-simple.js is a simple bridge.

osc-server-savedState.js saves OSC messages on the server and recalls them whenever a new client connects to the server.

A Max/MSP patch is included to demonstrate the OSC messages accepted by the web interface. The SPAT5 package by IRCAM is required.

## Usage
Open example.maxpat and follow the instructions. The server can be run in Node4Max there.

OR

If you prefer running the server on command line
```
npm install
node osc-server-simple
```

