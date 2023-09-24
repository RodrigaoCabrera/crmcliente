import React from "react";
import { useRouter } from "next/router";

const EditClient = () => {
  // Get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;
  console.log(id);
  return <div>EditClient</div>;
};

export default EditClient;
