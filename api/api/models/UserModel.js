"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const esquema = new mongoose.Schema({
    correo: String,
    contrasena: String
});
const Usuario = mongoose.model("Usuario", esquema);
exports.default = Usuario;
//# sourceMappingURL=UserModel.js.map