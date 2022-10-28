import Router from "express";
import { selectClients, selectClient, insertClient, insertRoute, updateClient, deleteClient } from './Controller/Cliente.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
});

router.get('/clients', selectClients);
router.get('/client/:id', selectClient);
router.post('/client', insertClient);
router.post('/routeRequest', insertRoute);
router.put('/client', updateClient);
router.delete('/client/:id', deleteClient);

export default router;