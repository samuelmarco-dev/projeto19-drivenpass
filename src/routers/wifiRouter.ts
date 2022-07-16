import { Router } from "express";

import { createWifiUser, deleteWifiById, getWifiById, getWifis } from "../controllers/wifiController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaWifi from "../schemas/schemaWifi.js";

const wifiRouter = Router();

wifiRouter.post('/wifi', validationSchema(schemaWifi), validationTokenUser, createWifiUser);
wifiRouter.get('/wifis', validationTokenUser, getWifis);
wifiRouter.get('/wifi/:id', validationTokenUser, getWifiById);
wifiRouter.delete('/wifi/:id', validationTokenUser, deleteWifiById);

export default wifiRouter;
