import {Request, Response, NextFunction} from "express"
import User from '../models/UserModel'
import { createToken, generateNewToken} from '../services/jwt'
import bcrypt = require('bcrypt-nodejs') 

const userController = {
	register: async (req: Request, res: Response, next: NextFunction) => {
		
		const body = req.body;
		
		if( body.name == null || body.lastname == null || 
			body.password == null || body.email == null ){
			return res.status(400).send({message:'Debe ingresar todos los campos obligatorios'});
		}

		try{
			const user = new User();
			user["email"] = body.email;
			user["password"] = body.password;
			user["name"] = body.name;
			user["lastname"] = body.lastname;
			user["role"] = "USER";
			
			const pass = "";

			await bcrypt.hash( body.password , null , null , (erro , hash) => {
				
			});
			
			//const userSave = await user.save()
			//const id = userSave._id
			//const tokens = createToken(id)
	
			return res
					.status(201)
					.json( pass )

		}catch( err ){

			return res
				.status(500)
				.json({ message: 'Ha sucedido un error al Guardar Usuario . ' , err })

		}
		
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		const correo = req.body.correo
		const contrasena = req.body.contrasena

		const resultado = await User.find({correo, contrasena})
		const id = resultado[0]._id

		const tokens = createToken(id)

		return res
				.status(201)
				.json(tokens)
	},

	generateNewTokenUser: (req: Request, res: Response, next: NextFunction) => {
		const refreshToken = req.body.refreshToken
		const nuevoToken = generateNewToken(refreshToken)

		res
			.status(nuevoToken.status)
			.json(nuevoToken)
	},

	listAll: async (req: Request, res: Response, next: NextFunction) => {
		const usuarios = await User.find({})

		res
			.status(200)
			.json(usuarios)
	}


}

export { userController }
