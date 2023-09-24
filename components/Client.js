import React from "react";
import Router from "next/router";

// Alert message
import Swal from "sweetalert2";
// Graphql
import { useMutation, gql } from "@apollo/client";
const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

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

const Client = ({ key, client }) => {
  // Mutation for create new users
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      // Get cache object copy
      const { getClientsSeller } = cache.readQuery({
        query: GET_USER_CLIENTS,
      });

      // Re-write cache object
      cache.writeQuery({
        query: GET_USER_CLIENTS,
        data: {
          getClientsSeller: getClientsSeller.filter(
            (client) => client.id !== id
          ),
        },
      });
    },
  });

  const { name, lastName, business, email, phone, id } = client;
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete the client?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete for ID
          const { data } = await deleteClient({
            variables: {
              id,
            },
          });
          console.log(data);
          Swal.fire("Deleted cliente!", data.deleteClient, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const handleEdit = () => {
    Router.push({
      pathname: "/editclient/:{id}",
      query: { id },
    });
  };
  return (
    <tr key={key}>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{lastName}</td>
      <td className="border px-4 py-2">{business}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{phone}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className=" flex justify-center items-center bg-red-700 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => handleDelete()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className=" flex justify-center items-center bg-green-700 py-2 px-2 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => handleEdit(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
