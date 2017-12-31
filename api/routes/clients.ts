import express = require('express');
import { manejadorErrores } from '../errors/HandleError';
import { addClient , 
        updateClient, 
        listClients , 
        deleteClient } from '../api/controllers/ClientController';
import { politica } from '../api/politcs/AuthPolitic';

const router = express.Router();

router.get("/", politica ,manejadorErrores.cacheo( listClients  ));
router.post("/add", politica , manejadorErrores.cacheo( addClient ));
router.put("/update", politica , manejadorErrores.cacheo( updateClient ));
router.delete("/delete" , politica , manejadorErrores.cacheo( deleteClient ));

export { router }