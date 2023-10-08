import React, { useState, useEffect } from "react";

// Graphql
import { gql, useQuery } from "@apollo/client";
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
// React select
import Select from "react-select";

const AssignClient = () => {
  const [client, setClient] = useState([]);

  // Get client
  const { data, loading, error } = useQuery(GET_USER_CLIENTS);
  useEffect(() => {
    console.log(client);
  }, [client]);

  const handleSelect = (option) => {
    setClient(option);
    console.log(option);
  };

  if (loading) return null;

  const { getClientsSeller } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Assign client
      </p>
      <Select
        options={getClientsSeller}
        isMulti={true}
        onChange={(option) => handleSelect(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        placeholder="Select product"
        noOptionsMessage="Not found"
      />
    </>
  );
};

export default AssignClient;
