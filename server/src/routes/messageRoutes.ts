import express from "express";
import controller from "../controllers/messageController";


const router = express.Router();


router.get("/list/messages", controller.getMessages);



export = router;