const express = require('express');

const app = express()

function api(hostname) {
    // 传入req.hostname
    if (hostname == "localhost") {
        return "http://127.0.0.1:5500"
    } else {
        return "https://blog.liurl.xyz"
    }
}
module.exports = api;