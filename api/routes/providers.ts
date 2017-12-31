import express  = require('express');
import { addProvider , updateProvider,deleteProvider,listProviders } from '../api/controllers/ProviderController';
import { manejadorErrores } from '../errors/HandleError';

const router = express.Router();

router.get("/", manejadorErrores.cacheo(listProviders));
router.post("/add", manejadorErrores.cacheo(addProvider) );
router.put("/update", manejadorErrores.cacheo(updateProvider));
router.delete("/delete", manejadorErrores.cacheo(deleteProvider));

export { router }


