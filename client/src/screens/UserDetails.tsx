import React, { useState } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../types/users";
import {
  deleteRandomUserOnServer,
  saveRandomUser,
  updateRandomUserOnServer,
  usersActions,
} from "../store/reducers/users";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.users);

  const [isEdit, setIsEdit] = useState(false);

  const user = users.find((randomUser) => randomUser.uuid === id);

  const [fullname, setFullname] = useState(user?.fullname || "");

  const onSave = () => {
    if (!user) {
      return;
    }

    const newUser: IUser = {
      ...user,
      fullname,
    };

    dispatch(saveRandomUser(newUser));
  };

  const onDelete = () => {
    if (!user) {
      return;
    }

    if (user?.isSaved) {
      dispatch(deleteRandomUserOnServer(user._id));
      return;
    }

    dispatch(usersActions.deleteRandomUser(user.uuid));
  };

  const onUpdate = () => {
    if (!user) {
      return;
    }

    const updatedUser: IUser = {
      ...user,
      fullname,
    };

    if (user.isSaved) {
      dispatch(updateRandomUserOnServer(updatedUser));
      return;
    }

    dispatch(usersActions.updateRandomUser(updatedUser));
  };

  if (!user) return <div className="container mt-5">User not found</div>;

  return (
    <div className="container mt-4">
      <h2>User Details</h2>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Fullname:</strong>
        {isEdit ? (
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="form-control d-inline w-auto ms-2"
          />
        ) : (
          <>
            {fullname}
            <i
              className="bi bi-pencil ms-2"
              onClick={() => setIsEdit(true)}
            ></i>
          </>
        )}
      </p>
      <p>
        <strong>Age:</strong> {user?.age}, <strong>Year of Birth:</strong>
        {user.yearOfBirth}
      </p>
      <p>
        <strong>Address:</strong> {user.address.street.number}
        {user.address.street.name}, {user.address.city}, {user.address.state}
      </p>
      <p>
        <strong>Contact:</strong> {user.email}, {user.phoneNumber}
      </p>
      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={onSave}>
          Save
        </button>
        <button className="btn btn-danger me-2" onClick={onDelete}>
          Delete
        </button>
        <button className="btn btn-warning me-2" onClick={onUpdate}>
          Update
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(location.state?.from || "/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
