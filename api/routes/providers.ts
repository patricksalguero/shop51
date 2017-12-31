import express  = require('express');
import { addProvider , updateProvider,deleteProvider,listProviders } from '../api/controllers/ProviderController';
import { manejadorErrores } from '../errors/HandleError';
import { politica } from '../api/politcs/AuthPolitic';

const router = express.Router();

router.get("/", politica, manejadorErrores.cacheo(listProviders));
router.post("/add", politica , manejadorErrores.cacheo(addProvider) );
router.put("/update", politica ,manejadorErrores.cacheo(updateProvider));
router.delete("/delete",politica, manejadorErrores.cacheo(deleteProvider));

export { router }


