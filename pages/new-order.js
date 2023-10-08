import React, { useContext } from "react";
import Layout from "@/components/Layout";
import AssignClient from "@/components/orders/AssignClient";
import AssignProducts from "@/components/orders/AssignProducts";
import Summary from "@/components/orders/Summary";

const NewOrder = () => {
  return (
    <Layout>
      <div>New Order</div>
      <section className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProducts />
          <Summary />
        </div>
      </section>
    </Layout>
  );
};

export default NewOrder;
