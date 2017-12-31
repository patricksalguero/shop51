import { Request , Response , NextFunction } from 'express';
import product = require("./../../routes/product")
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
    const body = request.body;

    if( body.name == null || body.description == null || 
        body.price == null || body.weight == null || body.measure == null ){
        return response.status(400).send({message: 'Debe ingresar los campos obligatorios.'});
    }

    try{
        const product = new Product();
        
        if( body.image == null ){
            product['image'] = "http://www.clubmegamusculo.com/wp-content/uploads/2010/10/syntha-6_5lb-237x300.jpg";            
        }

        product['name'] = body.name;
        product['subname'] = body.subname;
        product['description'] = body.description;
        product['measure'] = body.measure;
        product['price'] = parseFloat(body.price).toFixed(2);
        product['weight'] = parseFloat(body.weight).toFixed(2);
        product['created'] = moment();
        product['image'] = body.image;

        const productSave  = await product.save();

        if ( productSave != null ){
            return response.status(200).send(productSave);
        }


    }catch( errSave ){
        return response.status(500).send({ message:'No se ha insertado Producto'});
    }
}


const updateProduct = async ( request : Request , response : Response , next : NextFunction ) => {
    const body = request.body;

    if( null == body.id ){
        return response.status(200).send({ message:'El id del Producto es obligatorio'});
    }

    const idProduct = body.id;

    try{

        const findProduct = await Product.findById( idProduct );

        if ( null != findProduct ){
            
            try{
                const productFind = await Product.findByIdAndUpdate( idProduct, body );

                if( productFind  != null ){
                    response.status(200).send( productFind );
                }

            }catch( updateErr ){
                return response.status(500).send({ message: 'Producto no actualizado.' })
            }

        }else{
            return response.status(404).send({ message: 'No existe producto' });    
        }

    }catch( findErr ){
        return response.status(404).send({ message: 'No existe producto.' });
    }

}


const deleteProduct = async ( request : Request , response : Response , next : NextFunction ) => {
    const body = request.body;

    
    if( null == body.id ){
        return response.status(200).send({ message:'El id del Producto es obligatorio'});
    }

    const idProduct = body.id;

    try{
        const productoFind = await Product.findById( idProduct );

        if( null != productoFind ){
            try{
                const productDelete = await Product.findByIdAndRemove( idProduct );

                if( null != productDelete ){
                    return response.status(200).send( productDelete  );
                }

            }catch( err ){
                return response.status(500).send({ message: 'Producto no eliminado.'});
            }
        }else{
            return response.status(404).send({ message: 'No existe producto' });    
        }

    }catch( findErr ){
        return response.status(404).send({ message: 'No existe producto' });
    }

}

export {
    listProducts,
    addProduct,
    updateProduct,
    deleteProduct
}