import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { getRandomUsers } from "./store/reducers/users";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(getRandomUsers());
  }, [dispatch]);

  return <div>App</div>;
};

export default App;
