const OSC = require('osc-js')

const options = {
  udpServer: { port: 9129 },
  udpClient: { port: 9130 },
  wsServer: {
    host: 'localhost', // '0.0.0.0' if you want devices other than your computer to connect
    port: 8080, // @param {number} Port of WebSocket server
  },
  wsClient: {
    host: 'localhost', // '0.0.0.0' if you want devices other than your computer to connect
    port: 8080, // @param {number} Port of WebSocket server
  },
};

const host = {
  host: 'localhost' // '0.0.0.0' if you want devices other than your computer to connect
}

const osc = new OSC({ plugin: new OSC.BridgePlugin(options) })

// Default broadcast to all connected websocket clients, no extra config needed

osc.open(host) // start a WebSocket server on port 8080
console.log('UDP to WebSockets Server Running')