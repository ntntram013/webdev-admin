const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const adminModel = require('../models/adminModel');

module.exports.checkCredential = async (loginInfo, password) => {
    const adminByUsername = await adminModel.queryAdmin('username', loginInfo);
    const adminByEmail = await adminModel.queryAdmin('email', loginInfo);
    const existedAdmin = adminByEmail || adminByUsername;
    if (existedAdmin) {
        let checkPassword = await bcrypt.compare(password, existedAdmin.password);
        if (!checkPassword) {
            return -1;
        }
        return existedAdmin;
    }
    return 0;
}

module.exports.getAdmin = () => {
    return adminModel.getTheOnlyAdmin();
}

module.exports.hashPass = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

//  wrapper function to await nodemailer
module.exports.sendMail = async (config, mailOptions) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport(config);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error is " + error);
                resolve(false); // or use rejcet(false) but then you will have to handle errors
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
}