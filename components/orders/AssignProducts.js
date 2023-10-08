import React, { useState, useEffect, useContext } from "react";
// Import context
import OrderContext from "@/context/orders/OrdersContext";

// React select
import Select from "react-select";

// Graphql
import { gql, useQuery } from "@apollo/client";
const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      exist
      price
    }
  }
`;
const AssignProducts = () => {
  const [products, setProducts] = useState([]);
  // use Context
  const orderContext = useContext(OrderContext);
  const { addProducts } = orderContext;

  // Get products
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  // Set products selected
  useEffect(() => {
    // TODO: functions for update OrderState.js
    addProducts(products);
  }, [products]);

  // Select products
  const handleSelect = (option) => {
    setProducts(option);
  };

  if (loading) return null;
  if (!data) return null;
  const { getProducts } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Select Product
      </p>
      <Select
        options={getProducts}
        onChange={(option) => handleSelect(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) =>
          `${options.name} - ${options.exist} available`
        }
        placeholder="Select product"
        noOptionsMessage="Not found"
        isMulti
      />
    </>
  );
};

export default AssignProducts;
