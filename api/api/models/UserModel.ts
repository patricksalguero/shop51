import mongoose = require("mongoose")
import moment  = require('moment')


const esquema = new mongoose.Schema({
	email: String,
	name : String,
	lastname: String,
	password: String,
	role : String,
	isActive : { type: String , default: 1 },
	created : { type: Date , default: moment() }
})

const User = mongoose.model("User", esquema)

export default User