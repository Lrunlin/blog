import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
dayjs.extend(weekday);
dayjs.extend(localeData);

export default dayjs;
