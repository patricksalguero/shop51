import mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    subname : String,
    description : String,
    created : Date,
    price : Number,
    weight : Number,
    measure: String,
    image : String,
    stock : { type: Number , default : 0 },
    isActive : { type: Number , default : 1 }
})

const Product = mongoose.model("Product", schema);

export default Product;