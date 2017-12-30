import { decodificarToken } from '../servicios/servicioToken'
import { Request, Response, NextFunction } from "express"

const politica = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers["authorization"]) {
		const cabecera = req.headers["authorization"].toString()
		const accessToken = cabecera.split(" ")[1]

		decodificarToken(accessToken)
			.then(respuesta => {
				return next()
			})
			.catch(error => {
				res
					.status(error.status)
					.json(error)
			})

	} else {
		return res
			.status(500)
			.json({
				status: 500,
				message: "No está logueado"
			})
	}
}

export {politica}