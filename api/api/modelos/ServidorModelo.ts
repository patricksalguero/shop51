import mongoose = require("mongoose")

const esquema = new mongoose.Schema({
	nombre: String,
	descripcion: String
})

const Servidor = mongoose.model("Servidor", esquema)

export default Servidor