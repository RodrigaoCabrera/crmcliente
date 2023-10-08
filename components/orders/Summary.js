import React, { useState, useEffect, useContext } from "react";
// Import context
import OrderContext from "@/context/orders/OrdersContext";
import ProductSummary from "./ProductSummary";
const Summary = () => {
  // use Context
  const orderContext = useContext(OrderContext);
  const { products } = orderContext;
  console.log(products);
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        {" "}
        3. - Settings products quantity
      </p>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductSummary key={product.id} product={product} />
        ))
      ) : (
        <>There aren't products</>
      )}
    </>
  );
};

export default Summary;
