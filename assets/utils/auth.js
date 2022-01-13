/** 要求必须管理员*/
function adminAuth(req, res, next) {
    if (req.userId != 'admin') {
        res.status(401);
    } else {
        next()
    }
}
module.exports = adminAuth;