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
  Select,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { genders } from "../../constants";

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
  const handleSelectChangeGender = (newValue) => {
    setItem({ ...item, gender: newValue });
    setPhoneNumberError("");
  };
  const [genderError, setGenderError] = useState("");
  const optionsGender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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

  return (
    <Page
      title={`${props.type === "add" ? "Add" : "Edit"} Employee`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/employees") }}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <Form onSubmit={handleSave}>
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
                type="email"
              />
            </FormLayout.Group>

            <FormLayout.Group>
              <Select
                label="Gender"
                options={genders.map((item, index) => {
                  return { label: item.label, value: item.value };
                })}
                onChange={handleSelectChangeGender}
                value={item.gender}
                placeholder="Please choose an option"
              />
            </FormLayout.Group>
          </FormLayout>
        </Form>
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
