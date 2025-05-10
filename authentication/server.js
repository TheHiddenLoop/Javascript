const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const otpStore = {};




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xyz@gmail.com",
    pass: "gmail_pass",
  },
});

app.post("/send-otp", (req, res) => {
  const {email} = req.body;
  const otp = Math.floor(Math.random() * 90000).toString();
  otpStore[email] = otp;

  transporter.sendMail(
    {
      from: "angeshchauhan44@gmail.com",
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    },
    (err, info) => {
      if (err) {
        console.log(err);

        return res.json({ success: false, message: "Failed to send email" });
      }
      res.json({ success: true, message: "OTP sent to email" });
    }
  );
});

app.post("/verify-otp",(req,res)=>{
    const {email, otp}=req.body;
    if(otpStore[email]===otp){
        delete otpStore[email];
        return res.json({success:true, message:'OTP verified successfully'})
    }
    res.json({ success: false, message: 'Invalid OTP' });
})



app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
