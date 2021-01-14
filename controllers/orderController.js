const orderModel = require('../models/orderModel');
const userModel=require('../models/userModel');

exports.RenderOrderList=async(req,res,next)=>
{
    let currentPage=req.query.page || 1;
    currentPage=parseInt(currentPage);


    let ItemPerPage=req.query.item || 5;
    ItemPerPage=parseInt(ItemPerPage);

    const totalRow=await orderModel.totalRow();

    const totalPage=Math.ceil(totalRow/ItemPerPage);


    let orderPerPage=await orderModel.Pagination(ItemPerPage,currentPage);
    for(let i=0;i<orderPerPage.length;i++)
    {
        orderPerPage[i].Status=orderPerPage[i].status;

        switch (orderPerPage[i].status)
        {
            case 'Processing':
                orderPerPage[i].Status=1;
                break;

            case 'Deliver':
                orderPerPage[i].Status=2;
                break;

            case 'Delivered':
                orderPerPage[i].Status=3;
                break;

        }

    }








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

    res.render('order',{title:'Quản lý đơn hàng',currentPage:currentPage,IsHasNext:IsHasNext,IsHasPrev:IsHasPrev,
    nextPage:nextPage,previousPage:previousPage,orderPerPage:orderPerPage,resPerPage:ItemPerPage,
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

    switch(order.status)
    {
        case 'Processing':
            order.Status=1;
            break;
        case 'Deliver':
            order.Status=2;
            break;
        case 'Delivered':
            order.Status=3;
            break;
    }


    console.log(order);

    console.log(user);

    user=await userModel.detail(order.userId);
    res.render('orderDetail',{title:'Chi tiết đơn hàng',order:order,user:user});


}