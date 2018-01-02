import { decodeToken } from '../services/jwt'
import { Request, Response, NextFunction } from "express"

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
	
	if (req.headers["authorization"]) {
		const headers = req.headers["authorization"].toString()
		const accessToken = headers.split(" ")[1]

		decodeToken(accessToken)
			.then(result => {
				return next()
			})
			.catch(error => {
				res.status(error.status).json(error)
			})

	} else {
		return res.status(500).json({
				status: 500,
				message: "Acceso inválido, debe estar logueado"
			})
	}
}

export { middlewareAuth }