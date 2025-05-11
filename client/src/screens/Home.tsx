import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/randomUsers")}
        >
          Fetch
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/history")}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default Home;
