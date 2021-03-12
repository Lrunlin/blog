const express = require('express')
const app = express()
let router = express.Router();
let fs = require('fs');
router.post('/moveTemporaryImages', (req, res) => {
    let images = req.body.images;
    for (let i = 0; i < images.length; i++) {
        fs.rename(`./temporary/${images[i]}`, `./image/${images[i]}`, function (err) {
        })
    }
    res.json({
        res:true
    })
})
module.exports = router;