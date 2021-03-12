const express = require('express')
const app = express()
let router = express.Router();
let fs = require('fs');
router.post('/delete-assets', (req, res) => {
    let images = req.body.images;
    for (let i = 0; i < images.length; i++) {
        fs.unlink(`./image/${images[i]}`, function () {})
    };
    res.json({
        res: true
    });
})
module.exports = router;