/** 机器号（最大999）*/
const WorkerID = 1;
/** 基础时间，时间戳从这个时间开始算*/
const BaseTime = +new Date("2022-06-29");
/** 最后一次设置ID的时间戳*/
var lastTimeTick: undefined | Number;
/** 最后一次生成的随机数*/
var lastRandomNumberTick: undefined | Number;

function useID() {
  /** 时间戳*/
  let timestamp = +new Date() - BaseTime;
  lastRandomNumberTick = timestamp == lastTimeTick ? ++(lastRandomNumberTick as number) : 0;
  lastTimeTick = timestamp;
  return +`${timestamp}${WorkerID}${lastRandomNumberTick}`;
}
export default useID;
