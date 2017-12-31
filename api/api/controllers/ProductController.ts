import { Request , Response , NextFunction } from 'express';
import Product from '../models/ProductModel';
import moment = require('moment');

const listProducts = async ( request : Request , response : Response , next : NextFunction ) => {

    try{

        const products = await Product.find({});

        response.status(200).send( products );

    }catch( findErr ){
        return response.status(500).send({ message: 'No se ha listado Productos', err: findErr })
    }

}


const addProduct = async ( request : Request , response : Response , next : NextFunction ) => {
    
}


const updateProduct = async ( request : Request , response : Response , next : NextFunction ) => {
    
}


const deleteProduct = async ( request : Request , response : Response , next : NextFunction ) => {
    
}

export {
    listProducts,
    addProduct,
    updateProduct,
    deleteProduct
}