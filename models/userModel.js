const {ObjectId} = require('mongodb');
const slugify = require('slugify');

const {db} = require('../dal/accountDal')

module.exports.list = async () => {
    const userCollection = db().collection('User');
    const userList = await userCollection.find({'isDeleted': false}).toArray();
    return userList;
}

module.exports.detail = async (id) => {
    const userCollection = db().collection('User');
    const user = await userCollection.findOne({_id: ObjectId(id), isDeleted: false});
    return user;
}

module.exports.updateField = async (id,field,fieldValue) => {
    const userCollection = db().collection('User');
    let updateVal = {};
    updateVal[field] = fieldValue;
    await userCollection.updateOne({
        "_id": ObjectId(id)
    }, {
        $set: updateVal
    });
}

module.exports.testblock = async (id) => {
    const userCollection = db().collection('User');
    await userCollection.updateOne({"_id": ObjectId(id)}, {$set: {'isBlocked': true}});
}


module.exports.Pagination = async (itemPerPage, currentPage) => {
    const userCollection = db().collection('User');
    const userPerPage = await userCollection.find({isDeleted: false})
        .skip((itemPerPage * currentPage) - itemPerPage)
        .limit(itemPerPage)
        .toArray();
    return userPerPage;
}

module.exports.TotalUser = async () => {
    const userCollection = db().collection('User');
    const numUser = await userCollection.find({isDeleted: false}).count();
    return numUser;
}