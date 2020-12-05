module.exports.login = (req,res)=>{
    if(req.cookies.cookieID == 'abcxyz'){
        res.redirect('/index');
        return;
    }

    res.render('login',{
        layout: false,
    });
}

module.exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const pass = req.body.password;

    if(email !== 'admin@gmail.com'){
        res.render('login',{
            layout: false,
            errors: [
                'Email không hợp lệ!'
            ],
        });
        return;
    }

    if(pass !== 'admin'){
        res.render('login',{
            layout: false,
            errors: [
                'Mật khẩu không đúng!'
            ],
        });
        return;
    }

    res.cookie('cookieID','abcxyz');
    res.redirect('/index');
}