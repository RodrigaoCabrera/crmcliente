import React from "react";
import Layout from "../components/Layout";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const newClient = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      business: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
      business: Yup.string().required("Business is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is no valid"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Layout>
      <h1>New client</h1>
      <form
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
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
            htmlFor="lastName"
          >
            Last name
          </label>

          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="lastName"
            placeholder="Client last name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </div>
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{formik.errors.lastName}</p>
          </div>
        )}

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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.business}
          />
        </div>
        {formik.touched.business && formik.errors.business && (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{formik.errors.business}</p>
          </div>
        )}

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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error</p>
            <p>{formik.errors.email}</p>
          </div>
        )}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
        </div>

        <input
          type="submit"
          className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
          value="Registrar cliente"
        />
      </form>
    </Layout>
  );
};

export default newClient;
