import * as actions from "../constants/productsConstant";

//products reducers
export const addProductReducer = (state = { productItem: [] }, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCT_REQUEST:
      const product = action.payload;
      return { ...state, productItem: [...state.productItem, product] };
    default:
      return state;
  }
};

export const getProductReducer = (state = { productItem: [] }, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        productItem: [],
      };
    case actions.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productItem: action.payload,
      };

    case actions.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (
  state = { productItem: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case actions.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        productItem: action.payload,
      };

    case actions.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actions.GET_PRODUCT_DETAILS_RESET:
      return {
        productItem: {},
      };
    default:
      return state;
  }
};

export const getProductBySearchReducer = (state = { productItem: [] }, action) => {
  switch (action.type) {
    case actions.SEARCH_PRODUCT_REQUEST:
      return {
        loading: false,
        productItem: action.payload,
      };

    default:
      return state;
  }
};

export const deleteProductReducer = (productItem = [], action) => {
  switch (action.type) {
    case actions.REMOVE_PRODUCT_REQUEST:
      return productItem.filter(
        (productData) => productData._id !== action.payload
      );
    default:
      return productItem;
  }
};

export const updateProductReducer = (productItem = [], action) => {
  switch (action.type) {
    case actions.UPDATE_PRODUCT_SUCCESS:
      return productItem.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );

    default:
      return productItem;
  }
};

//checkout ordered product reducers ====================================
export const addCheckOutReducer = (state = { productItem: [] }, action) => {
  switch (action.type) {
    case actions.ADD_CHECKOUT_REQUEST:
      const product = action.payload;
      return { ...state, productItem: [...state.productItem, product] };
    default:
      return state;
  }
};

export const getCheckOutDetailsReducer = (
  state = { productItem: [] },
  action
) => {
  switch (action.type) {
    case actions.GET_CHECKOUT_REQUEST:
      return {
        loading: true,
        productItem: [],
      };
    case actions.GET_CHECKOUT_SUCCESS:
      return {
        loading: false,
        productItem: action.payload,
      };

    case actions.GET_CHECKOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateCheckOutProductsReducer = (
  state = { productItem: [] },
  action
) => {
  switch (action.type) {
    case actions.UPDATE_CHECKOUT_REQUEST:
      const product = action.payload;
      return { ...state, productItem: [...state.productItem, product] };
    default:
      return state;
  }
};

//Admin registration and login reducers
export const addNewAdmin = (state = { adminDetails: [] }, action) => {
  switch (action.type) {
    case actions.ADD_ADMIN_REQUEST:
      const admin = action.payload;
      return { ...state, adminDetails: [...state.adminDetails, admin] };
    default:
      return state;
  }
};

export const getAdminDetailsReducer = (
  state = { adminDetails: [] },
  action
) => {
  switch (action.type) {
    case actions.GET_ADMIN_REQUEST:
      return {
        loading: true,
        adminDetails: [],
      };
    case actions.GET_ADMIN_SUCCESS:
      return {
        loading: false,
        adminDetails: action.payload,
      };

    case actions.GET_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Admin registration and login reducers
export const addNewClient = (state = { clientDetails: [] }, action) => {
  switch (action.type) {
    case actions.ADD_CLIENT_REQUEST:
      const client = action.payload;
      return { ...state, clientDetails: [...state.clientDetails, client] };
    default:
      return state;
  }
};

export const getClientDetailsReducer = (
  state = { clientDetails: [] },
  action
) => {
  switch (action.type) {
    case actions.GET_CLIENT_REQUEST:
      return {
        loading: true,
        clientDetails: [],
      };
    case actions.GET_CLIENT_SUCCESS:
      return {
        loading: false,
        clientDetails: action.payload,
      };

    case actions.GET_CLIENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
