import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const articleSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);
export default Article;
