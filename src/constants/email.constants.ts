export enum EEmailActions {
  // eslint-disable-next-line no-unused-vars
  WELCOME,
  // eslint-disable-next-line no-unused-vars
  FORGOT_PASSWORD,
  // eslint-disable-next-line no-unused-vars
  ACTIVATE,
}

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you inn our app",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password, everything will be good , just follow the rules",
    templateName: "forgotPassword",
  },
  [EEmailActions.ACTIVATE]: {
    subject:
      "We control your password, everything will be good , just follow the rules",
    templateName: "activate",
  },
};
