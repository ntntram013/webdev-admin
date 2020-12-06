const {db}=require('../dal/book_dal')
const {ObjectId} = require('mongodb');


exports.list=async()=>
{
    const booksCollection=db().collection('Product');
    const bookList =await booksCollection.find({'isDeleted':false}).toArray();
    return bookList;
}

exports.add= async(book)=>
{
    const booksCollection=db().collection('Product')
    await booksCollection.insertOne(book);
}
exports.detail = async (id)=>
{
    const booksCollection=db().collection('Product');
    const book = await booksCollection.findOne({_id:ObjectId(id),isDeleted: false});

    return book;

}


exports.update=async (id,bookUpdate)=>
{
    const booksCollection=db().collection('Product');
    await booksCollection.updateOne({"_id":ObjectId(id)},bookUpdate);
}

exports.delete=async(id)=>
{
    const booksCollection=db().collection('Product');
    await booksCollection.updateOne({"_id":ObjectId(id)},{$set:{'isDeleted':true}});
}

exports.Pagination=async (itemPerPage,currentPage)=>
{
    const booksCollection=db().collection('Product');
    const bookPerPage=await booksCollection.find({isDeleted:false}).skip((itemPerPage*currentPage)-itemPerPage).limit(itemPerPage).toArray();
    return bookPerPage;

}
exports.TotalProduct=async()=>
{
    const booksCollection=db().collection('Product');
    const numBook=await booksCollection.find({isDeleted: false}).count();
    return numBook;
}