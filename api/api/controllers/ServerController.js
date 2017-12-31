"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerModel_1 = require("../models/ServerModel");
/*const servidores = [
    {_id: "1", nombre: "Web", descripcion: "Servidor del Proyecto de Gas Natural"},
    {_id: "2", nombre: "BD", descripcion: "Servidor de Backup"},
    {_id: "3", nombre: "Seguridad", descripcion: "Servidor usado como proxy"}
]*/
const controlador = {
    listado: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const servidores = yield ServerModel_1.default.find({});
        res.render("home", {
            servidores: servidores
        });
    }),
    formulario: (req, res, next) => {
        res.render("formulario");
    },
    insertar: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const servidor = new ServerModel_1.default();
        servidor["nombre"] = req.body.nombre;
        servidor["descripcion"] = req.body.descripcion;
        yield servidor.save();
        res.redirect("/");
    })
};
exports.controlador = controlador;
//# sourceMappingURL=ServerController.js.map