import React, { useContext } from "react";
import Layout from "@/components/Layout";
import AssignClient from "@/components/orders/AssignClient";

// Import context
import OrderContext from "@/context/orders/OrdersContext";
const NewOrder = () => {
  // Get context
  const orderContext = useContext(OrderContext);
  const { handleTest } = orderContext;
  handleTest();
  return (
    <Layout>
      <div>New Order</div>
      <AssignClient />
    </Layout>
  );
};

export default NewOrder;
