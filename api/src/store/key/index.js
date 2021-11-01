const path = require('path');
const fs = require('fs');
const PRIVETEKEY = fs.readFileSync(path.join(__dirname, './private.pem')).toString();
const PUBLICKEY = fs.readFileSync(path.join(__dirname, './public.pem')).toString();
module.exports = {
    PRIVETEKEY,
    PUBLICKEY
}