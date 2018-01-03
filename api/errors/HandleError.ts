import {Request, Response, NextFunction} from "express"

interface RespuestaError extends Error {
	status?: number
}

const manejadorErrores = {
	cacheo: (ftn: (rq: Request, rs: Response, nx: NextFunction) => Promise<any>)=>{
		return (req: Request, res: Response, next: NextFunction) => {
			return ftn(req, res, next).catch(next)
		}

	},

	noEncontrado: (req: Request, res: Response, next: NextFunction) => {
		const error: RespuestaError = new Error("No existe la ruta")
		error.status = 404
		res.status(error.status)
			.send({
				message: error.message,
				status: error.status,
				stack: error
			})
	},

	errorGeneral: (error: RespuestaError, req: Request, res: Response, next: NextFunction) => {
		// let resaltado = error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
		// resaltado = resaltado.replace(/[a-z_-\d]+.ts:\d+:\d+/gi, '<mark>$&</mark>') 
		res.status(error.status)
			.send({
				message: error.message,
				status: error.status,
				stack: error
			})
	}
}

export { manejadorErrores }