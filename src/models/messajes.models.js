import { Schema, model } from "mongoose";

const collection = "messages";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }  // Añadido para tener un timestamp
});

export const messageModel = model(collection, messageSchema);