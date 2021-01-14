const {db} = require('../dal/catalogDal');
const {ObjectId} = require('mongodb');

exports.Pagination = async (itemPerPage, currentPage) => {
    const catalogCollection = db().collection("Catalog");
    const bookCollection=db().collection("Product");
    const catalogPerPage = await catalogCollection.find().skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage).toArray()
    for (let  i=0;i<catalogPerPage.length;i++)
    {
        catalogPerPage[i].bookNum=await bookCollection.find({"categoryID":catalogPerPage[i]._id}).count();
    }
    return catalogPerPage;
}


exports.totalRow=function()
{
    const catalogCollection = db().collection("Catalog");
    return catalogCollection.countDocuments();
}

exports.detail=async(id)=>
{
    const catalogCollection = db().collection("Catalog");
    const catalog=catalogCollection.find({"_id":ObjectId(id)}).toArray();
    return catalog;
}

exports.modifyName=async(id,name)=>
{
    const catalogCollection = db().collection("Catalog");

    const data = {
        $set: {
           catalogName:name
        }
    };


    await catalogCollection.updateOne({"_id": ObjectId(id)}, data);
}

exports.add=async(name)=>
{
    const catalogCollection = db().collection("Catalog");
    const catalog=
        {
            catalogName: name,
            isDeleted:false
        }

    await catalogCollection.insertOne(catalog);
}
exports.getCategory = async (id) =>{
    const catalogCollection = db().collection('Catalog');
    const result = await catalogCollection.findOne({_id:ObjectId(id)});
    return result.catalogName;
}

exports.list = async () => {
    const catalogCollection = db().collection('Catalog');
    const catalogList = await catalogCollection.find({'isDeleted': false}).toArray();
    return catalogList;
}
