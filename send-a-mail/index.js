const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secureConnection: true,
  auth: { user: "simo.tasca@gmail.com", pass: "khep vooi uxsn tymz" },
});

function sendMail(to, subject, content) {
  return mailer.sendMail({
    // from: process.env.MAILER_USER,
    from: "simo.tasca@gmail.com",
    to,
    subject,
    ...content,
  });
}

const emailHtml = `
  ciao!
`;

sendMail("emanuele.hazan@gmail.com", "[2M2] DEMO DESIGN", { html: emailHtml }).then(() => console.log("mail sent!"));
