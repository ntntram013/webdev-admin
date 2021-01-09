const {db} = require('../dal/userDal');
const {ObjectId} = require('mongodb');

exports.Detail=async(id)=>
{

    const userCollection = db().collection('User');
    const user=await userCollection.findOne({'_id':ObjectId(id)});
    return user;

}