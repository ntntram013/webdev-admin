const {db} = require('../dal/book_dal')
const {ObjectId} = require('mongodb');
const slugify = require('slugify');
const {db1}=require('../dal/catalogDal');


exports.list = async () => {
    const booksCollection = db().collection('Product');
    const bookList = await booksCollection.find({'isDeleted': false}).toArray();

    return bookList;
}

exports.add = async (fields, newBookImage) => {
    const isbn = fields.isbn;
    const category = fields.category;
    const bookImage = newBookImage;
    const bookName = fields.bookName;
    const author = fields.author;
    const publisher = fields.publisher;
    const price = fields.price;
    const totalPage = fields.totalPage;
    const coverForm = fields.coverForm;
    const detail = fields.detail;
    const isDeleted = false;

    const parseBookName = slugify(fields.bookName, {
        replacement: ' ',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
    })
    const book = {
        isbn: isbn,
        categoryID: ObjectId(category),
        bookImage: bookImage,
        bookName: bookName,
        author: author,
        publisherID: ObjectId(publisher),
        price: price,
        totalPage: totalPage,
        coverForm: ObjectId(coverForm),
        detail: detail,
        isDeleted: isDeleted,
        parseBookName: parseBookName
    };
    const booksCollection = db().collection('Product')
    await booksCollection.insertOne(book);
}
exports.detail = async (id) => {
    const booksCollection = db().collection('Product');

    const book = await booksCollection.findOne({_id: ObjectId(id), isDeleted: false});

    return book;

}


exports.update = async (id, bookUpdate, newBookImage) => {
    const isbn = bookUpdate.isbn;
    const category = bookUpdate.category;
    const bookImage = newBookImage;
    const bookName = bookUpdate.bookName;
    const author = bookUpdate.author;
    const publisher = bookUpdate.publisher;
    const price = bookUpdate.price;
    const totalPage = bookUpdate.totalPage;
    const coverForm = bookUpdate.coverForm;
    const detail = bookUpdate.detail;
    const isDeleted = false;
    const slugify = require('slugify');
    const parseBookName = slugify(bookUpdate.bookName, {
        replacement: ' ',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
    })
    const book = {
        $set: {
            isbn: isbn,
            categoryID: ObjectId(category),
            bookImage: bookImage,
            bookName: bookName,
            author: author,
            publisherID: ObjectId(publisher),
            price: price,
            totalPage: totalPage,
            coverForm: ObjectId(coverForm),
            detail: detail,
            isDeleted: isDeleted,
            parseBookName: parseBookName
        }
    };
    const booksCollection = db().collection('Product');
    await booksCollection.updateOne({"_id": ObjectId(id)}, book);
}

exports.delete = async (id) => {

    const booksCollection = db().collection('Product');
    await booksCollection.updateOne({"_id": ObjectId(id)}, {$set: {'isDeleted': true}});
}

exports.Pagination = async (itemPerPage, currentPage) => {
    const booksCollection = db().collection('Product');
    const bookPerPage = await booksCollection.find({isDeleted: false}).skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage).toArray();





    return bookPerPage;

}
exports.PaginationFindTitle = async (searchName, itemPerPage, currentPage) => {
    const booksCollection = db().collection('Product');

    const bookPerPage = await booksCollection.find({
        isDeleted: false,
        parseBookName: new RegExp(searchName)
    }).skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage).toArray();
    return bookPerPage;
}

exports.TotalProduct = async (filterName) => {
    const booksCollection = db().collection('Product');
    if (filterName == undefined) {

        const numBook = await booksCollection.find({isDeleted: false}).count();
        return numBook;
    } else {
        const numBook = await booksCollection.find({isDeleted: false, parseBookName: new RegExp(filterName)}).count();
        return numBook;
    }

}


exports.getCoverForm = async (id) =>{
    const coverCollection = db().collection('Cover');
    const result = await coverCollection.findOne({_id:ObjectId(id)});
    return result.coverName;
}
exports.coverList= async () =>{
    const coverCollection = db().collection('Cover');
    const result = await coverCollection.find({'isDeleted': false}).toArray();
    return result;
}