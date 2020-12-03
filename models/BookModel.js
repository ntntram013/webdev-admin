const {db}=require('../dal/book_dal')
const {ObjectId} = require('mongodb');


exports.list=async()=>
{
    const booksCollection=db().collection('Product');
    const bookList =await booksCollection.find({}).toArray();
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
    const book = await booksCollection.findOne({_id:ObjectId(id)})
    return book;

}

exports.update=async (id,bookUpdate)=>
{
    const booksCollection=db().collection('Product');
    booksCollection.update({"_id":ObjectId(id)},bookUpdate);
}
