import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

// Graphql
import { useQuery, gql } from "@apollo/client";
import Client from "@/components/Client";

const GET_USER_CLIENTS = gql`
  query GetClientsSeller {
    getClientsSeller {
      id
      name
      lastName
      email
      telephone
      business
    }
  }
`;
export default function Index() {
  // Router form next
  const router = useRouter();
  // Get from apollo
  const { data, loading, error } = useQuery(GET_USER_CLIENTS);

  if (loading) {
    return <p>Loading</p>;
  }
  // Redirect to login without data
  if (!data.getClientsSeller) {
    router.push("/login");
    return;
  }
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light ">Clientes</h1>
        <Link
          href="/new-client"
          className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold"
        >
          New client
        </Link>
        <table className="table-auto shadow-md mt10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Last name</th>
              <th className="w-1/5 py-2">Business</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">phone</th>
              <th className="w-1/5 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getClientsSeller.map((client) => (
              <Client key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
