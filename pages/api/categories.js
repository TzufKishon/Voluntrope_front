// pages/api/categories.js
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    const categories = await Category.find();
    res.status(200).json(categories);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
