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
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import Profile from "./Pages/Profile";
import ResetPassword from "./Pages/Authentication/ResetPassword";
import NavigationLayout from "./Components/NavigationLayout";
import Products from "./Pages/Products/List";
import Features from "./Pages/Features/List";
import Subfeatures from "./Pages/Subfeatures/List";
import AddEditProduct from "./Pages/Products/AddEdit";
import AddEditSubfeature from "./Pages/Subfeatures/AddEdit";
import Discounts from "./Pages/Discounts/List";
import AddEditDiscount from "./Pages/Discounts/AddEdit";

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log = function () {};
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route
        path="/admin/products"
        element={
          <NavigationLayout>
            <Products />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <NavigationLayout>
            <AddEditProduct type="add" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <NavigationLayout>
            <AddEditProduct type="edit" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/features"
        element={
          <NavigationLayout>
            <Features />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/features/:id/subfeatures"
        element={
          <NavigationLayout>
            <Subfeatures />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/features/:featureId/subfeatures/new"
        element={
          <NavigationLayout>
            <AddEditSubfeature type="add" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/features/:featureId/subfeatures/:subfeatureId"
        element={
          <NavigationLayout>
            <AddEditSubfeature type="edit" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/discounts"
        element={
          <NavigationLayout>
            <Discounts />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/discounts/new"
        element={
          <NavigationLayout>
            <AddEditDiscount type="add" />
          </NavigationLayout>
        }
      />
      <Route
        path="/admin/discounts/:id"
        element={
          <NavigationLayout>
            <AddEditDiscount type="edit" />
          </NavigationLayout>
        }
      />
    </Routes>
  );
}
export default App;
