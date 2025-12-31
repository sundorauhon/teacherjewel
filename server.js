const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Email setup (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "englishmovie31@gmail.com",
    pass: "YOUR_GMAIL_APP_PASSWORD" // Use App Password
  }
});

// Contact form API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send email to admin
    await transporter.sendMail({
      from: email,
      to: "englishmovie31@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: "englishmovie31@gmail.com",
      to: email,
      subject: "Thank you for contacting Jewel Sir",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting us. We will reach you soon.</p>
        <p><b>Mobile:</b> 01841986932</p>
        <p>Regards,<br>Jewel Sir</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
