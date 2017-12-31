import express = require('express')
import { addProduct ,
    listProducts,
    deleteProduct,
    updateProduct } from '../api/controllers/ProductController';
import { politica } from '../api/politcs/AuthPolitic';
import { manejadorErrores } from '../errors/HandleError';


const router = express.Router();

router.get("/", manejadorErrores.cacheo(listProducts));
router.post("/add", manejadorErrores.cacheo(addProduct));
router.put("/put", manejadorErrores.cacheo(updateProduct));
router.delete("/delete", manejadorErrores.cacheo(deleteProduct));

export { router }