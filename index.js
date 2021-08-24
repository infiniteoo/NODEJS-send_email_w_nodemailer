const express = require("express");
const expshbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// set up json with express
app.use(express.json({ extended: true }));

// view engine set up
app.engine("handlebars", expshbs());
app.set("view engine", "handlebars");

// static folder
app.use("public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("contact");
});

app.listen(3000, () => console.log("server started on port 3000"));
