import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, default: 0 },
});