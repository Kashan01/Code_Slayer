import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, otp, url) => {
  try {
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
      html: `<div style="
  max-width:520px;
  margin:auto;
  padding:28px;
  background:linear-gradient(to bottom, #000000, #18181b, #000000);
  border-radius:18px;
  color:#f9fafb;
  font-family: Arial, Helvetica, sans-serif;
  border:1px solid #27272a;
">

  <!-- Brand -->
  <div style="text-align:center; margin-bottom:26px;">
    <!-- Replace with your logo -->
    <img
      src="${process.env.NEXT_PUBLIC_CLIENT_URL}/logo.png"
      alt="CodeSlayer"
      width="64"
      style="margin-bottom:12px;"
    />
    <div style="font-size:24px; font-weight:700; letter-spacing:1px;">
      <span style="color:#e5e7eb;">Code</span>
      <span style="color:#fb2c36;">Slayer</span>
    </div>
    <div style="font-size:12px; color:#a1a1aa;">
      Sharpen your skills. Slay the code.
    </div>
  </div>

  <!-- Heading -->
  <div style="font-size:20px; font-weight:600; margin-bottom:10px;">
    Verify your email
  </div>

  <!-- Message -->
  <div style="
    font-size:14px;
    line-height:1.7;
    color:#d4d4d8;
    margin-bottom:24px;
  ">
    Welcome to <b style="color:#ffffff;">CodeSlayer</b> ⚔️  
    Enter the OTP below or verify instantly using the button.
  </div>

  <!-- OTP -->
  <div style="text-align:center; margin-bottom:26px;">
    <div style="
      display:inline-block;
      padding:14px 30px;
      background:#020617;
      border-radius:12px;
      border:1px dashed #fb2c36;
      font-size:28px;
      letter-spacing:6px;
      font-weight:700;
      color:#fb2c36;
    ">
      ${otp}
    </div>
  </div>

  <!-- CTA -->
  <div style="text-align:center; margin-bottom:26px;">
    <a href="${url}" style="
      display:inline-block;
      padding:14px 32px;
      background:linear-gradient(135deg, #fb2c36, #e11d48);
      color:#ffffff;
      font-weight:600;
      text-decoration:none;
      border-radius:10px;
      font-size:14px;
    ">
      Verify Email
    </a>
  </div>

  <!-- Info -->
  <div style="
    font-size:13px;
    color:#a1a1aa;
    line-height:1.6;
  ">
    ⏳ This verification code expires in <b>1 hour</b>.<br />
    If you didn’t request this, you can safely ignore this email.
  </div>

  <!-- Footer -->
  <div style="
    margin-top:24px;
    padding-top:16px;
    border-top:1px solid #27272a;
    text-align:center;
    font-size:12px;
    color:#71717a;
  ">
    © 2025 CodeSlayer
  </div>

</div>
`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};