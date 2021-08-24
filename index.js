const express = require("express");
const expshbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

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
  console.log(req.body);
});

app.listen(3000, () => console.log("server started on port 3000"));
