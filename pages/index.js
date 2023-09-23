import Layout from "../components/Layout";

// Graphql
import { useQuery, gql } from "@apollo/client";

const GET_USER_CLIENTS = gql`
  query GetClientsSeller {
    getClientsSeller {
      name
      lastName
      email
      telephone
    }
  }
`;
export default function Index() {
  // Get from apollo

  const { data, loading, error } = useQuery(GET_USER_CLIENTS);
  console.log(data);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light ">Clientes</h1>
      </Layout>
    </div>
  );
}
