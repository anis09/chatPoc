import mongoose, { Document, Schema } from "mongoose";

export interface IRoom {
  roomId:String,
  roomName:String
  
}
export interface IroomModel extends IRoom, Document {}

const RoomSchema: Schema = new Schema({
  roomId:{type:String, default:new mongoose.Types.ObjectId},
  roomName:{type:String}
  
});

export default mongoose.model<IroomModel>("rooms", RoomSchema);