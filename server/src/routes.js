import Router from "express";
import {
  selectClients,
  selectClient,
  insertClient,
  createRoute,
  updateClient,
  deleteClient,
} from "./Controller/Client.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "Api Rodando",
  });
});

router.get("/clients", selectClients);
router.get("/client/:id", selectClient);
router.post("/client", insertClient);
router.post("/routeRequest", createRoute);
router.put("/client", updateClient);
router.delete("/client/:id", deleteClient);

export default router;
