const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({ 
    name: String,
    price: Number,
    image:String,
    featured:Boolean,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
    {
        timestamps:true
    },
);
const Product = mongoose.model("Product", productSchema);
// {name,price,user:'token bata aako id'}
// user=> chai kun user le product add delete garyo vanera herna lai lekheyeko ho vanera future self lai vanna chahanxu haha
module.exports = Product;
