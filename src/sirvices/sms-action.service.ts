import { Twilio } from "twilio";

class SmsActionService {
  constructor(private client = new Twilio()) {}
  public async sendSms() {}
}
export const smsActionService = new SmsActionService();