const publisherModel = require('../models/publisherModel');
const userModel=require('../models/userModel');

exports.pagination=async(req,res,next)=>
{
    let currentPage=req.query.page || 1;
    currentPage=parseInt(currentPage);


    let ItemPerPage=req.query.item || 5;
    ItemPerPage=parseInt(ItemPerPage);

    const totalRow=await publisherModel.totalRow();

    const totalPage=Math.ceil(totalRow/ItemPerPage);


    let publisherPerPage=await publisherModel.Pagination(ItemPerPage,currentPage);









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

    let length=publisherPerPage.length;

    console.log(publisherPerPage);

    res.render('publisher',{title:'Quản lý gian hàng',currentPage:currentPage,IsHasNext:IsHasNext,IsHasPrev:IsHasPrev,
        nextPage:nextPage,previousPage:previousPage,Publisher:publisherPerPage,resPerPage:ItemPerPage,
        length

    });
}

exports.changeName=async(req,res,next)=>
{
    const id=req.params._id;
    const publisher=await publisherModel.detail(id);
    res.render('publisherDetail',{title:'Chi tiết nhà xuất bản',Publisher:publisher});
}

exports.postChangeName=async(req,res,next)=>
{
    const id=req.params._id;
    const newName=req.body.catalogName;
    await publisherModel.modifyName(id,newName).then(res.redirect('/publisher'));
}

exports.RenderAdd=function(req,res,next)
{
    res.render('publisherAdd',{title:'Thêm mới nhà xuất bản'});
}

exports.postAdd=async(req,res,next)=>
{
    const name=req.body.publisherName;
    if (name.length!=0)
    {
        req.flash('error','Không thể nhập chuỗi rỗng');
        res.redirect('/publisher/add');

    }

    await publisherModel.add(name).then(res.redirect('/publisher'));
}
