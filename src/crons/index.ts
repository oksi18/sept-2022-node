import { removeOldTokens } from "./remove-old-tokens.cron";
import { removeOldPasswords } from "./removed-old-passwords.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
};
