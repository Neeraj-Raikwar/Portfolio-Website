const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend to talk to backend

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { fullname, company, email, phone, interestedIn, websiteType, pages } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'raikwarneeraj95@gmail.com', // Receiver address
        subject: `New Project Request from ${fullname}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${fullname}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Interested In:</strong> ${interestedIn}</p>
            <p><strong>Website Type:</strong> ${websiteType}</p>
            <p><strong>Number of Pages:</strong> ${pages}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
