import React, { useCallback, useState } from "react";
// import "@shopify/polaris/build/esm/styles.css";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import "./Assets/Styles/globals.css";
import "./Assets/Styles/react-tagsinput.css";
import Login from "./Pages/Authentication/Login";
import Profile from "./Pages/Profile";
import NavigationLayout from "./Components/NavigationLayout";
import Employees from "./Pages/Employees/List";
import AddEditEmployee from "./Pages/Employees/AddEdit";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />

      <Route
        path="/admin/employees"
        element={
          <NavigationLayout>
            <Employees />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/employees/new"
        element={
          <NavigationLayout>
            <AddEditEmployee type="add" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/employees/:id"
        element={
          <NavigationLayout>
            <AddEditEmployee type="edit" />
          </NavigationLayout>
        }
      />
    </Routes>
  );
}
export default App;
