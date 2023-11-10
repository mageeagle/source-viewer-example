const OSC = require("osc-js");

const options = {
  udpServer: { port: 9129 },
  udpClient: { port: 9130 },
  wsServer: {
    host: "localhost", // '0.0.0.0' if you want devices other than your computer to connect
    port: 8080, // @param {number} Port of WebSocket server
  },
  wsClient: {
    host: "localhost", // '0.0.0.0' if you want devices other than your computer to connect
    port: 8080, // @param {number} Port of WebSocket server
  },
};

const host = {
  host: "localhost", // '0.0.0.0' if you want devices other than your computer to connect
};

const osc = new OSC({ plugin: new OSC.BridgePlugin(options) });

// There might be better ways to do this other than saving this here
// But I'm not really a backend developer, so I'll just do this for now.
// OSC values that has to be recalled to every client on their connection are saved here
let sourceNumber = 0;
let speakerNumber = 0;
let sourceColor = {};
let speakerColor = {};
// let sourcePosition = {} // Normally, sound sources move and a continuous flow of OSC messages would be sent to the client, this is normally not required.
let speakerPosition = {};

// Save OSC messages on this server
osc.on("/speaker/*/xyz", (msg) => {
  speakerPosition[msg.address] = msg.args;
});

// osc.on('/source/*/xyz', (msg) => {
//   sourcePosition[msg.address] = msg.args
// })

osc.on("/speaker/*/color", (msg) => {
  speakerColor[msg.address] = msg.args;
});

osc.on("/speaker/number", (msg) => {
  speakerNumber = msg.args[0];
});

osc.on("/source/*/color", (msg) => {
  sourceColor[msg.address] = msg.args;
});

osc.on("/source/number", (msg) => {
  sourceNumber = msg.args[0];
});

osc.on("connected", (msg) => {
  console.log("New Client Connected");

  // Output saved values in a bundle
  const out = [];
  const sourceNumMsg = new OSC.Message("/source/number", sourceNumber);
  out.push(sourceNumMsg);
  const speakerNumMsg = new OSC.Message("/speaker/number", speakerNumber);
  out.push(speakerNumMsg);
  // OSC messages default broadcast to all connected websocket clients, this might cause issues
  // Waiting for response of maintainer of osc-js
  const bundle = new OSC.Bundle(out);
  osc.send(bundle);

  // Wait until source and speakers are instantiated in client
  setInterval(() => {
    const out2 = [];
    for (const [address, msg] of Object.entries(speakerPosition)) {
      const oscMsg = new OSC.Message(address, ...msg);
      out2.push(oscMsg);
    }
    //   for (const [address, msg] of Object.entries(sourcePosition)) {
    //     const oscMsg = new OSC.Message(address, ...msg)
    //   out2.push(oscMsg)
    // }
    for (const [address, msg] of Object.entries(speakerColor)) {
      const oscMsg = new OSC.Message(address, ...msg);
      out2.push(oscMsg);
    }
    for (const [address, msg] of Object.entries(sourceColor)) {
      const oscMsg = new OSC.Message(address, ...msg);
      out2.push(oscMsg);
    }
    const bundle2 = new OSC.Bundle(out2);
    osc.send(bundle2);
  }, 500);
});

osc.open(host); // start a WebSocket server on port 8080
console.log("UDP to WebSockets Server Running");
