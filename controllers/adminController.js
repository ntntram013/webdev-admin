const bcrypt = require('bcryptjs');

const adminModel = require('../models/adminModel');
const adminService = require('../models/adminService');

module.exports.login = (req, res) => {
    if (req.user) {
        res.redirect('/index');
        return;
    } else {
        let errors = [];
        if (res.locals.err.length > 0) {
            errors.push(res.locals.err);
        }
        res.render('signIn/login', {
            layout: 'loginLayout',
            title: 'Đăng Nhập | WebDev468',
            errors: errors
        });
    }
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.forgetPass = async (req, res) => {
    res.render('signIn/forgetPass', {
        layout: 'loginLayout',
        title: 'Quên mật khẩu | WebDev468'
    });
    // get the only admin
    const admin = await adminModel.getTheOnlyAdmin();
    // send reset password email to admin
    const url = process.env.URI_STORE_SERVER + '/forget/' + admin._id.toString();
    let content = '';
    content += `
               <div style="padding: 10px; background-color: #49439a">
                    <div style="padding: 10px; background-color: #d9ffff;">
                        <h4 style="color: #59689a">Có phải vừa có yêu cầu đặt lại mật khẩu cho tài khoản admin hệ thống <span style="color: #6a0026">${admin.username}</span>?</h4>
                        <span style="color: black">Nhấn </span><a href="${url}">vào đây</a> để đặt mật khẩu mới.
                        <br><br><br>
                        <span style="color: #4c4a4a"><i>Nếu admin không yêu cầu đặt lại mật khẩu, xin hãy bỏ qua email này.</i><br></span>
                         <br><br><br>
                    </div>
               </div>
            `;
    const mainOptions = {
        from: '468-BOOKSTORE',
        to: admin.email,
        subject: 'Đặt Lại Mật Khẩu | WebDev468',
        html: content
    }
    const config = {
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_SERVER,
            pass: process.env.EMAIL_PASS
        }
    };
    await adminService.sendMail(config, mainOptions);
}

// module.exports.resetPass = async (req, res) => {
//     const adminId = req.params.token;
//     await adminModel.detail(adminId).then(result => {
//         res.render('signIn/reset-pass', {
//             title: 'Đặt lại mật khẩu',
//             isGet: true
//         });
//     }).catch(err => {
//         res.render('signIn/reset-pass', {
//             title: 'Đặt lại mật khẩu',
//             isGet: true,
//             errors: 'Có lỗi xảy ra. Thử lại sau nhé!'
//         });
//     });
// }

// module.exports.postResetPass = async (req, res) => {
//     const {password, retypePassword} = req.body
//     let errors = [];
//     if (password === retypePassword) {
//         const userId = req.params.token
//         const hashedPassword = await userService.hashPass(password);
//         userModel.updateByQuery(userId, 'password', hashedPassword).then(result => {
//             const {matchedCount, modifiedCount} = result;
//             if (matchedCount && modifiedCount) {
//                 res.render('signIn/reset-pass', {
//                     title: 'Đặt lại mật khẩu',
//                     isGet: false,
//                 });
//             }
//         });
//         return;
//     } else if (password.length < 5) {
//         errors.push('Mật khẩu phải ít nhất 5 ký tự!');
//     } else {
//         errors.push('Mật khẩu không khớp. Vui lòng nhập lại.');
//     }
//     res.render('signIn/reset-pass', {
//         title: 'Đặt lại mật khẩu',
//         isGet: true,
//         validateErrors: errors
//     });
// }
