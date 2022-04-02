const express = require('express')
const app = express()
let router = express.Router();
let fs = require('fs');
const path = require('path');
const auth = require('../utils/auth')

router.delete('/assets/:dir/:filename',auth, (req, res) => {
    let dir = path.join(__dirname, `../public/${req.params.dir}`);
    fs.unlink(`${dir}/${req.params.filename}`, function (err) {
        res.json({
            success: !err
        });
    })
})
module.exports = router;