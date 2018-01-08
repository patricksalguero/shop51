import { Request , Response , NextFunction } from 'express';
import Client from '../models/ClientModel';

const listClients = async  ( request : Request , response : Response , next : NextFunction) => {
    const clients  = await Client.find({});
    return response.status(200).json(clients);
}

const addClient = async ( request : Request , response : Response , next : NextFunction ) => {
    const body = request.body;
    
    if( body.name == null ||  body.lastname == null || 
        body.email == null || body.address == null ){
        return response.status(500).json({ message: 'Debe rellenar los campos obligatorios' })
    }
    const client = new Client();
    client['name'] = body.name;
    client['lastname'] = body.lastname;
    client['email'] = body.email;
    client['address'] = body.address;
    client['sex'] = body.sex;
    client['isActive'] = 1;
    client['birthdate'] = body.birthdate;

    const result = await client.save();

    if( null != result  ){
        return response.status(200).send(result);
    }

    return response.status(500).send({ message: 'No se ha realizado la inserción'});

}

const updateClient = async ( request : Request , response : Response , next : NextFunction ) => {
    const body = request.body;
        
    if( body._id == null ){
        return response.status(500).send({ message : 'El id del Cliente es obligatorio'});
    }

    const idClient = body._id;


    try{
        const clientFind = await Client.findById( idClient );
        
        try{
            const clientUpdate = await Client.findByIdAndUpdate( idClient, body );
            
            if( clientUpdate != null )
                return response.status(200).send( clientUpdate );

        }catch( err ){
            return response.status(404).send({message:'No se ha actualizado Cliente: ' + idClient  , error : err });    
        }

    }catch( errFind ){
        return response.status(404).send({message:'Cliente no encontrado!' , error : errFind });
    }
    
}

const deleteClient = async ( request : Request , response : Response , next : NextFunction ) => {
    const body = request.body;

    if( body.id == null ){
        return response.status(500).send({ message: 'El id del Cliente es obligatorio!.'});
    }

    const idClient = body.id;

    try{
        const clientfind = await Client.findById(idClient);

        if( clientfind == null ){
            return response.status(404).send({message:'El cliente no existe'});
        }

        try{
            
            const clientDeleted = await Client.findByIdAndRemove( idClient );

            if( clientDeleted != null ){
                return response.status(200).send({message:'Eliminado correctamente', client: clientDeleted });
            }else{
                return response.status(404).send({message:'El cliente no existe'});
            }


        }catch( deleteErr ){
            return response.status(500).send({ message: 'No se ha eliminado cliente: ' + idClient })
        }

    }catch( findErr ){
        return response.status(404).send({message:'El cliente no existe'});
    }
}

const getClientById = async ( request : Request , response : Response , next : NextFunction ) => {
    const clientId = request.params.id
    Client.findById( clientId ,(err, clientR ) => {
        if( err || !clientId ) return response.status(404).send({message: 'Cliente no encontrado' })
        return response.status(200).send({message:'Se ha encontrado cliente.', client: clientR})
    })
}


export {
    getClientById,
    listClients,
    addClient ,
    updateClient ,
    deleteClient
}