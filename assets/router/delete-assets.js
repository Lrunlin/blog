const express = require('express')
const app = express()
let router = express.Router();
let fs = require('fs');
const path = require('path');
let dir = path.join(__dirname, '../public/image');

router.delete('/assets', (req, res) => {
    let images = req.query.images;
    for (let i = 0; i < images.length; i++) {
        try {
            fs.unlink(`${dir}/${images[i]}`, function () {})
        } catch {}
    };
    res.json({
        success: true
    });
})
module.exports = router;