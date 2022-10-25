import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import messageModel from "./models/messageModel";
import room from "./models/room";




const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  console.log(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    console.log(`User connected ${socket.id}`);
    room.find().then(result=>{
      socket.emit(EVENTS.SERVER.ROOMS,result);
    })

   

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      const rm =new room({roomName})
      rm.save().then(()=>{
        console.log('room saved')
      })
      console.log({ roomName });
     
      const roomId = nanoid();     
      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);
     
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      socket.emit(EVENTS.SERVER.ROOMS, rooms);
     
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });


    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const date = new Date();
       const msg=new messageModel({username,message})
       msg.save().then(()=>{
        console.log('message saved')
        socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          message,
          username,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
       })
        
      }
    );

    
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
}

export default socket;