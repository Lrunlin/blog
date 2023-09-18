import random from "./random";

/** 机器号（最大9）*/
const WorkerID = Math.min(
  process.env.NODE_APP_INSTANCE ? +process.env.NODE_APP_INSTANCE : random(0, 9),
  9
);
/** 基础时间，时间戳从这个时间开始算*/
const BaseTime = +new Date("2022-06-29");
/** 最后一次设置ID的时间戳*/
let lastTimeTick: undefined | Number;
/** 最后一次生成的随机数*/
let lastRandomNumberTick = random(1, 3);

function id() {
  /** 时间戳*/
  let timestamp = +new Date() - BaseTime;
  lastRandomNumberTick =
    timestamp == lastTimeTick ? ++(lastRandomNumberTick as number) : random(0, 3);
  lastTimeTick = timestamp;
  
  return +`${timestamp}${WorkerID}${lastRandomNumberTick}`;
}

export default id;
