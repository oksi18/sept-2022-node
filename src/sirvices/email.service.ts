import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs";
import { allTemplates, EEmailActions } from "../constants/email.constants";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "edu",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });
    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }
  public async sendEmail(email: string, emailActions: EEmailActions) {
    const templateInfo = allTemplates[emailActions];
    const html = await this.templateParser.render("register");
    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}
export const emailService = new EmailService();
