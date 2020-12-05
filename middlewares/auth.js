module.exports.requireAuth = (req,res,next)=>{
    if(!req.cookies.cookieID){
        res.redirect('/');
        return;
    }

    if(req.cookies.cookieID != 'abcxyz'){
        res.redirect('/');
        return;
    }

    next();
};