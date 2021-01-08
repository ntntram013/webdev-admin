const {db} = require('../dal/orderDal');
const {ObjectId} = require('mongodb');

exports.totalRow=async()=>
{
    const orderCollection = db().collection('Orders');
    return orderCollection.countDocuments();


}


exports.Pagination = async (itemPerPage, currentPage) => {
    const orderCollection = db().collection('Orders');
    const orderPerPage = await orderCollection.find().skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage).toArray();
    return orderPerPage;
}

exports.UpdateStatus=async(id,NewStatus)=>
{
    const orderCollection = db().collection('Orders');
    await orderCollection.updateOne({"_id":ObjectId(id)}, {
            $set: {
                status: NewStatus
            }
        }
    )
}

exports.Detail=async(id)=>
{
    const orderCollection = db().collection('Orders');
    const order=orderCollection.findOne({"_id":ObjectId(id)});
    return order;
}