const orderModel = require('../models/orderModel');
const userModel=require('../models/userModel');

exports.RenderOrderList=async(req,res,next)=>
{
    const currentPage=parseFloat(req.query.page || 1);


    const ItemPerPage=parseFloat(req.query.item || 5);

    const totalRow=await orderModel.totalRow();

    const totalPage=Math.ceil(totalRow/ItemPerPage);


    const orderPerPage=await orderModel.Pagination(ItemPerPage,currentPage);



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

    let length=orderPerPage.length;

    res.render('order',{title:'Quản lý đơn hàng',currentPage:currentPage,IsHasNext,IsHasPrev,
    nextPage,previousPage,orderPerPage,resPerPage:ItemPerPage,
    length

    });
}

exports.ChangeStatus=async(req,res,next)=>
{
    console.log(req.body.orderID);
    console.log(req.body.status);

    const id=req.body.orderID;
    const status=req.body.status;

    await orderModel.UpdateStatus(id,status).then(res.status(200));
}

exports.RenderDetail=async(req,res,next)=>
{
    const id=req.params._id;
    console.log(id);
    let user;
    let order=await orderModel.Detail(id);
    console.log(order);
    user=await userModel.Detail(order.userID);
    res.render('orderDetail',{title:'Chi tiết đơn hàng',order,user});


}