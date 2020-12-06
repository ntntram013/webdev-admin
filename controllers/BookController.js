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
    await bookModel.delete(id).then(res.redirect('/store'));
}

exports.pagination=async(req,res,next)=>
{

    let resPerPage=parseInt(req.query.item);

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




    const page = +req.query.page || 1;
    const currentPage=parseInt(page);
    const nextPage=parseInt(currentPage+1);
    const previousPage=parseInt(currentPage-1);
    const totalPage= Math.ceil(await bookModel.TotalProduct()/resPerPage);
    let IsHasPrev=true;
    let IsHasNext=true;
    if (currentPage==1)
    {
        IsHasPrev=false;
    }
    if (currentPage==totalPage)
    {
        IsHasNext=false;
    }

    const productPerPage=await bookModel.Pagination(resPerPage,page);
    res.render('store',{title:'Danh sách',book:productPerPage,previousPage:previousPage,nextPage:nextPage,IsHasPrev,IsHasNext,currentPage,resPerPage,
        itemOption2,
        itemOption3,

    });

}

