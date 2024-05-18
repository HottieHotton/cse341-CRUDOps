const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GitHubAuth = require("passport-github").Strategy;
const cors = require("cors");
const port = process.env.PORT || 3000;

const { initDb } = require("./db/connect");

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database Online. Listening on port ${port}`);
    });
    app.use(bodyParser.json());
    app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
      res.setHeader("Access-Controll-ALlow-Origin", "*");
      res.setHeader(
        "Access-Controll-ALlow-Origin",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
      );
      next();
    });
    app
      .use(
        cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] })
      )
      .use(cors({ origin: "*" }));
    app.use("/", require("./routes"));

    passport.use(new GitHubAuth ({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(processToken, refreshToken, profile, done){
        return done(null, profile);
    }));
    passport.serializeUser((user, done) =>{
        done(null, user);
    });
    passport.deserializeUser((user, done) =>{
        done(null, user);
    });

    app.get('/', (req,res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});
    app.get('/github/callback', passport.authenticate('github', {
        failureRedirect: "/api-docs", session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    })
  }
});
