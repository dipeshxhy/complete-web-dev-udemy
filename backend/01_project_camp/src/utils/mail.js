import mailgen from "mailgen";

const mailGenerator = new mailgen({
  theme: "default",
  product: {
    name: "product Camp",
    link: "<noreply@productcamp.com>",
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

  return mailGenerator.generate(email);
};

export const emailVerificationTemplate = (userName, verificationUrl) => {
  const message = "Welcome to Product Camp! Please verify your email address.";
  return generateEmailTemplate(
    userName,
    verificationUrl,
    "Verify Email",
    message,
    "#22BC66",
  );
};

export const forgotPasswordTemplate = (userName, resetUrl) => {
  const message = "You have requested to reset your password.";
  return generateEmailTemplate(
    userName,
    resetUrl,
    "Reset Your Password",
    message,
    "#FF6B6B",
  );
};
