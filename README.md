# NODE.JS - Sending Emails w/Nodemailer via Contact Form

### Nodemailer Example Code

```
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
```
