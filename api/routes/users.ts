import express = require("express")
const router = express.Router()
import { userController as ctrl} from "../api/controllers/UserController"
import {manejadorErrores} from "../errors/HandleError"
import {middlewareAuth} from '../api/politcs/AuthPolitic'

router.get("/", middlewareAuth, manejadorErrores.cacheo(ctrl.listAll));
router.post("/register", manejadorErrores.cacheo(ctrl.register));


export {router}