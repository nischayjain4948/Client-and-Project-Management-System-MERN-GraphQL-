import React from "react";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQuery";
import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>something went wrong!</p>;
  return (
    <div>
      {!loading && !error && (
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Id</th>
              <th>Trash</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => {
              return <ClientRow key={client.id} client={client} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
