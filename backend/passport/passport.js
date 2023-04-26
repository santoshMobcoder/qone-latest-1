const passport = require("passport");
const passportJWT = require("passport-jwt");
const { connect } = require("../db/dbConn");
const { ObjectId } = require("mongodb");
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      const db = await connect();

      return db
        .collection("users")
        .findOne(
          { email, password },
          {
            projection: { __v: 0, password: 0 },
          }
        )
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          return cb(null, user, {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    async function (jwtPayload, cb) {
      const db = await connect();

      return db
        .collection("users")
        .findOne({ _id: new ObjectId(jwtPayload._id) })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
