module.exports.requireAuth = (req,res,next)=>{
    if(!req.signedCookies.cookieID){
        res.redirect('/');
        return;
    }

    if(req.signedCookies.cookieID !== 'abcxyz'){
        res.redirect('/');
        return;
    }

    next();
};