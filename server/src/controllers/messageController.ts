import messageModel from "../models/messageModel";
import { Request, Response } from "express";

const getMessages = async (req: Request, res: Response) => {
    try {
    const messages = await messageModel.find();
    return res.status(200).json(
      messages.map((message) => ({
        message: message.message,
        username: message.username,
        time: message.time,
      }))
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
  };
  export default {getMessages}