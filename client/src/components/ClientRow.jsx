import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_ClIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";

const ClientRow = ({ client }) => {
  const deleteClientOnButton = () => {
    const clicked = confirm("Do you want to delete");
    if (clicked) deleteClient();
  };

  const [deleteClient] = useMutation(DELETE_ClIENT, {
    variables: { id: client.id },
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{client.id}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={deleteClientOnButton}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
