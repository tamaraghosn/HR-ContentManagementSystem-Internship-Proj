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
import EmployeeProfile from "./Pages/Employees/EmployeeProfile";
import Departments from "./Pages/Departments/List";
import AddEditDepartment from "./Pages/Departments/AddEdit";
import JobTitles from "./Pages/JobTitles/List";
import AddEditJobTtile from "./Pages/JobTitles/AddEdit";
// import Departments from "./Pages/Departments/List";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

  return useRoutes([
    {
      path: "/",
      element: <Login />,
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
      path: "/admin/departments",
      element: (
        <NavigationLayout>
          <Departments></Departments>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/departments/new",
      element: (
        <NavigationLayout>
          <AddEditDepartment type="add"></AddEditDepartment>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/jobtitles",
      element: (
        <NavigationLayout>
          <JobTitles></JobTitles>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/jobtitles/new",
      element: (
        <NavigationLayout>
          <AddEditJobTtile type="add"></AddEditJobTtile>
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
    {
      path: "/admin/employees/profile",
      element: (
        <NavigationLayout>
          <EmployeeProfile></EmployeeProfile>
        </NavigationLayout>
      ),
    },
  ]);
}
export default App;
