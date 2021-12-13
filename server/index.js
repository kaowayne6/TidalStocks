const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const db = require("./databaseFunctions");

app.set("trust proxy", 1);
//Middleware
const whitelist = [
  "https://finance.yahoo.com/quote/AAPL/history",
  "http://localhost:3000",
  "http://tidalstocks.herokuapp.com"
];
app.use(cookieParser("aCode"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": req.headers.origin });
  res.header({ "Access-Control-Allow-Credentials": true });
  res.header({ "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE" });
  res.header({ "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept" });
  next();
});
const corsConfig = {
  credentials: true,
  origin: [process.env.FRONTEND_APP_URL],
}

app.use(
  cors(corsConfig)
);

//Use DB stored session cookies
app.use(
  session({
    //proxy: true,
    secret: process.env.SESSION_SECRET || "aCode",
    resave: true, //true
    saveUninitialized: true,
    store: new SQLiteStore({
      table: "session",
      db: "tidalDB.sqlite3",
      dir: "./Database",
    }),
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',    
    }, //1 day | not here before
  })
);

//Passport configuartion
require("./passportConfig.js")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

//Register server endpoint
app.post("/register", async (req, res) => {
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;

  //var randomValue = Math.random() * 123;
  let users = {
    //id: randomValue,
    first_name: fname,
    last_name: lname,
    email: email,
    password: password,
  };

  if (await db.checkEmailUsed(email)) {
    res.send({ message: "Email already used" });
    return;
  } else {
    try {
      await db.createUser(fname, lname, email, password);
      res.send({ message: "Account Sucessfully Made" });
    } catch (error) {
      console.log("Error in creating user");
    }
  }
});

app.post("/deleteAccount", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  /* Do delete account logic here */
  try {
    let bool = db.deleteUser(id, email, password);
    if (bool) {
      req.logout();
    }
    res.send({ message: "Logged Out" });
  } catch {
    console.log("Error");
    res.send({ message: "Error deleting account" });
  }
});

app.post("/updateInfo", (req, res) => {
  const id = req.body.id;
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  const changePassword = req.body.changePwd;

  db.updateUserInfo(id, fname, lname, email, password, changePassword);

  res.send({ message: "Update Succesful" });
});

//Return user information if logged in
app.get("/user", (req, res) => {
  if (!req.isAuthenticated()) {
    res.send({ message: "No authenticated User" });
  } else res.send(req.user);
});

//Log user out
app.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Logged Out" });
});

//Log user in
app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  passport.authenticate("local", function (err, user, info) {
    if (err) throw err;
    if (user == false) {
      console.log("User doesn't exist");
      res.send({ message: "No User Exists" });
      return;
    } else {
      req.login(user, (err) => {
        if (err) throw err;
        res.send({ message: "Sucessfully Authenticated" });
      });
    }
  })(req, res, next);
});

module.exports = app;
