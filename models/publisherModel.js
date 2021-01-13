const {db} = require('../dal/catalogDal');
const {ObjectId} = require('mongodb');

exports.Pagination = async (itemPerPage, currentPage) => {
    const publisherCollection = db().collection("Publisher");
    const bookCollection=db().collection("Product");
    const publisherPerPage = await publisherCollection.find().skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage).toArray()
    for (let  i=0;i<publisherPerPage.length;i++)
    {
        publisherPerPage[i].bookNum=await bookCollection.find({"publisherID":publisherPerPage[i]._id}).count();
    }
    return publisherPerPage;
}


exports.totalRow=function()
{
    const catalogCollection = db().collection("Publisher");
    return catalogCollection.countDocuments();
}

exports.detail=async(id)=>
{
    const publishCollection = db().collection("Publisher");
    const publish=publishCollection.find({"_id":ObjectId(id)}).toArray();
    return publish;
}

exports.modifyName=async(id,name)=>
{
    const catalogCollection = db().collection("Publisher");
    await catalogCollection.findOne({"_id":ObjectId(id)},
        {
            $set:
                {
                    catalogName:name
                }
        })
}

exports.add=async(name)=>
{
    const publisherCollection = db().collection("Publisher");
    const publisher=
        {
            publisherName:name,
            isDeleted:false
        };
    await publisherCollection.insertOne(publisher);
}
