import express = require("express")
const router = express.Router()
import {controlador as ctrl} from "../api/controladores/UsuariosControlador"
import {manejadorErrores} from "../errores/manejadoresErrores"
import {politica} from '../api/politicas/autenticacionPolitica'

router.get("/", politica, manejadorErrores.cacheo(ctrl.listado))
router.post("/registro", manejadorErrores.cacheo(ctrl.registro))
router.post("/login", manejadorErrores.cacheo(ctrl.login))
router.post("/nuevo-token", ctrl.generarNuevoToken)

export {router}