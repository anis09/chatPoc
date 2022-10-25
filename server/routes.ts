// import express from "express";
// import http from "http";
// import messageRoutes from "../server/src/routes/messageRoutes"
// import {app} from "./src/app"
// import { httpServer,port,host } from "./src/app";

// export const StartServer = () => {
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());

//   //Routes
//   app.use("/", messageRoutes);

//   app.use((req, res, next) => {
//     const error = new Error("route not found");
//     console.error(error);
//     return res.status(404).json({ message: error.message });
//   });

//   http
//     .createServer(app)
//     .listen(port, () =>
//       console.log(`Server is running on port ${port}.`)
//     );
// };
