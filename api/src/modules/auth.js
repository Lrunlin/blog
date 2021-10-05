/*
todo 用于需要登录的接口上判断用户是否携带了token
*/
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    jwt.verify(req.headers.authorization, global.key, function (err, decoded) {
        if (decoded) {
            next()
        } else {
            res.status(401);
            res.end();
        };
    });
}
module.exports = auth;