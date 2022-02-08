const express = require('express')
let router = express.Router();
let fs = require('fs');
const path = require('path');
let dir = path.join(__dirname, '../public/github');

router.delete('/assets/github/:id', (req, res) => {
    try {
        fs.unlink(`${dir}/${req.params.id}.webp`, function () {})
        res.json({
            success: true
        });
    } catch {
        res.json({
            success: false
        });
    }


})
module.exports = router;