import checkOutModelSchema from "../models/addCheckOutSchema.js";
// create checkout details
export const createNewCheckOut = async (req, res) => {
  const products = req.body;
  const newProducts = new checkOutModelSchema(products);

  try {
    await newProducts.save();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//get all ordered product details
export const getAllCheckOutProducts = async () => {
  const products = await checkOutModelSchema.find();
  return products;
};

//update status of ordered product dada
export const updateCheckOutProducts = async (req, res) => {
  const status = req.body;
  const products = await checkOutModelSchema.findByIdAndUpdate(
    status.productId,
    { status: status.status }
  );

  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
