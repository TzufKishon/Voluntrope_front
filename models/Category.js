// models/Category.js
import mongoose, { model, models, Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  types: [{
    name: { type: String, required: true },
    values: [String],
  }],
});

export const Category = models?.Category || model('Category', categorySchema);