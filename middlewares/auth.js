module.exports.requireAuth = (req, res, next) => {
    if(req.isAuthenticated()==false && req.url != '/login') {

        req.flash('error','Bạn cần đăng nhập trước')
        res.redirect('/login');

        return;
    }
    next();
};