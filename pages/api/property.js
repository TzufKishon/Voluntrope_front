import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    try {
      const types = await Category.distinct("type");

      res.status(200).json(types);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
