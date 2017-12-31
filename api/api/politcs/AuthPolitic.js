"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../services/jwt");
const politica = (req, res, next) => {
    if (req.headers["authorization"]) {
        const cabecera = req.headers["authorization"].toString();
        const accessToken = cabecera.split(" ")[1];
        jwt_1.decodificarToken(accessToken)
            .then(respuesta => {
            return next();
        })
            .catch(error => {
            res
                .status(error.status)
                .json(error);
        });
    }
    else {
        return res
            .status(500)
            .json({
            status: 500,
            message: "No está logueado"
        });
    }
};
exports.politica = politica;
//# sourceMappingURL=AuthPolitic.js.map