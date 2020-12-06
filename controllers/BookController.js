const formidable = require('formidable');
let cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})



const bookModel=require('../models/BookModel');
exports.index=async(req,res,next)=>
{
    const book=await bookModel.list();
    res.render('store',{title:'Danh sách',book});
}

exports.add=async(req, res, next)=>
{
    const page=req.body.page;
    const item=req.body.item;
    res.render('addBook',{title:'Thêm mới',page,item});
}
exports.modify = async (req,res,next)=> {
    console.log(req.params.id);
    const book = await bookModel.detail(req.params.id);
    const page=req.body.page;
    const item=req.body.item;
    res.render('bookModify', {title: 'Chỉnh sửa', book,page,item});

}
exports.detail = async (req, res, next) =>
{
    const book = await bookModel.detail(req.params.id);

    const page=req.body.page;
    const item=req.body.item;
    console.log(page);
    book.page=page;
    book.item=item;
    res.render('bookDetail', {title: 'Chỉnh sửa', book,page,item});
}



exports.postAdd=async(req,res,next)=>
{

    const slugify=require('slugify');



    const isbn=req.body.isbn;
    const category=req.body.category;
    const bookImage=req.body.bookImage;
    const bookName=req.body.bookName;
    const parseBookName=slugify(bookName, {
        replacement: ' ',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
    })
    const author=req.body.author;
    const publisher=req.body.publisher;
    const price=req.body.price;
    const totalPage=req.body.totalPage;
    const coverForm=req.body.coverForm;
    const detail=req.body.detail;
    const isDeleted=false;
    const book={ isbn:isbn,category:category,bookImage:bookImage, bookName:bookName,author:author,publisher:publisher,price:price,totalPage:totalPage,coverForm:coverForm,detail:detail,isDeleted:isDeleted,parseBookName:parseBookName};

    const backUrl="/store/?page="+req.body.page+"&item="+req.body.item;
    await bookModel.add(book).then(res.redirect(backUrl));

    const form = formidable({multiple: true});

    await form.parse(req, (err, fields, files) =>{
        if(err){
            next(err);
            return;
        }
        if(files.imageFile && files.imageFile.size> 0){
            cloudinary.uploader.upload(files.imageFile.path,
                function(error, result) {
                    console.log(result, error);
                    fields.bookImage = result.secure_url;
                    bookModel.add(fields).then(res.redirect("/store"));
                });
        }
        else{
            bookModel.add(fields).then(res.redirect("/store"));
        }


    });

}

exports.postModify=async(req,res,next)=>
{



    const isbn=req.body.isbn;
    const category=req.body.category;
    const bookImage=req.body.bookImage;
    const bookName=req.body.bookName;
    const slugify=require('slugify');
    const parseBookName=slugify(bookName, {
        replacement: ' ',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi'       // language code of the locale to use
    })

    const author=req.body.author;
    const publisher=req.body.publisher;
    const price=req.body.price;
    const totalPage=req.body.totalPage;
    const coverForm=req.body.coverForm;
    const detail=req.body.detail;
    const isDeleted=false;
    const book={$set: { isbn:isbn,category:category,bookImage:bookImage, bookName:bookName,author:author,publisher:publisher,price:price,totalPage:totalPage,coverForm:coverForm,detail:detail,isDeleted:isDeleted,parseBookName:parseBookName}};


    const backUrl="/store/?page="+req.body.page+"&item="+req.body.item;

    await bookModel.update(req.params.id,book).then(res.redirect(backUrl));

    const form = formidable({multiple: true});

    await form.parse(req, (err, fields, files) =>{
        if(err){
            next(err);
            return;
        }
        if(files.imageFile.size> 0){
            cloudinary.uploader.upload(files.imageFile.path,
                function(error, result) {
                    console.log(result, error);
                    fields.bookImage = result.secure_url;
                    bookModel.update(req.params.id, fields).then(res.redirect("/store"));
                });
        }
        else{
            bookModel.update(req.params.id, fields).then(res.redirect("/store"));
        }


    });



}

exports.delete=async(req,res,next)=>
{
    const id=req.params.id;
    await bookModel.delete(id).then(res.redirect('/store/?page=1&item=3'));
}

exports.pagination=async(req,res,next)=>
{

    let resPerPage=parseInt(req.query.item);
    if (isNaN(resPerPage))
    {
        resPerPage=3;
    }
    let titleSearch=req.query.title;
    console.log(titleSearch);

    const itemOption1=3;
    let itemOption2=5;
    let itemOption3=6;

    switch(resPerPage)
    {
        case 3:
            itemOption2=5;
            itemOption3=6;
            break;

        case 5:
            itemOption2=3;
            itemOption3=6;
            break;

        case 6:
            itemOption2=3;
            itemOption3=5;
    }

    const slugify=require('slugify');
    let parseBookName;



    let page = +req.query.page || 1;
    const currentPage=parseInt(page);
    const nextPage=parseInt(currentPage+1);
    const previousPage=parseInt(currentPage-1);

    let IsHasPrev=true;
    let IsHasNext=true;

    let dontFindTitle;
    let productPerPage;
    if (titleSearch!=undefined)
    {
        parseBookName=slugify(titleSearch, {
            replacement: ' ',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
        });

        dontFindTitle=false;
        productPerPage=await bookModel.PaginationFindTitle(parseBookName,resPerPage,page);
    }
    else {
        parseBookName=undefined;
        productPerPage = await bookModel.Pagination(resPerPage, page);
        dontFindTitle=true;
    }

    const totalPage= Math.ceil(await bookModel.TotalProduct(parseBookName)/resPerPage);
    if (currentPage==1)
    {
        IsHasPrev=false;
    }
    if (currentPage==totalPage)
    {
        IsHasNext=false;
    }
    for (i=0;i<productPerPage.length;i++)
    {
        productPerPage[i].resPerPage=resPerPage;
        productPerPage[i].currentPage=currentPage;
    }
    res.render('store',{title:'Danh sách',book:productPerPage,previousPage:previousPage,nextPage:nextPage,IsHasPrev,IsHasNext,currentPage,resPerPage,
        itemOption2,
        itemOption3,
        dontFindTitle,
        title:titleSearch
    });

}

