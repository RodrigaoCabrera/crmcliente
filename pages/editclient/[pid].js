import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

// Graphql
import { useQuery, gql } from "@apollo/client";

const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    getClient(id: $id) {
      name
      lastName
      telephone
      email
      business
    }
  }
`;
const EditClient = () => {
  // Get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Get current client
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  if (loading) return <h1>Loading...</h1>;
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light ">Edit client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            // onSubmit={formik.handleSubmit}
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
                /*  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} */
              />
            </div>
            {/* {formik.touched.name && formik.errors.name && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            )} */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="lastName"
              >
                Last name
              </label>

              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="lastName"
                placeholder="Client last name"
                /*  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName} */
              />
            </div>
            {/* {formik.touched.lastName && formik.errors.lastName && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            )} */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="business"
              >
                Business
              </label>

              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="business"
                placeholder="Client business"
                /*  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.business} */
              />
            </div>
            {/* {formik.touched.business && formik.errors.business && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.business}</p>
              </div>
            )} */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="email"
              >
                Email
              </label>

              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="email"
                placeholder="Client email address"
                /* onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} */
              />
            </div>
            {/* {formik.touched.email && formik.errors.email && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            )} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>

              <input
                type="tel"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="phone"
                placeholder="Client phone address"
                /* onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone} */
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditClient;
