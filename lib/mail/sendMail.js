import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function sendMail({to, subject, html}) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Anggi Bustamante <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  return info
}
