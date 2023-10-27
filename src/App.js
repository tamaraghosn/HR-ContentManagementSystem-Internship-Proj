import React, { useCallback, useState } from "react";
// import "@shopify/polaris/build/esm/styles.css";
import {
  BrowserRouter,
  useRoutes, // instead of "Switch"
} from "react-router-dom";
import "./Assets/Styles/globals.css";
import "./Assets/Styles/react-tagsinput.css";
import Login from "./Pages/Authentication/Login";
import Profile from "./Pages/Profile";
import NavigationLayout from "./Components/NavigationLayout";
import Employees from "./Pages/Employees/List";
import AddEditEmployee from "./Pages/Employees/AddEdit";
import { Nav } from "react-bootstrap";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

  return useRoutes([
    {
      path: "/",
      element: (
        <NavigationLayout>
          <Login />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employees",
      element: (
        <NavigationLayout>
          <Employees />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employees/new",
      element: (
        <NavigationLayout>
          <AddEditEmployee type="add" />
        </NavigationLayout>
      ),
    },
  ]);
}
export default App;
