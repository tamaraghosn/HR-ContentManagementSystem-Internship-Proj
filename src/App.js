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
import EmploymentTypes from "./Pages/Employment Types/List";
import AddEditEmploymentType from "./Pages/Employment Types/AddEdit";
import Interns from "./Pages/Interns/List";
import AddEditIntern from "./Pages/Interns/AddEdit";
import InternProfile from "./Pages/Interns/InternProfile";
import Speciality from "./Pages/Specialty/List";
import AddEditSpeciality from "./Pages/Specialty/AddEdit";
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
      path: "/admin/departments/:id",
      element: (
        <NavigationLayout>
          <AddEditDepartment type="edit"></AddEditDepartment>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/specialities",
      element: (
        <NavigationLayout>
          <Speciality></Speciality>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/specialities/new",
      element: (
        <NavigationLayout>
          <AddEditSpeciality type="add"></AddEditSpeciality>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/specialities/:id",
      element: (
        <NavigationLayout>
          <AddEditSpeciality type="edit"></AddEditSpeciality>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/job-titles",
      element: (
        <NavigationLayout>
          <JobTitles></JobTitles>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/job-titles/new",
      element: (
        <NavigationLayout>
          <AddEditJobTtile type="add"></AddEditJobTtile>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/job-titles/:id",
      element: (
        <NavigationLayout>
          <AddEditJobTtile type="edit"></AddEditJobTtile>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employment-types",
      element: (
        <NavigationLayout>
          <EmploymentTypes></EmploymentTypes>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employment-types/new",
      element: (
        <NavigationLayout>
          <AddEditEmploymentType type="add"></AddEditEmploymentType>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employment-types/:id",
      element: (
        <NavigationLayout>
          <AddEditEmploymentType type="edit"></AddEditEmploymentType>
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
      path: "/admin/employees/:id",
      element: (
        <NavigationLayout>
          <AddEditEmployee type="edit" />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/employees/profile/:id",
      element: (
        <NavigationLayout>
          <EmployeeProfile></EmployeeProfile>
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/interns",
      element: (
        <NavigationLayout>
          <Interns />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/interns/new",
      element: (
        <NavigationLayout>
          <AddEditIntern type="add" />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/interns/:id",
      element: (
        <NavigationLayout>
          <AddEditIntern type="edit" />
        </NavigationLayout>
      ),
    },
    {
      path: "/admin/interns/profile/:id",
      element: (
        <NavigationLayout>
          <InternProfile></InternProfile>
        </NavigationLayout>
      ),
    },
  ]);
}
export default App;
