import express = require("express")
const router = express.Router()
import {controlador as ctrl} from '../api/controllers/ServerController'
import {manejadorErrores} from '../errors/HandleError'

router.post("/", manejadorErrores.cacheo(ctrl.insertar))

export {router}