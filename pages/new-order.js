import React, { useContext } from "react";
import Layout from "@/components/Layout";
import AssignClient from "@/components/orders/AssignClient";
import AssignProducts from "@/components/orders/AssignProducts";
import Summary from "@/components/orders/Summary";
import Total from "@/components/orders/Total";

// Import context
import OrderContext from "@/context/orders/OrdersContext";
const NewOrder = () => {
  // use Context
  const orderContext = useContext(OrderContext);
  const { client, products, total } = orderContext;
  console.log(products);
  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      client.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };
  return (
    <Layout>
      <div>New Order</div>
      <section className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProducts />
          <Summary />
          <Total />

          <button
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
          >
            Register order
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default NewOrder;
