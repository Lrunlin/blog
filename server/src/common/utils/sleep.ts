/** 使用Promise实现，需要传递等待时间(默认1秒)*/
const sleep = (time: number = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};
export default sleep;
