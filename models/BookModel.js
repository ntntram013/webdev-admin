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
exports.modify = async (id)=>
{
    const booksCollection=db().collection('Product');
    const book = await booksCollection.findOne({_id:ObjectId(id)})
    return book;

}
