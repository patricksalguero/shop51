import express = require("express")
import { Request, Response, NextFunction } from "express"
import {controlador as ctrl} from "../api/controllers/ServerController"
const router = express.Router()
import {manejadorErrores} from "../errors/HandleError"

router.get("/", manejadorErrores.cacheo(ctrl.listado))
router.get("/formulario", ctrl.formulario)

export {router}