"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const moment = require("moment");
const randToken = require("rand-token");
const key_1 = require("../../configuration/key");
const refreshTokens = {};
const tiempoVidaToken = 10;
const crearToken = (id) => {
    const payload = {
        id: id,
        iat: moment().unix(),
        exp: moment().add(tiempoVidaToken, "seconds").unix()
    };
    const accessToken = jwt.encode(payload, key_1.miClave);
    const refreshToken = randToken.uid(256);
    refreshTokens[refreshToken] = id;
    return { accessToken, refreshToken };
};
exports.crearToken = crearToken;
const decodificarToken = (token) => {
    const promesa = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, key_1.miClave);
            resolve(payload.id);
        }
        catch (error) {
            if (error.message.toLowerCase() === "token expired") {
                reject({
                    status: 401,
                    message: "El token ha expirado"
                });
            }
            else {
                reject({
                    status: 500,
                    message: "El token es inválido"
                });
            }
        }
    });
    return promesa;
};
exports.decodificarToken = decodificarToken;
const generarTokenNuevo = (refreshToken) => {
    if (refreshTokens[refreshToken]) {
        const payload = {
            id: refreshTokens[refreshToken],
            iat: moment().unix(),
            exp: moment().add(tiempoVidaToken, "seconds").unix()
        };
        const accessToken = jwt.encode(payload, key_1.miClave);
        return { status: 201, accessToken };
    }
    return { status: 500, message: "El token de refresco es inválido" };
};
exports.generarTokenNuevo = generarTokenNuevo;
//# sourceMappingURL=jwt.js.map