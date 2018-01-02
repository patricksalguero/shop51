import {Request, Response, NextFunction} from "express"
import User from '../models/UserModel'
import { createToken, generateNewToken} from '../services/jwt'
import bcrypt = require('bcrypt-nodejs') 

// const compare = bcrypt.compareSync( body.password , pass );
const userController = {
	register: async (req: Request, res: Response, next: NextFunction) => {
		
		const body = req.body;
		
		if( body.name == null || body.lastname == null || 
			body.password == null || body.email == null ){
			return res.status(400).send({message:'Debe ingresar todos los campos obligatorios'});
		}

		//Proceso de validacion de existencia del correo ( por ahora solo correo )
		try{
			const userFind = await User.find( { email : body.email });
			
			console.log( userFind );
			
			if( userFind != null && userFind.length > 0  ){
				return res.status(400).send( { message: 'El correo ' + body.email + " ya existe." } );	
			}

		}catch( findErr ){
			return res.status(404).send({message:'Error al Busca Usuario.', err : findErr });
		}


		//Proceso de Registro
		try{
			const user = new User();
			user["email"] = body.email;
			user["name"] = body.name;
			user["lastname"] = body.lastname;
			user["role"] = "USER";
			
			const passcrypt = bcrypt.hashSync(body.password, null , null );
			user["password"] = passcrypt;
			
			const userSave = await user.save()
			//Eliminar elementos para la salida de la información
			userSave['password'] = undefined;
			userSave['isActive'] = undefined;
			userSave['role'] = undefined;
			userSave['created'] = undefined;

			const id = userSave._id
			const tokens = createToken(id)

			return res
					.status(201)
					.json( { user : userSave , tokens  }  )

		}catch( err ){

			return res
				.status(500)
				.json({ message: 'Ha sucedido un error al Guardar Usuario . ' , err })

		}
		
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		const email  = req.body.email
		const password = req.body.password

		const resultado = await User.find({ email , password })
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
