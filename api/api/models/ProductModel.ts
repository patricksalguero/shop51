import mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    subname : String,
    description : String,
    created : Date,
    price : Number,
    stock : Number,
    isActive : { type: Number , default : 1 }
})

const Product = mongoose.model("Product", schema);

export default Product;