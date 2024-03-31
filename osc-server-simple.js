const OSC = require("osc-js");
const port = 8080 // '0.0.0.0' if you want devices other than your computer to connect
const host = "localhost" // @param {number} Port of WebSocket server

// Notes: Modern Browsers enforce the connection with HTTPS, which mandates the use of wss
// This requires the use of a properly signed certificate, if the version on Vercel is used directly.
// The easiest way around this is to use a self-signed certificate, which is OK for local use on your own computer
// but would make more trouble on the client side if you are broadcasting to multiple devices on the network
// Firefox has a stricter rule on this, which require end users to trust the certificate in the settings
// for other Chromium Based Browsers, go to https://(IP):(port) directly, it will complain about the untrusted certificate
// Accept the risk anyways, and the certificate will be saved on the browser
// reload the vercel page and it will connect.
// You would probably have a better time cloning the repository and running the website on a local dev server

// Uncomment this if you are using a certificate for HTTPS
// const https = require("https");
// const fs = require("fs");
// const server = https.createServer(
//   {
//     key: fs.readFileSync("./certs/key.pem"),
//     cert: fs.readFileSync("./certs/cert.pem"),
//     requestCert: false,
//     rejectUnauthorized: false,
//   },
//   (req, res) => {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }
// ).listen(port, () => {
//   console.log('server running at ' + port)
// });

const options = {
  udpServer: { port: 9129 },
  udpClient: { port: 9130 },
  wsServer: {
    host: host, 
    port: port, 
    // server: server, // Uncomment this if you are using a certificate for HTTPS
  }
};

const oscOptions = {
  host: host, 
};

const osc = new OSC({ plugin: new OSC.BridgePlugin(options) });

// Default broadcast to all connected websocket clients, no extra config needed

osc.open(oscOptions); // start a WebSocket server
console.log("UDP to WebSockets Server Running");
