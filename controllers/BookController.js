
const bookModel=require('../models/BookModel');
exports.index=async(req,res,next)=>
{
    const book=await bookModel.list();
    res.render('store',{title:'Danh sách',book});
}

exports.add=async(req, res, next)=>
{
    res.render('addBook',{title:'Thêm mới'});
}
exports.modify = async (req,res,next)=> {
    console.log(req.params.id);
    const book = await bookModel.detail(req.params.id);

    res.render('bookModify', {title: 'Chỉnh sửa', book});

}
exports.detail = async (req, res, next) =>
{
    const book = await bookModel.detail(req.params.id);

    res.render('bookDetail', {title: 'Chỉnh sửa', book});
}



exports.postAdd=async(req,res,next)=>
{
    const isbn=req.body.isbn;
    const category=req.body.category;
    const bookImage=req.body.bookImage;
    const bookName=req.body.bookName;
    const author=req.body.author;
    const publisher=req.body.publisher;
    const price=req.body.price;
    const totalPage=req.body.totalPage;
    const coverForm=req.body.coverForm;
    const detail=req.body.detail;
    const isDeleted=false;
    const book={ isbn:isbn,category:category,bookImage:bookImage, bookName:bookName,author:author,publisher:publisher,price:price,totalPage:totalPage,coverForm:coverForm,detail:detail,isDeleted:isDeleted};
    await bookModel.add(book).then(res.redirect("/store"));
}

exports.postModify=async(req,res,next)=>
{
    const isbn=req.body.isbn;
    const category=req.body.category;
    const bookImage=req.body.bookImage;
    const bookName=req.body.bookName;
    const author=req.body.author;
    const publisher=req.body.publisher;
    const price=req.body.price;
    const totalPage=req.body.totalPage;
    const coverForm=req.body.coverForm;
    const detail=req.body.detail;
    const isDeleted=false;
    const book={$set: { isbn:isbn,category:category,bookImage:bookImage, bookName:bookName,author:author,publisher:publisher,price:price,totalPage:totalPage,coverForm:coverForm,detail:detail,isDeleted:isDeleted}};
    await bookModel.update(req.params.id,book).then(res.redirect("/store"));

}

exports.delete=async(req,res,next)=>
{
    const id=req.params.id;
    await bookModel.delete(id).then(res.redirect('/store'));
}

