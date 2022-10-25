import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
  message: string;
  username: string;
  time:Date;
  
}
export interface ImessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
  message: { type: String, required: true },
  username: { type: String},
  time:{type:Date,required:true,default:new Date()}
  
});

export default mongoose.model<ImessageModel>("Messages", MessageSchema);