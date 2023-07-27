const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const PORT = 3000;
const config = require("./config/development.json");

const credentials = {
  apiKey: config.apiKey,
  username: config.username,
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files (index.html and script.js)
app.use(express.static('public'));

// Route to handle the form submission
app.post('/', (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    // Validate form data
    if (!username || !email || !password || !confirm_password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    // For simplicity, let's assume the database insert is successful.
    // In a real-world application, you should perform proper error handling.

    // Send verification email
    sendVerificationEmail(email);

    // Return success response
    return res.status(200).json({ message: "Account created successfully. Please check your email for verification." });
});

// Function to send a verification email
function sendVerificationEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_gmail_username@gmail.com', // Replace with your Gmail email address
            pass: 'your_gmail_password' // Replace with your Gmail password
        }
    });

    const mailOptions = {
        from: 'your_gmail_username@gmail.com', // Replace with your Gmail email address
        to: email,
        subject: 'Account Verification',
        text: 'Thank you for creating an account. Please verify your email to activate your account.'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Verification email sent:", info.response);
        }
    });
}

const SendSms = () =>{
    const AfricasTalking = require("africastalking")(credentials);
    const sms = AfricasTalking.SMS

    const message = `Thankyou for choosing to shop with us`;

    // Send the SMS
    const options = {
      to: '+254785586175',
      message: message,
    };

    sms
      .send(options)
      .then((response) => {
        console.log("SMS sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
      });
      console.log('heeey')
    return message;
  }

  SendSms()


// Start the server
const port = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

