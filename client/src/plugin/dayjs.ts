import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
dayjs.extend(weekday);
dayjs.extend(localeData);

export default dayjs;
