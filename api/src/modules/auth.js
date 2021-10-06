/*
todo 用于需要登录的接口上判断用户是否携带了token
*/
const jwt = require('jsonwebtoken');
let blackList = [];//黑名单，修改密码后在这里存一天

function auth(req, res, next) {
    if (blackList.some(item => item == req.headers.authorization)) {
        res.status(401);
        res.end();
        setTimeout(() => {
            blackList = blackList.filter(item => item != req.headers.authorization)
        }, 86400000);
        return false;
    }
    jwt.verify(req.headers.authorization, global.key, function (err, decoded) {
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
module.exports.blackList = blackList;