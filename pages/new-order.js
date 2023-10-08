import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

// React select
import Select from "react-select";
const options = [
  { id: "chocolate", test: "Chocolate" },
  { id: "strawberry", test: "Strawberry" },
  { id: "vanilla", test: "Vanilla" },
];

const NewOrder = () => {
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    console.log(sabores);
  }, [sabores]);

  const handleSelect = (option) => {
    setSabores(option);
    console.log(option);
  };
  return (
    <Layout>
      <div>NewOrder</div>
      <Select
        options={options}
        isMulti={true}
        onChange={(option) => handleSelect(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.test}
        placeholder="Select product"
        noOptionsMessage="Not found"
      />
    </Layout>
  );
};

export default NewOrder;
