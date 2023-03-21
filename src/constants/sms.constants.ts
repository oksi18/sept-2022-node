import { ESmsAction } from "../enums/sms-action.ennum";

export const smsTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [ESmsAction.WELCOME]: {
    subject: "Great to see you inn our app",
    templateName: "register",
  },
  [ESmsAction.FORGOT_PASSWORD]: {
    subject:
      "We control your password, everything will be good , just follow the rules",
    templateName: "forgotPassword",
  },
};
