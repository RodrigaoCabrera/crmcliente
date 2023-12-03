import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
const UPDATE_ORDER_STATE = gql`
  mutation UpdateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      state
    }
  }
`;
const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

const GET_ORDERS_SELLER = gql`
  query GetOrdersSeller {
    getOrdersSeller {
      id
    }
  }
`;

const Order = ({ order }) => {
  const {
    id,
    total,
    client: { name, lastName, email, telephone },
    state,
    client,
  } = order;
  const [orderState, setOrderState] = useState(state);

  // Mutation for order update
  const [updateOrder] = useMutation(UPDATE_ORDER_STATE);
  // Mutation for delete order
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersSeller } = cache.readQuery({
        query: GET_ORDERS_SELLER,
      });

      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrdersSeller: getOrdersSeller.filter((order) => order.id !== id),
        },
      });
    },
  });

  useEffect(() => {
    if (orderState) {
      setOrderState(orderState);
    }
  }, [orderState]);

  // Modificate state order color
  const changeColor = useMemo(() => {
    const color = {
      COMPLETED: "border-green-700",
      PENDING: "border-yellow-400",
      CANCELED: "border-red-500",
    }[orderState];
    return color;
  }, [orderState]);

  // Update order state
  const handlerOrderStateUpdate = async (e) => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            state: e.target.value,
            client: client.id,
          },
        },
      });
      setOrderState(data.updateOrder.state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
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
          const { data } = await deleteOrder({
            variables: {
              id,
            },
          });
          console.log(data);
          Swal.fire("Deleted order!", data.deleteOrder, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <section
      className={` ${changeColor} border-l-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className="font-bold text-gray-800 ">
          Client: {name} {lastName}
        </p>
        {email && <p>{email}</p>}
        {telephone && <p>{telephone}</p>}

        <h2 className="text-gray-800 font-bold mt-10">Order state</h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          value={orderState}
          onChange={(e) => handlerOrderStateUpdate(e)}
        >
          <option value="COMPLETED" key="">
            COMPLETED
          </option>
          <option value="PENDING" key="">
            PENDING
          </option>
          <option value="CANCELED" key="">
            CANCELED
          </option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Order summary</h2>
        {order.orders.map((article) => (
          <div key={article.id} className="mt-4">
            <p className="text-sm text-gray-600">Product: {article.name}</p>
            <p className="text-sm text-gray-600">
              Quantity: {article.quantity}
            </p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Payment total:
          <span className="font-light">{total}</span>
        </p>

        <button
          onClick={handleDelete}
          className="flex items-center gap-5 mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
        >
          Delete order
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
      </div>
    </section>
  );
};

export default Order;
