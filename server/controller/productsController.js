import productModelSchema from "../models/addProductSchema.js";

export const getAllProducts = async () => {
  const products = await productModelSchema.find();
  return products;
};

export const getProductById = async (req, res, id) => {
  if (id) {
    const product = await productModelSchema.findById(id);
    return product;
  }

  if (req.params) {
    const product = await productModelSchema.findById(req.params.id);
    return product;
  }
};

export const getProductBySearch = async (req, res) => {
  const products = req.params.search;
  productModelSchema.createIndexes({ prodectName: "text" });

  try {
    const product = await productModelSchema.find({
      prodectName: { $regex: products, $options: "i" },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createNewProducts = async (req, res) => {
  const products = req.body;
  const newProducts = new productModelSchema(products);

  try {
    await newProducts.save();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteProductData = async (req, res, id_product) => {
  if (id_product) {
    return await productModelSchema.findByIdAndDelete(id_product);
  }

  if (req.params) {
    const { id } = req.params;
    return await productModelSchema.findByIdAndDelete(id);
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const productData = req.body;

  try {
    const updatedProduct = await productModelSchema.findByIdAndUpdate(
      _id,
      productData
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
