import {Request, Response, NextFunction} from "express"
import Usuario from '../modelos/UsuarioModelo'
import {crearToken, generarTokenNuevo} from '../servicios/servicioToken'

const controlador = {
	registro: async (req: Request, res: Response, next: NextFunction) => {
		const correo = req.body.correo
		const contrasena = req.body.contrasena

		const usuario = new Usuario()
		usuario["correo"] = correo
		usuario["contrasena"] = contrasena

		const resultado = await usuario.save()
		const id = resultado._id

		const tokens = crearToken(id)

		return res
				.status(201)
				.json(tokens)
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		const correo = req.body.correo
		const contrasena = req.body.contrasena

		const resultado = await Usuario.find({correo, contrasena})
		const id = resultado[0]._id

		const tokens = crearToken(id)

		return res
				.status(201)
				.json(tokens)
	},

	generarNuevoToken: (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.body.refreshToken
		const nuevoToken = generarTokenNuevo(refreshToken)

		res
			.status(nuevoToken.status)
			.json(nuevoToken)
	},

	listado: async (req: Request, res: Response, next: NextFunction) => {
		const usuarios = await Usuario.find({})

		res
			.status(200)
			.json(usuarios)
	}


}

export {controlador}
