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
  Toast,
  Select,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { genders } from "../../constants";
import SelectSearchable from "react-select";

const AddEditIntern = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    title: "",
  });
  const handleChangeFirstName = (newValue) => {
    setItem({ ...item, firstName: newValue });
    setFirstNameError("");
  };
  const [firstNameError, setFirstNameError] = useState("");

  const handleChangeLastName = (newValue) => {
    setItem({ ...item, lastName: newValue });
    setLastNameError("");
  };
  const [lastNameError, setLastNameError] = useState("");

  // const handleChangePhoneNumber = (newValue) => {
  //   setItem({ ...item, phoneNumber: newValue });
  //   setPhoneNumberError("");
  // };
  // const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChangeEmailAddress = (newValue) => {
    setItem({ ...item, emailAddress: newValue });
    setEmailAddressError("");
  };
  const [emailAddressError, setEmailAddressError] = useState("");

  // const handleSelectChangeGender = (newValue) => {
  //   setItem({ ...item, gender: newValue });
  // };

  // const optionsGender = [
  //   { label: "Male", value: "male" },
  //   { label: "Female", value: "female" },
  // ];

  const handleSelectChangeTitle = (newValue) => {
    setItem({ ...item, title: newValue });
  };
  const optionsTitle = [
    { label: "Mr", value: "1" },
    { label: "Mrs", value: "2" },
    { label: "Ms", value: "3" },
    { label: "Miss", value: "4" },
    { label: "Mstr", value: "5" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`/interns/${id}`);
        console.log(responseItem.data.data);
        setItem({
          firstName: responseItem?.data?.data?.first_name
            ? responseItem?.data?.data?.first_name
            : "",
          lastName: responseItem?.data?.data?.last_name
            ? responseItem?.data?.data?.last_name
            : "",
          emailAddress: responseItem?.data?.data?.email
            ? responseItem?.data?.data?.email
            : "",
          title: responseItem?.data?.data?.title
            ? String(responseItem?.data?.data?.title)
            : "",

          isActive: responseItem?.data?.data?.is_active ? true : false,
        });
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
      title={`${props.type === "add" ? "Add" : "Edit"} Intern`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/interns") }}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <Text variant="headingSm" as="h6">
            GENERAL INFORMATION
          </Text>
          <FormLayout.Group>
            <TextField
              value={item.firstName}
              onChange={handleChangeFirstName}
              error={firstNameError}
              label="First Name"
              requiredIndicator
            />
            <TextField
              value={item.lastName}
              onChange={handleChangeLastName}
              error={lastNameError}
              label="Last Name"
              requiredIndicator
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Select
              label="Title"
              options={optionsTitle.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeTitle}
              value={item.title}
              placeholder="Please choose an option"
            />

            <TextField
              value={item.emailAddress}
              onChange={handleChangeEmailAddress}
              error={emailAddressError}
              label="Email Address"
              type="email"
              requiredIndicator
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
                  .delete(`interns/${id}`)
                  .then((result) => {
                    navigate("/admin/interns");
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
    if (
      !item.firstName ||
      // !item.phoneNumber ||
      !item.lastName ||
      !item.emailAddress
    ) {
      !item.firstName && setFirstNameError("This field is required");
      !item.lastName && setLastNameError("This field is required");

      !item.emailAddress && setEmailAddressError("This field is required");
    } else {
      setIsSaving(true);
      const bodyObj = {
        title: item.title,
        first_name: item.firstName,
        last_name: item.lastName,
        email: item.emailAddress,
      };
      props.type === "add"
        ? axios
            .post(`/interns`, bodyObj)
            .then((result) => {
              navigate("/admin/interns");
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`/interns/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditIntern;
