import express  = require('express');
import { addProvider , updateProvider,deleteProvider,listProviders } from '../api/controllers/ProviderController';
import { manejadorErrores } from '../errors/HandleError';

const router = express.Router();

router.get("/", listProviders);
router.post("/add", addProvider );
router.put("/update", updateProvider);
router.delete("/delete", deleteProvider);

export { router }


