import axios from "axios";

const productUrl = `${process.env.REACT_APP_LOCALHOST}/${process.env.REACT_APP_PRODUCT}`;
const checkoutUrl = `${process.env.REACT_APP_LOCALHOST}/${process.env.REACT_APP_CHECKOUT}`;
const adminUrl = `${process.env.REACT_APP_LOCALHOST}/${process.env.REACT_APP_ADMIN}`;
const clientUrl = `${process.env.REACT_APP_LOCALHOST}/${process.env.REACT_APP_CLIENT}`;

//product APIs
export const addProduct = (newProduct) => axios.post(productUrl, newProduct);

export const getProducts = () => axios.get(productUrl);

export const getProductDetails = (id) => axios.get(`${productUrl}/${id}`);

export const updateProduct = (id, productData) =>
  axios.patch(`${productUrl}/${id}`, productData);

export const deleteProduct = (id) => axios.delete(`${productUrl}/${id}`);

export const getProductBySearch = (searchBy) =>
  axios.get(`${productUrl}/product/${searchBy}`, searchBy);

//Order items APIs
export const addCheckOutDetails = (checkOutProduct) =>
  axios.post(checkoutUrl, checkOutProduct);

export const getCheckOutDetails = () => axios.get(checkoutUrl);

export const updateCheckOutProducts = (productStatus) =>
  axios.post(`${checkoutUrl}/updateStatus`, productStatus);

//Admin registration and login API calls
export const addNewAdmin = (newAdminData) => axios.post(adminUrl, newAdminData);

export const getAllAdminDetails = () => axios.get(adminUrl);

//Client register and login APIs call
export const addNewClient = (newClientData) =>
  axios.post(clientUrl, newClientData);

export const getAllClientDetails = () => axios.get(clientUrl);
