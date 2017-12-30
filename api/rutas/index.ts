import express = require("express")
import { Request, Response, NextFunction } from "express"
import {controlador as ctrl} from "../api/controladores/ServidoresControlador"
const router = express.Router()
import {manejadorErrores} from "../errores/manejadoresErrores"

router.get("/", manejadorErrores.cacheo(ctrl.listado))
router.get("/formulario", ctrl.formulario)

export {router}