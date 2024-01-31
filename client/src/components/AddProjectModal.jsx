import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuery";
import { GET_CLIENTS } from "../queries/clientQuery";
import Spinner from "./Spinner";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  //   Get Clients to show

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    console.table([{ name }, { description }, { clientId }, { status }]);
    if (name == "" || description == "" || clientId == "" || status == "") {
      return alert("Please fill in all fields");
    }
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };
  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            role="dialog"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="" className="form-label">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        cols="30"
                        rows="10"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Client
                      </label>
                      <select
                        id="clientId"
                        value={clientId}
                        className="form-select"
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="" Select Client></option>
                        {data.clients.map((client) => {
                          return (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
