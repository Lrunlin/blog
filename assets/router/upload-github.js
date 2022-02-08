const express = require('express')
const router = express.Router();
const path = require('path');
const sharp = require("sharp")
const adminAuth = require('../utils/auth');
let dir = path.join(__dirname, '../public/github');


router.post('/assets/github/:id', adminAuth, async (req, res) => {

    const name = `${req.params.id}.webp`;
    let imgBuffer = Buffer.from(req.body.image.split(';base64,').pop(), 'base64');
    sharp(imgBuffer)
        .webp({
            quality: 50
        }).toFile(`${dir}/${name}`, (err, info) => {
            if (err) {
                res.json({
                    success: false,
                });
            } else {
                res.json({
                    success: true,
                    message: '添加成功',
                });
            }
        })
})

module.exports = router;