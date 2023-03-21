export enum EEmailActions {
  // eslint-disable-next-line no-unused-vars
  WELCOME,
  // eslint-disable-next-line no-unused-vars
  FORGOT_PASSWORD,
}

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you inn our app",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password, everything will be good , just follow the rules",
    templateName: "forgotPassword",
  },
};
