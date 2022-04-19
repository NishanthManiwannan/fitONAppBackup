import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  addProductReducer,
  getProductDetailsReducer,
  getProductReducer,
  addCheckOutReducer,
  getCheckOutDetailsReducer,
  updateCheckOutProductsReducer,
  addNewAdmin,
  addNewClient,
  getAdminDetailsReducer,
  getClientDetailsReducer,
  deleteProductReducer,
  updateProductReducer,
  getProductBySearchReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  product: addProductReducer,
  getProducts: getProductReducer,
  getProductDetails: getProductDetailsReducer,
  addCheckOutProduct: addCheckOutReducer,
  getCheckOutDetailsReducer: getCheckOutDetailsReducer,
  updateCheckOutProductsReducer: updateCheckOutProductsReducer,
  addNewAdmin: addNewAdmin,
  addNewClient: addNewClient,
  getAdminDetails: getAdminDetailsReducer,
  getClientDetails: getClientDetailsReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  getProductBySearch: getProductBySearchReducer,
});

const middleware = [thunk]; //async actions

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
//then connect with index.js
