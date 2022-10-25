import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";






interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object; 
}


const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});


function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    if(rooms){
      socket.on(EVENTS.connection,(roomName)=>{
      
        socket.emit(EVENTS.SERVER.ROOMS,rooms)
        
        setRoomName(roomName)
      })
    }
    
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, [rooms]);
  
  socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
  
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    
    setRooms(value);
  });
  

  socket.on(EVENTS.SERVER.JOINED_ROOM, (roomId) => {
    
    setRoomId(roomId);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }
      
      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
