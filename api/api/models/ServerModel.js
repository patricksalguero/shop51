"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const esquema = new mongoose.Schema({
    nombre: String,
    descripcion: String
});
const Servidor = mongoose.model("Servidor", esquema);
exports.default = Servidor;
//# sourceMappingURL=ServerModel.js.map