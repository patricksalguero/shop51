import express = require('express');
import { manejadorErrores } from '../errors/HandleError';
import { addClient , 
        updateClient, 
        listClients , 
        deleteClient } from '../api/controllers/ClientController';
import { middlewareAuth } from '../api/politcs/AuthPolitic';

const router = express.Router();

router.get("/", middlewareAuth ,manejadorErrores.cacheo( listClients  ));
router.post("/add", middlewareAuth , manejadorErrores.cacheo( addClient ));
router.put("/update", middlewareAuth , manejadorErrores.cacheo( updateClient ));
router.delete("/delete" , middlewareAuth , manejadorErrores.cacheo( deleteClient ));

export { router }