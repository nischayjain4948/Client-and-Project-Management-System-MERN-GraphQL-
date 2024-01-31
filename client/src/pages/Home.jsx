import React from "react";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3s mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>

      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
