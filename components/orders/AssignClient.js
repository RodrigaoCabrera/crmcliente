import React, { useState, useEffect } from "react";

// React select
import Select from "react-select";
const clients = [
  { id: "Rodir", name: "Rodir" },
  { id: "Rodrigao", name: "Rodrigao" },
  { id: "David", name: "David" },
];

const AssignClient = () => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    console.log(client);
  }, [client]);

  const handleSelect = (option) => {
    setClient(option);
    console.log(option);
  };
  return (
    <Select
      options={clients}
      isMulti={true}
      onChange={(option) => handleSelect(option)}
      getOptionValue={(options) => options.id}
      getOptionLabel={(options) => options.name}
      placeholder="Select product"
      noOptionsMessage="Not found"
    />
  );
};

export default AssignClient;
