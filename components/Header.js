import React from "react";

import { useRouter } from "next/router";
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
  // Router form next
  const router = useRouter();
  // Get from apollo
  const { data, loading, error } = useQuery(GET_USER);
  if (loading) return null;

  // Redirect to login without data
  if (!data) {
    return router.push("/login");
  }
  const { name, lastName } = data.getUser;

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="flex justify-between mb-6">
      <h1>
        Hola, {name} {lastName}
      </h1>
      <button
        onClick={() => logout()}
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
