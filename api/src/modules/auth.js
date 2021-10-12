/*
todo 用于需要登录的接口上判断用户是否携带了token
 http://www.metools.info/code/c80.html
*/
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path')
const {
    hasBlackList
} = require('@/store/blackList');
let publicKey = fs.readFileSync(path.join(__dirname, '../store/key/public.pem')).toString();

function auth(req, res, next) {
    if (hasBlackList(req.headers.authorization)) {
        res.status(401);
        res.end();
        return false;
    }
    jwt.verify(req.headers.authorization, publicKey, function (err, decoded) {
        if (decoded) {
            req.admin = decoded.admin;
            next()
        } else {
            res.status(401);
            res.end();
        };
    });
}
module.exports = auth;