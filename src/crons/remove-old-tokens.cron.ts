import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models";

dayjs.extend(utc);

const tokenRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");
  //const previousMonth = dayjs().utc().format("DD/MM/YYYY");

  await Token.deleteOne({ createAt: { $lte: previousMonth } });
};
export const removeOldTokens = new CronJob("0 0 * * * ", tokenRemover);
