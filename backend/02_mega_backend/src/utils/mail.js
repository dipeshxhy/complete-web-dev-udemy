import mailgen from "mailgen";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const mailGenerator = new mailgen({
  theme: "default",
  product: {
    name: "product Camp",
    link: "https://productcamp.com",
  },
});

const generateEmailTemplate = (
  userName,
  actionUrl,
  actionText,
  message,
  color,
) => {
  const email = {
    body: {
      name: userName,
      intro: message,
      action: {
        instructions: `Click the button below to ${actionText.toLowerCase()}:`,
        button: {
          color: color || "#22BC66", // Optional action button color
          text: actionText,
          link: actionUrl,
        },
      },
      outro: "If you did not request this, please ignore this email.",
    },
  };
  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);
  return { html, text };
};
const sendEmail = async (to, subject, html, text) => {
  const mailOptions = {
    from: process.env.MAILTRAP_FROM,
    to,
    subject,
    html,
    text,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const emailVerificationTemplate = async (
  userName,
  email,
  verificationUrl,
) => {
  const message = "Welcome to Product Camp! Please verify your email address.";
  const { html, text } = generateEmailTemplate(
    userName,
    verificationUrl,
    "Verify Email",
    message,
    "#22BC66",
  );
  await sendEmail(email, "Email Verification", html, text);
};

export const forgotPasswordTemplate = async (userName, email, resetUrl) => {
  const message = "You have requested to reset your password.";
  const { html, text } = generateEmailTemplate(
    userName,
    resetUrl,
    "Reset Your Password",
    message,
    "#FF6B6B",
  );
  await sendEmail(email, "Forgot Password", html, text);
};
