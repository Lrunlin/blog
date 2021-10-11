const express = require('express');
const app = express();
const router = express.Router();
const os = require('os')
router.get('/os', async (req, res) => {
    const osData = {
        os_name: os.type(),
        memory_total: os.totalmem(),
        memory_blank: os.freemem(),
        time: os.uptime()
    }
    res.json({
        success: true,
        data: osData
    })
});
module.exports = router;