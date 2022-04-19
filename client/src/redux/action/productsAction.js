import * as actionType from "../constants/productsConstant";
import * as api from "../api";

//product item actions
export const addProduct = (productData) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(productData);
    dispatch({ type: actionType.ADD_PRODUCT_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getProductBySearch = (searchBy) => async (dispatch) => {
  try {
    dispatch({ type: actionType.SEARCH_PRODUCT_REQUEST });

    const { data } = await api.getProductBySearch(searchBy);

    dispatch({ type: actionType.SEARCH_PRODUCT_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: actionType.UPDATE_PRODUCT_REQUEST });
  try {
    const { data } = await api.updateProduct(id, productData);
    dispatch({ type: actionType.UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_PRODUCTS_REQUEST });

    const { data } = await api.getProducts();

    dispatch({ type: actionType.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.GET_PRODUCTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await api.getProductDetails(id);
    dispatch({ type: actionType.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: actionType.REMOVE_PRODUCT_REQUEST, payload: id });
  } catch (err) {
    dispatch({
      type: actionType.REMOVE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//checkout product details actions
export const addCheckOutDetails = (checkOutProduct) => async (dispatch) => {
  try {
    const { data } = await api.addCheckOutDetails(checkOutProduct);
    dispatch({ type: actionType.ADD_CHECKOUT_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getCheckOutDetails = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_CHECKOUT_REQUEST });

    const { data } = await api.getCheckOutDetails();

    dispatch({ type: actionType.GET_CHECKOUT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.GET_CHECKOUT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateCheckOutProducts = (productStatus) => async (dispatch) => {
  try {
    const { data } = await api.updateCheckOutProducts(productStatus);
    dispatch({ type: actionType.UPDATE_CHECKOUT_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

//admin register and login actions
export const addNewAdmin = (adminData) => async (dispatch) => {
  try {
    const { data } = await api.addNewAdmin(adminData);
    dispatch({ type: actionType.ADD_ADMIN_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAdminDetails = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_ADMIN_REQUEST });

    const { data } = await api.getAllAdminDetails();

    dispatch({ type: actionType.GET_ADMIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.GET_ADMIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//client register and login actions
export const addNewClient = (clientData) => async (dispatch) => {
  try {
    const { data } = await api.addNewClient(clientData);

    dispatch({ type: actionType.ADD_CLIENT_REQUEST, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAllClientDetails = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_CLIENT_REQUEST });

    const { data } = await api.getAllClientDetails();

    dispatch({ type: actionType.GET_CLIENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: actionType.GET_CLIENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
