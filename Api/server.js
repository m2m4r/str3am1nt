const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./config/db");
const routes = require("./routes");
const { User } = require("./models");
const sendReminder = require("./config/reminder");
const schedule = require("node-schedule");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./tonic3-6cbc8-firebase-adminsdk-9c46v-608b2d1c07.json");

app.use(volleyball);
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});

app.use(express.static("../src"));
app.use(express.static("public"));

app.use(
  session({
    secret: "streamint",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    function(email, password, done) {
      User.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (!user) return null, false;
          if (password !== user.password) return done(null, false);
          done(null, user);
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

schedule.scheduleJob("*/1440 * * * *", function() {
  return sendReminder();
});

app.use("/api", routes);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.use((err, req, res, next) => {
  res.status(404).send(err.message);
});

const port = 3001;

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  });
  sendReminder();
});
