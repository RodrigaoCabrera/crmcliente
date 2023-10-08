import React, { useContext } from "react";
import Layout from "@/components/Layout";
import AssignClient from "@/components/orders/AssignClient";
import AssignProducts from "@/components/orders/AssignProducts";

const NewOrder = () => {
  return (
    <Layout>
      <div>New Order</div>
      <AssignClient />
      <AssignProducts />
    </Layout>
  );
};

export default NewOrder;
