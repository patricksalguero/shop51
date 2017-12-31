import mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ruc : String,
    enterprise : String,
    address : String,
    created : Date,
    isActive : { type: Number, default: 1 }
})

const Provider = mongoose.model("Provider", schema);

export default Provider;