import { Router } from "express";

import { createWifiUser, deleteWifiById, getWifiById, getWifis } from "../controllers/wifiController.js";
import validationTokenUser from "../middlewares/authMiddleware.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaWifi from "../schemas/schemaWifi.js";

const wifiRouter = Router();

wifiRouter.post('/wifi', validationSchema(schemaWifi), validationTokenUser, createWifiUser);
wifiRouter.get('/wifi', validationTokenUser, getWifis);
wifiRouter.get('/wifi', validationTokenUser, getWifiById);
wifiRouter.delete('/wifi', validationTokenUser, deleteWifiById);

export default wifiRouter;
