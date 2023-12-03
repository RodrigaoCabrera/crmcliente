import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Order from "@/components/Order";

const GET_ORDERS_SELLER = gql`
  query GetOrdersSeller {
    getOrdersSeller {
      id
      orders {
        id
        quantity
        name
      }
      total
      client {
        id
        name
        lastName
        email
        telephone
      }
      seller
      state
    }
  }
`;

export default function Nosotros() {
  const { data, loading, error } = useQuery(GET_ORDERS_SELLER);
  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>Error</h1>;
  const { getOrdersSeller } = data;
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light ">Pedidos</h1>
        <Link
          href="/new-order"
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
        >
          New order
        </Link>
        {getOrdersSeller.length === 0 ? (
          <p className="mt-5 text-center text-2xl">There aren't product</p>
        ) : (
          getOrdersSeller.map((order) => <Order key={order.id} order={order} />)
        )}
      </Layout>
    </div>
  );
}
