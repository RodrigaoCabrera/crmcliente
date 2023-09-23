import React from "react";

// Graphql
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser {
    getUser {
      name
      lastName
      email
    }
  }
`;
const Header = () => {
  // Get from apollo
  const { data, loading, error } = useQuery(GET_USER);
  if (loading) return null;

  const { name, lastName } = data.getUser;
  return (
    <div className="flex justify-between mb-6">
      <h1>
        Hola, {name} {lastName}
      </h1>
      <button type="button">Logout</button>
    </div>
  );
};

export default Header;
