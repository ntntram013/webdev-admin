const slugify = require('slugify');

const userModel = require('../models/userModel');


module.exports.detail = async (req, res, next) => {
    const userId = req.params.id
    const page = req.query.page; //currentPage
    const item = req.query.item; //resPerPage

    const user = await userModel.detail(userId);
    // for back button
    user.page = page;
    user.item = item;

    res.render('userDetail', {
        title: 'Xem tài khoản',
        user
    });
}

module.exports.delete = async (req, res, next) => {
    const userId = req.params.id;
    await userModel.updateField(userId,'isDeleted',true);
    let backUrl = '/users/';
    res.redirect(backUrl);
}

module.exports.block = async (req, res, next) => {
    const userId = req.params.id;
    // for backurl
    const page = req.query.page;
    const item = req.query.item;
    await userModel.updateField(userId,'isBlocked',true);
    let backUrl = '/users/' + userId + '?page=' + page + '&item=' + item;
    res.redirect(backUrl);
}

module.exports.unblock = async (req, res, next) => {
    const userId = req.params.id;
    // for backurl
    const page = req.query.page;
    const item = req.query.item;
    await userModel.updateField(userId,'isBlocked',false);
    let backUrl = '/users/' + userId + '?page=' + page + '&item=' + item;
    res.redirect(backUrl);
}

module.exports.pagination = async (req, res, next) => {
    // default /users/?page=1&item=5
    let resPerPage = parseInt(req.query.item);
    if (isNaN(resPerPage) || resPerPage < 1) {
        resPerPage = 5;
    }

    const itemOption1 = 5;
    let itemOption2 = 10;
    let itemOption3 = 20;
    switch (resPerPage) {
        case 5:
            itemOption2 = 10;
            itemOption3 = 20;
            break;
        case 10:
            itemOption2 = 5;
            itemOption3 = 20;
            break;
        case 20:
            itemOption2 = 5;
            itemOption3 = 10;
    }

    let page = + req.query.page || 1;
    let productPerPage;
    const totalPage = Math.ceil(await userModel.TotalUser() / resPerPage);
    if (page < 1) {
        page = 1;
    } else if (page > totalPage) {
        page = totalPage;
    }
    productPerPage = await userModel.Pagination(resPerPage, page);

    const currentPage = page;
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;

    let IsHasPrev = true;
    let IsHasNext = true;
    if (currentPage === 1) {
        IsHasPrev = false;
    }
    if (currentPage === totalPage) {
        IsHasNext = false;
    }

    for (i = 0; i < productPerPage.length; i++) {
        productPerPage[i].resPerPage = resPerPage;
        productPerPage[i].currentPage = currentPage;
    }

    res.render('users', {
        title: 'Khách Hàng | Danh sách tài khoản',
        user: productPerPage,
        previousPage: previousPage,
        currentPage: currentPage,
        nextPage: nextPage,
        IsHasPrev, IsHasNext,
        resPerPage,
        itemOption2, itemOption3
    });
}

