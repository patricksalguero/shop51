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
const UserModel_1 = require("../models/UserModel");
const jwt_1 = require("../services/jwt");
const controlador = {
    registro: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const usuario = new UserModel_1.default();
        usuario["correo"] = correo;
        usuario["contrasena"] = contrasena;
        const resultado = yield usuario.save();
        const id = resultado._id;
        const tokens = jwt_1.crearToken(id);
        return res
            .status(201)
            .json(tokens);
    }),
    login: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;
        const resultado = yield UserModel_1.default.find({ correo, contrasena });
        const id = resultado[0]._id;
        const tokens = jwt_1.crearToken(id);
        return res
            .status(201)
            .json(tokens);
    }),
    generarNuevoToken: (req, res, next) => {
        const refreshToken = req.body.refreshToken;
        const nuevoToken = jwt_1.generarTokenNuevo(refreshToken);
        res
            .status(nuevoToken.status)
            .json(nuevoToken);
    },
    listado: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const usuarios = yield UserModel_1.default.find({});
        res
            .status(200)
            .json(usuarios);
    })
};
exports.controlador = controlador;
//# sourceMappingURL=UserController.js.map