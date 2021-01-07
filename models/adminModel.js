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

exports.ChangePassword=async(id,newPass)=>
{
    const password=newPass;
    const adminCollection = db().collection('Admin');
    await adminCollection.updateOne({"_id":ObjectId(id)},{$set: {
            password:newPass
}})
}

exports.Update=async(id,Admin)=>
{
    let updateVal=Admin;
    const adminCollection = db().collection('Admin');
    const email=Admin.email;
    const address=Admin.address;
    const gender=Admin.gender;
    const name=Admin.name;
    const phone=Admin.phone

    const book={
        $set:
            {
                email:email,
                address:address,
                gender:gender,
                name:name,
                phone:phone
            }
    }

    const result = await adminCollection.updateOne({
        "_id": ObjectId(id)},book);
}

module.exports.queryAdmin = async (queryField, fieldInfo) => {
    const adminCollection = db().collection('Admin');
    let query = {};
    //query["isDeleted"] = false;
    query[queryField] = fieldInfo;
    const user = await adminCollection.findOne(query);
    return user;
}


