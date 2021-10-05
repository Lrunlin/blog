const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');


router.get('/cors', async (req, res) => {
    axios.get(req.query.url).then(response => {
        res.json({
            data: response.data
        })
    })
});
module.exports = router;