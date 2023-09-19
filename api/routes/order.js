
const Order = require("../models/Order")
const { verifyToken,verifyTokenAndAutherization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE Order

router.post("/", verifyToken, async (req,res)=> {
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE Order

router.put("/:id",verifyTokenAndAdmin,async (req,res)=> {
   
try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set: req.body,
    },{new:true});

    res.status(200).json(updatedOrder)
}catch(err){
    res.status(500).json(err);
}

})

//DELETE Order

router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET User Orders

router.get("/find/:userId",verifyTokenAndAutherization,async (req,res)=>{
    try{
        const Orders = await Order.find({userId: req.params.userId});

        res.status(200).json({Orders});
    }catch(err){
        res.status(500).json(err)
    }
})

//GET All

router.get("/",verifyTokenAndAdmin,async (req,res)=> {
    try{
        const orders = await Order.find();
        res.status(200).json(orders)

    }catch(err){
        res.status(500).json(err)
    }
})


// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: {
          _id: -1, // Sort in descending order of _id (month)
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;