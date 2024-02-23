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
<body>
<h2 style="
font-size: larger;
font-weight: 800;
text-transform: uppercase;

font-family: Arial, Helvetica, sans-serif;
">Confirm Registration</h2>

<p>Follow this link to confirm your registration:</p>
<p>
  <a href="https://supabase.2m2.it/auth/v1/verify?token={{ .TokenHash }}&type=signup&redirect_to=https://www.2m2.it/api/auth/callback">
    Confirm Sign Up
  </a>
</p>

--

<br />
<br />

<div style="padding-left: 0.8rem; border-left: 1px solid #565656">
  <h3 style="margin: 0; font-size: medium">2m2 autoricambi</h3>
  <div style="font-size: 0.9rem">
    <p style="margin: 0">Via delle Basse 2, 43044 Collecchio PR</p>
    <p style="margin: 0.4rem 0 0"><b>Mail: </b><span>2m2srl@gmail.com</span></p>
    <p style="margin: 0"><b>Tel: </b><span>+39 389 4468231</span></p>
  </div>
</div>
</body>
`;

sendMail("emanuele.hazan@gmail.com", "[2M2] DEMO DESIGN", { html: emailHtml }).then(() => console.log("mail sent!"));
