const express = require("express");
const expshbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

//require dotenv
require("dotenv").config();

const app = express();

// set up json with express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine set up
app.engine("handlebars", expshbs());
app.set("view engine", "handlebars");

// static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Company: ${req.body.company}</li>
      <li>Phone: ${req.body.phone}</li>
      
    </ul>
    <h3>Message</h3>
    <p>Message: ${req.body.message}</p>
   `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${req.body.name} <${req.body.email}>`,
    to: "troydorman@gmail.com",
    subject: "Node Contact Request",
    text: "Hello World!",
    html: output,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.message);
    console.log("preview URL: " + nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Message sent!" });
  });
});

app.listen(3000, () => console.log("server started on port 3000"));
