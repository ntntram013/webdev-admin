let passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const adminService = require('../models/adminService');

passport.use(new LocalStrategy({usernameField: 'username', passwordnameField: 'password', passReqToCallback: true},
    async (req, username, password, done) => {
        try {
            const user = await adminService.checkCredential(username, password);
            if (user === -1) {
                return done(null, false, req.flash('err', 'Mật khẩu không đúng!'));
            }
            if (user === 0) {
                return done(null, false, req.flash('err', 'Tài khoản không tồn tại!'));
            }
            return done(null, user);
        } catch (e) {
            return done(null, false, req.flash('err', 'Có lỗi xảy ra!'));
        }
    }
));

passport.serializeUser((user, done) => {
    // save _id to session
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    adminService.getAdmin().then((admin) => {
        // get user from _id that is saved in session
        return done(null, admin);
    })
});

module.exports = passport;