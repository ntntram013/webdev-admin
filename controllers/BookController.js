const formidable = require('formidable');
let cloudinary = require('cloudinary').v2;

const {ObjectId} = require('mongodb');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})



const bookModel=require('../models/BookModel');
const publisherModel=require('../models/publisherModel');
const categoryModel=require('../models/catalogModel');
exports.index=async(req,res,next)=>
{
    let [book,publisher] = await Promise.all(
        [bookModel.list(),publisherModel.list()]);

    res.render('store',{title:'Danh sách',book});
}

exports.add=async(req, res, next)=>
{
    const page=req.body.page;
    const item=req.body.item;
    let [publisherList, catalogList, coverList] = await Promise.all(
        [publisherModel.list(),categoryModel.list(),bookModel.coverList()])
    res.render('addBook',{title:'Thêm mới',publisherList,catalogList,coverList,page,item});
}
exports.modify = async (req,res,next)=> {
    console.log(req.params.id);
    let [book, publisherList, catalogList, coverList] = await Promise.all(
        [bookModel.detail(req.params.id),publisherModel.list(),categoryModel.list(),bookModel.coverList()])
    //const book = await ;
    const page=req.body.page;
    const item=req.body.item;

    //const publisherList=await ;

    //const catalogList=await categoryModel.list();

    book.catalogList = catalogList;
    book.publisherList = publisherList;
    book.coverList =coverList;
    console.log(catalogList.length);

    book.choseCatalogName=await categoryModel.getCategory(book.categoryID);

    res.render('bookModify', {title: 'Chỉnh sửa', book,page,item});

}



exports.detail = async (req, res, next) =>
{

    const book = await bookModel.detail(req.params.id);
    let [publisherName, category, cover] = await Promise.all(
        [publisherModel.getPublisher(book.publisherID),
                categoryModel.getCategory(book.categoryID),bookModel.getCoverForm(book.coverForm)]);
    const page=req.body.page;
    const item=req.body.item;
    console.log(page);
    book.page=page;
    book.publisherName = publisherName;
    book.category = category;
    book.coverForm = cover;
    book.item=item;

    res.render('bookDetail', {title: 'Chỉnh sửa', book, page,item});



}



exports.postAdd=async(req,res,next)=>
{


    const form = formidable({multiple: true});

    await form.parse(req, async (err, fields, files) =>{
        if(err){
            next(err);
            return;
        }
        const backUrl="/store/?page="+fields.page+"&item="+fields.item;
        let bookImage = [];

        if(files.imageFile0.size> 0){
            await cloudinary.uploader.upload(files.imageFile0.path,
                function(error, result) {
                    bookImage.push(result.secure_url);
                });
        }
        if(files.imageFile1.size> 0){
           await cloudinary.uploader.upload(files.imageFile1.path,
                function(error, result) {
                    console.log(result, error);
                    bookImage.push(result.secure_url);
                });
        }
        if(files.imageFile2.size> 0){
            await cloudinary.uploader.upload(files.imageFile2.path,
                function(error, result) {
                    console.log(result, error);
                    bookImage.push(result.secure_url);
                });
        }
        console.log(bookImage);
        await bookModel.add(fields,bookImage).then(res.redirect(backUrl));

        res.redirect(backUrl);

    });


}

exports.postModify=async(req,res,next)=>
{


    const form = formidable({multiple: true});

    await form.parse(req, async (err, fields, files) =>{
        if(err){
            next(err);
            return;
        }
        let bookImage = [fields.bookImage0,fields.bookImage1, fields.bookImage2];
        const backUrl="/store/?page="+fields.page+"&item="+fields.item;
        if(files.imageFile0.size> 0){
            await cloudinary.uploader.upload(files.imageFile0.path,
                function(error, result) {
                    console.log(result, error);
                    bookImage[0]=result.secure_url;
                });
        }
        if(files.imageFile1.size> 0){
            await cloudinary.uploader.upload(files.imageFile1.path,
                function(error, result) {
                    console.log(result, error);
                    bookImage[1]=result.secure_url;
                });
        }
        if(files.imageFile2.size> 0){
            await cloudinary.uploader.upload(files.imageFile2.path,
                function(error, result) {
                    console.log(result, error);
                    bookImage[2]=result.secure_url;
                });
        }

            bookModel.update(req.params.id, fields,bookImage).then(res.redirect(backUrl));



    });

    res.redirect('back');

}

exports.delete=async(req,res,next)=>
{
    const id=req.params.id;
    await bookModel.delete(id).then(res.redirect('/store/?page=1&item=3'));
}

exports.pagination=async(req,res,next)=>
{

    let resPerPage=parseInt(req.query.item);
    if (isNaN(resPerPage) || resPerPage <1)
    {
        resPerPage=5;
    }
    let titleSearch=req.query.title;
    console.log(titleSearch);

    const itemOption1=5;
    let itemOption2=10;
    let itemOption3=20;

    switch(resPerPage)
    {
        case 5:
            itemOption2=10;
            itemOption3=20;
            break;

        case 10:
            itemOption2=5;
            itemOption3=20;
            break;

        case 20:
            itemOption2=5;
            itemOption3=10;
    }

    const slugify=require('slugify');
    let parseBookName;



    let page = +req.query.page || 1;
    page = parseInt(page);

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

    }
    else {
        parseBookName=undefined;
        dontFindTitle=true;
    }
    const totalPage= Math.ceil(await bookModel.TotalProduct(parseBookName)/resPerPage);
    if(page < 1){
        page = 1
    }
    else if(page > totalPage){
        page = totalPage;
    }

    if(titleSearch!=undefined){
        productPerPage=await bookModel.PaginationFindTitle(parseBookName,resPerPage,page);
    }
    else{
        productPerPage = await bookModel.Pagination(resPerPage, page);
    }


    const currentPage=page;
    const nextPage=parseInt(currentPage+1);
    const previousPage=parseInt(currentPage-1);

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

    res.render('store',{title:'Danh sách',book:productPerPage,previousPage:previousPage,nextPage:nextPage,IsHasPrev,IsHasNext,currentPage,resPerPage,
        itemOption2,
        itemOption3,
        dontFindTitle,
        title:titleSearch
    });

}

