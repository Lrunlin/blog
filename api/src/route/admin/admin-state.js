const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
    PUBLICKEY,
} = require('@/store/key');

router.get('/admin/state', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.json({
            success: false,
            message: '检测到您未登录，但是您仍然被允许查看部分信息'
        })
        return false;
    }


    //! JWT中签发日期和到期时间的单位是秒
    jwt.verify(token, PUBLICKEY, function (err, decode) {
        if (err) {
            res.json({
                success: false,
                message: '检测到您长时间未登录，请重新登录'
            })
            return false
        }
        // (到期时间-现在的时间/1000)转小时
        let hour = Math.floor((decode.exp - (+new Date() / 1000)) / (60 * 60));
        res.json({
            success: true,
            message: `Token剩余时间:${hour}小时`,
            data: hour
        });
    });
})
module.exports = router;