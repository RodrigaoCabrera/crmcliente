import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import AssignClient from "@/components/orders/AssignClient";
import AssignProducts from "@/components/orders/AssignProducts";
import Summary from "@/components/orders/Summary";
import Total from "@/components/orders/Total";

// Swal
import Swal from "sweetalert2";

// Graphql
import { gql, useMutation } from "@apollo/client";

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;
// Import context
import OrderContext from "@/context/orders/OrdersContext";
const NewOrder = () => {
  const [message, setMessage] = useState(null);

  // Next router
  const router = useRouter();
  // use Context
  const orderContext = useContext(OrderContext);
  const { client, products, total } = orderContext;

  // Mutation for new order
  const [newOrder] = useMutation(NEW_ORDER);
  const { id } = client;
  const validateOrder = () => {
    return !products.every((product) => product.quantity > 0) ||
      total === 0 ||
      client.length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const setOrder = async () => {
    // Remove products innecesary
    const orders = products.map(({ __typename, exist, ...product }) => product);
    console.log(orders);
    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: id,
            total,
            orders,
            state: "PENDING",
          },
        },
      });
      // Redirect and show alert
      router.push("/orders");

      // Show alert
      Swal.fire("Successfully added", "Order added successfully", "success");
    } catch (error) {
      setMessage(error.message.replace("GraphQL error: ", ""));
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-bold">New product</h1>
      {message && showMessage()}
      <section className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AssignClient />
          <AssignProducts />
          <Summary />
          <Total />

          <button
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
            onClick={setOrder}
          >
            Register order
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default NewOrder;
