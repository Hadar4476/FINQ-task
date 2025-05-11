import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./screens/Home";
import RandomUsers from "./screens/RandomUsers";
import History from "./screens/History";
import UserDetails from "./screens/UserDetails";

import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "randomUsers", element: <RandomUsers /> },
      { path: "history", element: <History /> },
      { path: "details/:id", element: <UserDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />{" "}
    </Provider>
  </React.StrictMode>
);
