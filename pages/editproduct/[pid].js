import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

// Formik
import { Formik } from "formik";
import * as Yup from "yup";

// Alert message
import Swal from "sweetalert2";

// Graphql
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      exist
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      name
      exist
      price
    }
  }
`;

const EditProduct = () => {
  // Get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Get current product
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  // Update product
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // Yup validation schema
  const schemaValidation = Yup.object({
    name: Yup.string().required("Product name is required"),
    exist: Yup.number()
      .required("Exist is required")
      .positive("Negative numbers are not accepted")
      .integer("Must be an integer"),
    price: Yup.number()
      .required("price is required")
      .positive("Negative numbers are not accepted"),
  });

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <h1>Product not found</h1>;
  const { getProduct } = data;

  // Upadte client in db
  const handleUpdate = async (values) => {
    const { name, exist, price } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: { name, exist, price },
        },
      });

      // Sweet alert
      Swal.fire("Update product", "Product updated successfully", "success");

      // Redirect to home
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light ">Edit client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getProduct}
            onSubmit={(values) => handleUpdate(values)}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="name"
                      placeholder="Client name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>
                  {props.touched.name && props.errors.name && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="lastName"
                    >
                      Exist
                    </label>

                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="exist"
                      placeholder="Product quantity"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.exist}
                    />
                  </div>
                  {props.touched.exist && props.errors.exist && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.exist}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>

                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      id="price"
                      placeholder="Product price"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.price}
                    />
                  </div>
                  {props.touched.price && props.errors.price && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.price}</p>
                    </div>
                  )}
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Editar cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
