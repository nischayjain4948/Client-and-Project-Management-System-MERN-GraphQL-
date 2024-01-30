const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const Extractjwt = require("passport-jwt").ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET || "nischayJWT";
const { GraphQlID } = require("graphql");
const User = require("../models/User")


const jwtOptions = {
    jwtFromRequest: Extractjwt.fromAuthHeaderAsBearerToken(),
    secretorKey: JWT_SECRET
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = User.findOne({ _id: jwt_payload.userId }).lean();
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }


    }
    catch (error) {
        return done(error, false)
    }
});


passport.use(strategy);

module.exports = passport;