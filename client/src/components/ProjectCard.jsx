import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  console.log(project);
  return (
    <div className="col-md-5">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <Link className="btn btn-light" to={`/projects/${project.id}`}>
              <FaEye />
            </Link>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
