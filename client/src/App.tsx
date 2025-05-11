import React from "react";

import { Outlet } from "react-router-dom";

const App = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { users, loading, error } = useSelector(
  //   (state: RootState) => state.users
  // );

  // useEffect(() => {
  //   dispatch(getRandomUsers());
  // }, [dispatch]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
