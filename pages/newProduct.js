import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

// Alert message
import Swal from "sweetalert2";

// Graphql
import GET_PRODUCTS from "../graphql/getProducts.graphql";
import { useMutation, gql } from "@apollo/client";
const NEW_PRODUCT = gql`
  mutation NewProduct($input: ProductInput) {
    newProduct(input: $input) {
      name
      exist
      price
    }
  }
`;

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const NewProduct = () => {
  // New Product mutation
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      // Get cache
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

      // Rewriter cache
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  // Router form next
  const router = useRouter();

  // Formik and Yup for form manager
  const formik = useFormik({
    initialValues: {
      name: "",
      exist: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      exist: Yup.number()
        .required("Exist is required")
        .positive("Negative numbers are not accepted")
        .integer("Must be an integer"),
      price: Yup.number()
        .required("price is required")
        .positive("Negative numbers are not accepted"),
    }),
    onSubmit: async (values) => {
      try {
        const { name, exist, price } = values;
        console.log(typeof exist, price);
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              exist,
              price,
            },
          },
        });

        // Show alert
        Swal.fire("Product created", "success");

        // Redirect to home
        router.push("/products");
      } catch (error) {
        console.log(error);
        // setMessage(error.message.replace("Graphql error", ""));
        /* setTimeout(() => {
              setMessage(null);
            }, 3000); */
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New product</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="name"
              >
                Product name
              </label>

              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="name"
                placeholder="Product name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="exist"
              >
                Exist
              </label>

              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="exist"
                placeholder="Product exist"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.exist}
              />
            </div>
            {formik.touched.exist && formik.errors.exist && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.exist}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="price"
              >
                Product price
              </label>

              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="price"
                placeholder="Product price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </div>
            {formik.touched.price && formik.errors.price && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="To add new product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
