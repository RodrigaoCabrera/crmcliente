import React, { useContext } from "react";
import Layout from "@/components/Layout";
import AssignClient from "@/components/orders/AssignClient";

const NewOrder = () => {
  return (
    <Layout>
      <div>New Order</div>
      <AssignClient />
    </Layout>
  );
};

export default NewOrder;
