"use strict";

const app = require("../app");
const https = require('https');
const options = require('../pem_config.js').options;
const PORT = 8080;

https.createServer(options, app).listen(PORT, () => {
	console.log("start https server");
});
/*
app.listen(PORT, () => {
    console.log("Start Server...");
});
*/
