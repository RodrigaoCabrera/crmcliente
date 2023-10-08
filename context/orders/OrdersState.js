import React, { useReducer } from "react";

import OrderContext from "./OrdersContext";
import OrderReducer from "./OrdersReducer";

import { SELECT_CLIENT, SELECT_PRODUCT, PRODUCT_QUANTITY } from "../../types";

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
  const addProducts = (products) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: products,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        addClient,
        addProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
