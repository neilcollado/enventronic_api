require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { comparePassword } = require('../utils/authUtils');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

passport.use(
    new Strategy( async (username, password, done) => {
            try {
                if(!username || !password) throw new Error('Missing Credentials');
                const userDB = await User.findOne({username});
                if(userDB) {
                    // console.log(userDB);
                    const isValid = comparePassword(password, userDB.password);
                    if(isValid) {
                      console.log('User Authenticated');
                      done(null, userDB);  
                    } else {
                        console.log('Failed to Authenticate');
                        done(null, null);
                    }
                } else {
                    done(null, null);
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET
}, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.sub);
        if (!user) {
            return done(null, false);
        }
        // console.log(jwtPayload.role);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

