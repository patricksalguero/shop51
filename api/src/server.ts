// Declaraciones e importaciones
import express = require("express");
import {Application, Request, Response, NextFunction } from "express";

import {router as rutasPorDefecto} from '../routes/index';
import {router as rutasServidores} from '../routes/servers';

import { router  as routesClients } from "../routes/clients";
import { router as routesProviders } from '../routes/providers';
import { router as routesProducts } from '../routes/product';
import { router as routesUser} from '../routes/users';


import {conexionMongo} from "../configuration/connection";
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import favicon = require("serve-favicon");
import {manejadorErrores} from "../errors/HandleError";
import cors = require("cors");
import moment = require('moment');


require("dotenv").config({path: "./variables.env"});


// Configuraciones
const app: Application = express();
app.set("port", process.env.PORT || 4000);
app.set("view engine", "pug");
app.set("views", "./views");

mongoose.Promise = global.Promise
mongoose.connect(conexionMongo, {
	useMongoClient: true
}, error => {
	if(!error) console.log("MongoDB : Conectado")
})

// Middlewares
app.use(favicon("./public/img/favicon.ico"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(cors({origin: "*"}))

// Rutas
app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.titulo = "Shop51 - Patrick S."
	next()
})

app.use("/", rutasPorDefecto);
app.use("/servidores", rutasServidores);


app.use("/clients" , routesClients );
app.use("/providers", routesProviders);
app.use("/products", routesProducts);
app.use("/users", routesUser);


app.use(manejadorErrores.noEncontrado);
app.use(manejadorErrores.errorGeneral);

// Servidor
app.listen( app.get("port"), ()=> {
	console.log("Current Date: " + moment().format("h:m:s d-M-YYYY"));
	console.log(`PORT LISTEN:  ${app.get("port")}`);
})
