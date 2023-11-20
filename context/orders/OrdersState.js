import React, { useReducer } from "react";

import OrderContext from "./OrdersContext";
import OrderReducer from "./OrdersReducer";

import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  PRODUCT_QUANTITY,
  UPDATE_PRICE_TOTAL,
} from "../../types";

const OrderState = ({ children }) => {
  // Order State
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Update client
  const addClient = (client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  // Update products
  const addProducts = (productsSelected) => {
    let newProducts;
    if (state.products.length > 0) {
      newProducts = productsSelected.map((product) => {
        const newObject = state.products.find(
          (stateProduct) => stateProduct.id === product.id
        );
        return { ...product, ...newObject };
      });
    } else {
      newProducts = productsSelected;
    }
    dispatch({
      type: SELECT_PRODUCT,
      payload: newProducts,
    });
  };

  // Update products quantity
  const updateProductsQuantity = (newQuantity, product) => {
    const newProduct = { ...product, quantity: newQuantity };
    dispatch({
      type: PRODUCT_QUANTITY,
      payload: newProduct,
    });
  };

  const updatePriceTotal = () => {
    dispatch({
      type: UPDATE_PRICE_TOTAL,
    });
  };
  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        total: state.total,
        client: state.client,
        addClient,
        addProducts,
        updateProductsQuantity,
        updatePriceTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
