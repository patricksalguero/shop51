// Declaraciones e importaciones
import express = require("express")
import {Application, Request, Response, NextFunction } from "express"
import {router as rutasPorDefecto} from '../rutas/index'
import {router as rutasServidores} from '../rutas/servidores'
import {router as rutasUsuarios} from '../rutas/usuarios'
import {conexionMongo} from "../configuraciones/conexiones"
import mongoose = require("mongoose")
import bodyParser = require("body-parser")
import morgan = require("morgan")
import favicon = require("serve-favicon")
import {manejadorErrores} from "../errores/manejadoresErrores"
import cors = require("cors")

require("dotenv").config({path: "./variables.env"})


// Configuraciones
const app: Application = express()
app.set("puerto", process.env.PORT || 4000)
app.set("view engine", "pug")
app.set("views", "./vistas")

mongoose.Promise = global.Promise
mongoose.connect(conexionMongo, {
	useMongoClient: true
}, error => {
	if(error) {
		console.log(error)
	} else {
		console.log("conectado a Mongo")
	}
})

// Middlewares
app.use(favicon("./publico/img/favicon.ico"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(express.static("publico"))
app.use(cors({origin: "*"}))

// Rutas
app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.titulo = "Inventario de Servidores"
	next()
})
app.use("/", rutasPorDefecto)
app.use("/servidores", rutasServidores)
app.use("/usuarios", rutasUsuarios)

app.use(manejadorErrores.noEncontrado)
app.use(manejadorErrores.errorGeneral)

// Servidor
app.listen(app.get("puerto"), ()=> {
	console.log(`Ejecutando en el puerto ${app.get("puerto")}`)
})
