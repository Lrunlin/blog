const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

router.get('/document', async (req, res) => {
    axios.get('http://127.0.0.1:4523/export/openapi?projectId=418948').then(res => {
        console.log(res.data);
        fs.writeFileSync('./doc.json', JSON.stringify(res.data))
    })
})
module.exports = router;