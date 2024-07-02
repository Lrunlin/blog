import moment from "moment";
import { getDiskInfoSync } from "node-disk-info";
import os from "os";
import redis from "@/common/utils/redis";

const getDistData = () => {
  let isLinux = os.type().toLowerCase().includes("linux");
  return getDiskInfoSync().reduce(
    (total, item) => {
      total.total += item.blocks * (isLinux ? 1000 : 1);
      total.occupied += item.used * (isLinux ? 1000 : 1);
      return total;
    },
    { occupied: 0, total: 0 },
  );
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
