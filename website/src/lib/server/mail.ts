import nodemailer from "nodemailer";
import { chechEnvVariable } from "../shared/env";

chechEnvVariable("MAILER_HOST", "Error creating nodemailer transport");
chechEnvVariable("MAILER_PORT", "Error creating nodemailer transport");
chechEnvVariable("MAILER_USER", "Error creating nodemailer transport");
chechEnvVariable("MAILER_PASS", "Error creating nodemailer transport");

const mailer = nodemailer.createTransport({
  // host: process.env.MAILER_HOST,
  // port: Number(process.env.MAILER_PORT),
  // secureConnection: true,
  // auth: {
  //   user: process.env.MAILER_USER,
  //   pass: process.env.MAILER_PASS,
  // },
  host: "smtp.gmail.com",
  port: 587,
  secureConnection: true,
  auth: { user: "simo.tasca@gmail.com", pass: "khep vooi uxsn tymz" },
});

export function sendMail(
  to: string,
  subject: string,
  content: { text?: string; html?: string }
) {
  return mailer.sendMail({
    // from: process.env.MAILER_USER,
    from: "simo.tasca@gmail.com",
    to,
    subject,
    ...content,
  });
}
