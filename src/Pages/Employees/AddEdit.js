import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  Card,
  PageActions,
  Text,
  Loading,
  Checkbox,
  FormLayout,
  TextField,
  InlineError,
  Toast,
  Button,
  Form,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const animatedComponents = makeAnimated();
const AddEditEmployee = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    name: "",
    phoneNumber: "",
  });
  const handleChangeName = (newValue) => {
    setItem({ ...item, name: newValue });
    setNameError("");
  };
  const [nameError, setNameError] = useState("");
  const handleChangePhoneNumber = (newValue) => {
    setItem({ ...item, phoneNumber: newValue });
    setPhoneNumberError("");
  };
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChangeAddress = (newValue) => {
    setItem({ ...item, address: newValue });
    setAddressError("");
  };
  const [addressError, setAddressError] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`employees/${id}`);
        // setItem({
        //   name: responseItem?.data?.data?.name
        //     ? responseItem?.data?.data?.name
        //     : "",
        //   isActive: responseItem?.data?.data?.is_active ? true : false,
        //   features: responseItem?.data?.data?.features.map((item, index) => {
        //     return {
        //       label: item.name,
        //       value: String(item.id),
        //       key: String(item.id),
        //     };
        //   }),
        //   discounts: responseItem?.data?.data?.discounts.map((item, index) => {
        //     return {
        //       label: item.name,
        //       value: String(item.id),
        //       key: String(item.id),
        //     };
        //   }),
        // });
      } catch (error) {
        console.log(error);
      }
    }

    setIsSaving(false);
  }
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast
      content="Changes have been saved successfully"
      onDismiss={toggleActive}
    />
  ) : null;
  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
    }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
  };

  return (
    <Page
      title={`${props.type === "add" ? "Add" : "Edit"} User`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/users") }}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              value={item.name}
              onChange={handleChangeName}
              error={nameError}
              label="Name"
              requiredIndicator
            />

            <TextField
              value={item.phoneNumber}
              onChange={handleChangePhoneNumber}
              error={phoneNumberError}
              label="Phone Number"
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField
              value={item.name}
              onChange={handleChangeName}
              error={nameError}
              label="Name"
            />

            <TextField
              value={item.phoneNumber}
              onChange={handleChangePhoneNumber}
              error={phoneNumberError}
              label="Phone Number"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card>
      <PageActions
        primaryAction={{
          content: "Save",
          onClick: handleSave,
          loading: isSaving && true,
        }}
        secondaryActions={
          props.type === "edit" && [
            {
              content: "Delete",
              destructive: true,
              loading: isSaving && true,
              onClick: () => {
                setIsSaving(true);
                axios
                  .delete(`employees/${id}`)
                  .then((result) => {
                    navigate("/admin/employees");
                  })
                  .catch((err) => console.log(err));
              },
            },
          ]
        }
      />
      {toastMarkup}
    </Page>
  );

  function handleSave() {
    if (!item.name || !item.phoneNumber) {
      !item.name && setNameError("This field is required");
      !item.phoneNumber && setPhoneNumberError("This field is required");
    } else {
      // setIsSaving(true);
      // const bodyObj = {
      //   name: item.firstName,
      // };
      // props.type === "add"
      //   ? axios
      //       .post(`employees`, bodyObj)
      //       .then((result) => {
      //         navigate("/admin/employees");
      //       })
      //       .catch((err) => console.log(err))
      //   : axios
      //       .patch(`employees/${id}`, bodyObj)
      //       .then((result) => {
      //         toggleActive();
      //         setIsSaving(false);
      //       })
      //       .catch((err) => console.log(err));
    }
  }
};

export default AddEditEmployee;
