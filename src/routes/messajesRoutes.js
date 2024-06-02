import express from "express";
import messajesManager from "../messajesManager.js";

const router = express.Router();

router.post("/", messajesManager.postMessage.bind(messajesManager)); // Usar bind
router.get("/", messajesManager.getAllMessages.bind(messajesManager)); // Usar bind
router.get("/:userId", messajesManager.getUserMessages.bind(messajesManager)); // Usar bind

export default router;