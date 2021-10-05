const md5 = require('md5');

/*
todo  检测用户订阅/取消订阅操作的邮箱是否正确
@param cookie 用户携带的key为email 的cookie
@param email 需要被操作的邮箱
@param code 验证码
*/

function testEmailToken(cookie, email, code) {
    let result;
    if (!cookie.email) {
        result = {
            success: false,
            message: '请发送并输入正确验证码后在进行操作'
        }
    } else if (md5(email + code + global.key) != cookie.email) {
        result = {
            success: false,
            message: '您的邮箱检测失败,请勿向控制台输入任何内容',
            warn: '这玩意谁想不到,但是好像没啥意思'
        }
    } else {
        result = {
            success: true,
            message: '处理成功',
        }
    }
    return result;
};
module.exports = testEmailToken;