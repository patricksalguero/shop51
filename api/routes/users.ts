import express = require("express")
const router = express.Router()
import { userController as ctrl} from "../api/controllers/UserController"
import {manejadorErrores} from "../errors/HandleError"
import {middlewareAuth} from '../api/politcs/AuthPolitic'

router.get("/", middlewareAuth, manejadorErrores.cacheo(ctrl.listAll));
router.post("/register", manejadorErrores.cacheo(ctrl.register));
router.post("/login", manejadorErrores.cacheo(ctrl.login));
router.post("/newtoken", ctrl.generateNewTokenUser);


export {router}