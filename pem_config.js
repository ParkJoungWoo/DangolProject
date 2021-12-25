const fs = require('fs');
const key = fs.readFileSync('http.key');
const cert = fs.readFileSync('http.crt');

module.exports.options = {
	key
	, cert,
//ca
};
