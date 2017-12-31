import jwt = require("jwt-simple")
import moment = require("moment")
import randToken = require("rand-token")
import { miClave } from '../../configuration/key'

const refreshTokens = {}
const tiempoVidaToken = 10

const crearToken = (id) => {
	const payload = {
		id: id,
		iat: moment().unix(),
		exp: moment().add(tiempoVidaToken, "seconds").unix()
	}

	const accessToken = jwt.encode(payload, miClave)
	const refreshToken = randToken.uid(256)

	refreshTokens[refreshToken] = id

	return {accessToken, refreshToken}
}

const decodificarToken = (token) => {
	const promesa = new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, miClave)
			resolve(payload.id)
		} catch (error) {
			if(error.message.toLowerCase()=== "token expired") {
				reject({
					status: 401,
					message: "El token ha expirado"
				})
			} else {
				reject({
					status: 500,
					message: "El token es inválido"
				})
			}
		}
	})

	return promesa
}


const generarTokenNuevo = (refreshToken) => {
	if(refreshTokens[refreshToken]) {
		const payload = {
			id: refreshTokens[refreshToken],
			iat: moment().unix(),
			exp: moment().add(tiempoVidaToken, "seconds").unix()
		}
	
		const accessToken = jwt.encode(payload, miClave)
		
		return {status: 201, accessToken}
	}

	return {status: 500, message: "El token de refresco es inválido"}
}



export { crearToken, decodificarToken, generarTokenNuevo }