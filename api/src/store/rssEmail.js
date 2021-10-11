const {
    decode
} = require('js-base64');
const md5 = require('md5');

//存储发送过的邮箱并保存他的salt
let rssEmailStub = {};
let timer = {}; //保存setTimout
/*
todo 将发送的邮箱以email:salt存储在对象中
@param {string} email 需要添加的邮箱(base64)
@param {string} salt 混淆用的盐
*/
function setRssEmail(email, salt) {
    rssEmailStub[email] = salt;

    //todo如果有就删除旧的
    if (timer[email]) {
        clearInterval(timer[email])
    }

    timer[email] = setTimeout(() => {
        try {
            delete rssEmailStub[email];
        } catch (error) {}
    }, 1800000);
};

/*
todo 查询邮箱是否发送并查询token是否正确
!查询成功后就删除邮箱，保证只能查询一次
@param {string} email 需要查询的邮箱
@param {string} mode delete/post请求方式对应删除或添加
@param {string} token 发送邮箱时生成的token此处用于验证用户激活链接的真实性
@return {booean} result 验证是否正确
*/
function hasRssEmail(email, mode, token) {
    let result = (token == md5(decode(email) + mode + (rssEmailStub[email] + '')));
    if (result) {
        try {
            delete rssEmailStub[email];
        } catch (error) {}
    };
    return result;
};
module.exports = {
    hasRssEmail,
    setRssEmail
};