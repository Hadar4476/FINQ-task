import React, { useEffect, useState } from "react";
import { IUser } from "../types/users";
import { useNavigate } from "react-router-dom";
import { fetchHistory } from "../services/users";

const History = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsersHistory = async () => {
      try {
        const data = await fetchHistory();

        setUsers(() => data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersHistory();
  }, []);

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

export default History;
