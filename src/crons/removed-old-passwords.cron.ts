import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../models/old-password.model";

dayjs.extend(utc);

const oldPasswordsRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");
  //const previousMonth = dayjs().utc().format("DD/MM/YYYY");

  await OldPassword.deleteOne({ createAt: { $lte: previousYear } });
};
export const removeOldPasswords = new CronJob(
  "0 0 * * * ",
  oldPasswordsRemover
);
