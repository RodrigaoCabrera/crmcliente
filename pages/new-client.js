import React from "react";
import Layout from "../components/Layout";

const newClient = () => {
  return (
    <Layout>
      <h1>New client</h1>
      <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
          />
        </div>

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
          />
        </div>

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
          />
        </div>

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
          />
        </div>

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
