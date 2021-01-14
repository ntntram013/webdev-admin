module.exports.requireAuth = (req, res, next) => {
    if (req.isAuthenticated() === false && req.url !== '/login') {
        if (req.url !== '/'){
            req.flash('err', 'Bạn cần đăng nhập trước');
        }
        res.redirect('/login');
        return;
    }

    next();
};