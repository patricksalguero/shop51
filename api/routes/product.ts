import express = require('express')
import { addProduct ,
    listProducts,
    deleteProduct,
    updateProduct } from '../api/controllers/ProductController';
import { middlewareAuth } from '../api/politcs/AuthPolitic';
import { manejadorErrores } from '../errors/HandleError';


const router = express.Router();

router.get("/", middlewareAuth,manejadorErrores.cacheo(listProducts));
router.post("/add", middlewareAuth,manejadorErrores.cacheo(addProduct));
router.put("/update",middlewareAuth, manejadorErrores.cacheo(updateProduct));
router.delete("/delete", middlewareAuth, manejadorErrores.cacheo(deleteProduct));

export { router }