import React, { useContext } from "react";

// Import context
import OrderContext from "@/context/orders/OrdersContext";
const Total = () => {
  // use Context
  const orderContext = useContext(OrderContext);
  const { total } = orderContext;
  return (
    <section className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-300">
      <h2 className="text-gray-800 text-lg">Total</h2>
      <p className="text-gray-800 mt-0">$ {total}</p>
    </section>
  );
};

export default Total;
