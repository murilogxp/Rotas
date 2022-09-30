import Router from "express";
import { selectClients, selectClient, insertClient, updateClient, deleteClient } from './Controller/Cliente.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
});

router.get('/clients', selectClients);
router.get('/client/:id', selectClient);
router.post('/client', insertClient);
router.put('/client', updateClient);
router.delete('/client/:id', deleteClient);

export default router;