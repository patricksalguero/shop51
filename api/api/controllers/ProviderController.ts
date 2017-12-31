import { Request , Response , NextFunction } from 'express';
import Provider from '../models/ProviderModel';
import moment = require('moment');

const listProviders = async (request : Request ,response : Response , next : NextFunction) => {
   try{
        const providers = await Provider.find({})
        
        return response.status(200).send( providers );
    
   }catch( errFind ){
        return response.status(500).send({message: 'No se ha podido listar Proveedores.' , err : errFind});
   }
}

const addProvider = async(request : Request ,response : Response , next : NextFunction) => {
    const body = request.body;

    if(null ==   body.ruc || null ==   body.enterprise ||  null ==  body.address ){
        return response.status(400).send({ message: 'Debe completar campos obligatorios'});
    }

    const provider = new Provider();
    provider['ruc'] = body.ruc;
    provider['enterprise'] = body.enterprise;
    provider['address'] = body.address;
    provider['created'] = moment();
    provider['isActive'] = 1;

    try{
        const providerAdd = await provider.save();
        
        if( null != providerAdd ){
            return response.status(200).send( providerAdd );
        }

    }catch( errAdd ){
        return response.status(500).send({message:'No se ha insertado Proveerdor ', err : errAdd})
    }

}

const updateProvider = async(request : Request ,response : Response , next : NextFunction) => {
    const body = request.body;

    if( body.id == null ){
        return response.status(400).send({message:'El id del Proveedor es obligatorio'});
    }

    const idProvider = body.id;

    try{
        const providerFind = await Provider.findById( idProvider );

        if( null  != providerFind ){
            try{
                const providerUpdate = await Provider.findByIdAndUpdate( idProvider , body );
    
                if( providerUpdate != null ){
                    response.status(200).send( providerUpdate );
                }
    
            }catch( errUpdate ){
                response.status(500).send({message: 'No se ha actualizado proveedor' })
            }
        }else{
            return response.status(500).send({message:'Proveedor no existe'});
        }        

    }catch( findProvider ){
        return response.status(404).send({message:'Proveedor no existe'});
    }


}

const deleteProvider = async (request : Request ,response : Response , next : NextFunction) => {
    const body = request.body;

    if( body.id == null ){
        return response.status(400).send({message:'El id del Proveedor es obligatorio'});
    }

    const idProvider = body.id;

    try{
        
        const providerFind = await Provider.find({});

        if( null != providerFind ){
            const providerDelete = await Provider.findByIdAndRemove( idProvider );

            if( null != providerDelete ){
                return response.status(200).send( providerDelete );        
            }else{
                return response.status(500).send({message:'Proveedor no existe'});
            }
        }else{
            return response.status(500).send({message:'Proveedor no existe'});
        }

    }catch( errFind ){
        return response.status(404).send({message:'Proveedor no existe'});
    }

}

export {
    listProviders,
    addProvider,
    updateProvider,
    deleteProvider
}