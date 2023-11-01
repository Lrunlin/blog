import os from "os";
import moment from "moment";
import redis from "@/common/utils/redis";
import { getDiskInfoSync } from "node-disk-info";


const getDistData = () => {
  let isLinux = os.type().toLowerCase().includes("linux");

  let total = 0;
  let occupied = 0;
  getDiskInfoSync().forEach(item => {
    total += item.blocks;
    occupied += item.used;
  });
  return {
    occupied: isLinux ? occupied * 1000 : occupied,
    total: isLinux ? total * 1000 : total,
  };
};

const systemOccupation: {
  loadavg: number;
  memory: { occupied: number; total: number };
  disk: { occupied: number; total: number };
  time: string;
}[] = [];
function getSystemOccupation() {
  systemOccupation.push({
    loadavg: os.loadavg()[0] * 100,
    memory: {
      occupied: os.totalmem() - os.freemem(),
      total: os.totalmem(),
    },
    disk: getDistData(),
    time: moment().format("HH:mm:ss"),
  });
  if (systemOccupation.length > 8) {
    systemOccupation.splice(0, 1);
  }

  redis.set("visualization-load", JSON.stringify(systemOccupation));
}
export default () => {
  getSystemOccupation();
  setInterval(() => {
    getSystemOccupation();
  }, 10_000);
};
