import Layout from "../components/Layout";

// Graphql
import { useQuery, gql } from "@apollo/client";

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
  // Get from apollo
  const { data, loading, error } = useQuery(GET_USER_CLIENTS);
  console.log(data);
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light ">Clientes</h1>

        <table className="table-auto shadow-md mt10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Business</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.getClientsSeller.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2">{client.name}</td>
                <td className="border px-4 py-2">{client.business}</td>
                <td className="border px-4 py-2">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
