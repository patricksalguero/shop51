import mongoose = require('mongoose')

const schema = new mongoose.Schema({
   name: String,
   lastname : String,
   email : String,
   address : String,
   sex : String,
   isActive : Number,
   birthdate : Date
})

const Client = mongoose.model("Client" , schema )

export default Client