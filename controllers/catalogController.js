const catalogModel = require('../models/catalogModel');
const userModel=require('../models/userModel');

exports.pagination=async(req,res,next)=>
{
    let currentPage=req.query.page || 1;
    currentPage=parseInt(currentPage);


    let ItemPerPage=req.query.item || 5;
    ItemPerPage=parseInt(ItemPerPage);

    const totalRow=await catalogModel.totalRow();

    const totalPage=Math.ceil(totalRow/ItemPerPage);


    let catalogPerPage=await catalogModel.Pagination(ItemPerPage,currentPage);









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

    let length=catalogPerPage.length;

    console.log(catalogPerPage);

    res.render('catalog',{title:'Quản lý gian hàng',currentPage:currentPage,IsHasNext:IsHasNext,IsHasPrev:IsHasPrev,
        nextPage:nextPage,previousPage:previousPage,Catalog:catalogPerPage,resPerPage:ItemPerPage,
        length

    });
}

exports.changeName=async(req,res,next)=>
{
    const id=req.params._id;
    const catalog=await catalogModel.detail(id);
    res.render('catalogDetail',{title:'Chi tiết thể loại',Catalog:catalog});
}

exports.postChangeName=async(req,res,next)=>
{
    const id=req.params._id;
    const newName=req.body.catalogName;
    await catalogModel.modifyName(id,newName).then(res.redirect('/catalog'));
}