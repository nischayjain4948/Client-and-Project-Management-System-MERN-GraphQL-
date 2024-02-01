import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQuery";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/home"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <>
      <div className="mt-5 ms-auto"></div>
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash />
      </button>
    </>
  );
};

export default DeleteProjectButton;
