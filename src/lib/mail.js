import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, otp) => {
  try {
    // Create a transporter
    // For Gmail, you might need an "App Password" (not your login password)
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your CodeSlayer Account",
      html: `<p>Your verification code is: <b>${otp}</b></p><p>This code expires in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};