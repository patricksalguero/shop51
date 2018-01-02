import express  = require('express');
import { addProvider , updateProvider,deleteProvider,listProviders } from '../api/controllers/ProviderController';
import { manejadorErrores } from '../errors/HandleError';
import { middlewareAuth } from '../api/politcs/AuthPolitic';

const router = express.Router();

router.get("/", middlewareAuth, manejadorErrores.cacheo(listProviders));
router.post("/add", middlewareAuth , manejadorErrores.cacheo(addProvider) );
router.put("/update", middlewareAuth ,manejadorErrores.cacheo(updateProvider));
router.delete("/delete",middlewareAuth, manejadorErrores.cacheo(deleteProvider));

export { router }


