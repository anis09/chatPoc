
import { Request, Response } from "express";
import room from "../models/room";

const getRooms = (req: Request, res: Response) => {
    return room.find()
      .then((rooms) =>
        res.status(200).json(
          rooms.map((room) => ({
            roomId: room.roomId,
            roomName: room.roomName,
            
          }))
        )
      )
      .catch((error) => res.status(500).json({ error }));
  };
  export default {getRooms}