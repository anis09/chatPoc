import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import { version } from "../package.json";
import mongoose from "mongoose";
import socket from "./socket";
import messageRoutes from "./routes/messageRoutes";
import roomRoutes from "./routes/roomRoutes";


export const mongoDB='mongodb+srv://m001-student:m001-mongodb-basics@cluster0.kp6eshx.mongodb.net/?retryWrites=true&w=majority';
export const port = config.get<number>("port");
export const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

export const app = express();

export const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) =>
  res.send(`Server is up and running version ${version}`)
);

httpServer.listen(port, host, () => {
  
  console.log(`Server is listening on http://${host}:${port}`);

  socket({ io });
});

mongoose.connect(mongoDB,{
  
    
}).then(()=>{
    console.log("connected to mongo")
}).catch(err=>console.log(err));
app.use("/", messageRoutes);
app.use("/", roomRoutes);
