import express from "express";
import controller from "../controllers/roomController";


const router = express.Router();


router.get("/list/rooms", controller.getRooms);



export = router;