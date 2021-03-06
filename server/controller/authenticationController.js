import adminModelSchema from "../models/addAdminDataSchema.js";
import clientModelSchema from "../models/addClientDataSchema.js";

//Admin routes
export const createNewAdmin = async (req, res) => {
  const admindata = req.body;
  const newAdmin = new adminModelSchema(admindata);

  try {
    await newAdmin.save();
    res.status(200).json(admindata);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllAdminDetails = async (req, res) => {
  try {
    const adminData = await adminModelSchema.find();
    res.status(200).json(adminData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Client Routs
export const createNewClient = async (req, res, newData) => {
  const clientData = req.body;
  const newClient = new clientModelSchema(clientData);

  try {
    await newClient.save();
    res.status(200).json(clientData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  // if (newData) {
  //   const newClient = new clientModelSchema(newData);
  //   return await newClient.save();
  // }

  // if (req.body) {
  //   const clientdata = req.body;
  //   const newClient = new clientModelSchema(clientdata);
  //   return await newClient.save();
  // }
};

export const getAllClientDetails = async (req, res) => {
  // const clientData = await clientModelSchema.find();
  // return clientData;

  try {
    const clientData = await clientModelSchema.find();
    res.status(200).json(clientData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
