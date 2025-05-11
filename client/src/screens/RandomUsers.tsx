import React from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RandomUsers = () => {
  const navigate = useNavigate();

  const { users } = useSelector((state: RootState) => state.users);

  return (
    <div className="container mt-4">
      <div className="list-group">
        {users.map((user) => (
          <div
            key={user.uuid}
            className="list-group-item list-group-item-action d-flex align-items-center"
            onClick={() =>
              navigate(`/details/${user.uuid}`, {
                state: { from: location.pathname },
              })
            }
          >
            <img
              src={user.picture.thumbnail}
              className="rounded-circle me-3"
              alt="thumb"
            />
            <div>
              <h5>{user.fullname}</h5>
              <p className="mb-1">
                {user.gender} | {user.address.country}
              </p>
              <small>
                {user.phoneNumber} | {user.email}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomUsers;
