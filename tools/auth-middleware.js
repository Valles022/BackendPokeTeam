const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'secretPassword' //TODO deberia estar en una variable de entorno .env
    }
    passport.use(new JwtStrategy(opts, (decode, done) => {
        return done(null, decode);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login' || req.path == '/uploads') {
        return next();
    }
    return passport.authenticate('jwt', {session: false})(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;