import React from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { getRandomUsers } from "../store/reducers/users";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const onFetchRandomUsers = () => {
    dispatch(getRandomUsers());
    navigate("/randomUsers");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex gap-3">
        <button className="btn btn-primary" onClick={onFetchRandomUsers}>
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
