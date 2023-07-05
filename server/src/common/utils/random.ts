/** 根据指定范围生成随机数(整数)*/
const random = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;
export default random;