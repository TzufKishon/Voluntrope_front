import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  const { category, type } = req.query;
  const query = {};

  if (category) query.category = category;
  if (type) {
    query['types.name'] = type; // Adjust to match your schema structure
  }

  try {
    const products = await Product.find(query).populate('category').exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
