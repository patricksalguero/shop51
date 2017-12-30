import express = require("express")
const router = express.Router()
import {controlador as ctrl} from '../api/controladores/ServidoresControlador'
import {manejadorErrores} from '../errores/manejadoresErrores'

router.post("/", manejadorErrores.cacheo(ctrl.insertar))

export {router}