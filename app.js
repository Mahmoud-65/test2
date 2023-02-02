var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cookieParser = require("cookie-parser");
var csurf = require("csurf");
var csrfProtection = csurf({ cookie: true });
var cors = require("cors");
var app = express();
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.json({ csrfToken: req.csrfToken() });
});

app.post("/process", csrfProtection, function (req, res) {
  console.log("-----4", req.cookies);
  res.send("data is being processed");
});
module.exports = app;
