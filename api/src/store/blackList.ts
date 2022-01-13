/*
todo 黑名单,在密码修改后将原来的Token存储
*/
let blackList: string[] = [];

/*
todo 将token推入数组加入黑名单
@params {string} token 需要添加的token
*/
function setBlackList(token: string) {
  if (!blackList.includes(token)) {
    blackList.push(token);
    setTimeout(() => {
      blackList.shift();
    }, 86400000);
  }
}

/*
todo 判断token是否在黑名单内
@param {string} token 需要被判断的token
@return {boolean} 是否在黑名单内
*/
function hasBlackList(token: string): boolean {
  return blackList.includes(token);
}

export { hasBlackList, setBlackList };
