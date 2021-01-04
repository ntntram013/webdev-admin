const {ObjectId} = require('mongodb');
const bcrypt = require('bcryptjs');

const {db} = require("../dal/adminDal");
const adminService = require('../models/adminService');

exports.getTheOnlyAdmin = async () => {
    const adminCollection = db().collection('Admin');
    const admin = await adminCollection.findOne({});
    return admin;
}

exports.updateByQuery = async (id, field, fieldValue) => {
    const adminCollection = db().collection('Admin');
    let updateVal = {};
    updateVal[field] = fieldValue;
    const result = await adminCollection.updateOne({
        "_id": ObjectId(id)
    }, {
        $set: updateVal
    });
    return result;
}

module.exports.queryAdmin = async (queryField, fieldInfo) => {
    const adminCollection = db().collection('Admin');
    let query = {};
    //query["isDeleted"] = false;
    query[queryField] = fieldInfo;
    const user = await adminCollection.findOne(query);
    return user;
}


