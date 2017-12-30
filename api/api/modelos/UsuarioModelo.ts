import mongoose = require("mongoose")

const esquema = new mongoose.Schema({
	correo: String,
	contrasena: String
})

const Usuario = mongoose.model("Usuario", esquema)

export default Usuario