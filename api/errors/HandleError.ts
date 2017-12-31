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
		next(error)
		/*
			res
				.status(404)
				.type("text/plain")
				.send("No existe la ruta")
		*/
	},

	errorGeneral: (error: RespuestaError, req: Request, res: Response, next: NextFunction) => {
		let resaltado = error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
		resaltado = resaltado.replace(/[a-z_-\d]+.ts:\d+:\d+/gi, '<mark>$&</mark>') 
		res
			.status(error.status)
			.render("error", {
				message: error.message,
				status: error.status,
				stack: resaltado
			})
	}
}

export { manejadorErrores }