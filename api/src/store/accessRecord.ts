import moment from "moment";

interface accessRecordTypes {
  [key: string]: number;
}

let accessRecord: accessRecordTypes = {};
/** 添加一条记录*/
function statistics() {
  let time = moment().format("YYYY-MM-DD");
  accessRecord[time] ? accessRecord[time]++ : (accessRecord[time] = 1);
  if (Object.keys(accessRecord).length > 7) {
    Object.keys(accessRecord).forEach((item, index) => {
      if (index > 6) {
        delete accessRecord[item];
      }
    });
  }
}
export { accessRecord ,statistics};