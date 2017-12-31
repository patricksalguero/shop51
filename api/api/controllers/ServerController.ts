import {Request, Response, NextFunction} from "express"
import Servidor from '../models/ServerModel'

/*const servidores = [
	{_id: "1", nombre: "Web", descripcion: "Servidor del Proyecto de Gas Natural"},
	{_id: "2", nombre: "BD", descripcion: "Servidor de Backup"},
	{_id: "3", nombre: "Seguridad", descripcion: "Servidor usado como proxy"}
]*/

const controlador = {
	listado: async (req: Request, res: Response, next: NextFunction) => {
		const servidores = await Servidor.find({})

		res.render("home", {
			servidores: servidores
		})
	},

	formulario: (req: Request, res: Response, next: NextFunction) => {
		res.render("formulario")
	},

	insertar: async (req: Request, res: Response, next: NextFunction) => {
		const servidor = new Servidor()
		servidor["nombre"] = req.body.nombre
		servidor["descripcion"] = req.body.descripcion

		await servidor.save()
		res.redirect("/")
	}
}

export {controlador}