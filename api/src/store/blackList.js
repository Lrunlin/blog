let blackList = [];
//黑名单，修改密码后在这里存一天
/*
todo 将token添加至黑名单
@param {string} token 需要拉黑的token
*/
function addBlackList(token) {
    blackList.push(token);
    setTimeout(() => {
        blackList.shift()
    }, 86400000);
}
/*
todo 判断是否在黑名单内
@param {string} token 需要被判断的token
@return {boolean} 结果
*/

function hasBlackList(token) {
    return blackList.includes(token)
}
module.exports = {
    addBlackList,
    hasBlackList
}