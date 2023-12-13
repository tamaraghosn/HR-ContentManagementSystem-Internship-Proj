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

const AddEditEmploymentType = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    name: "",
  });
  const handleChangeName = (newValue) => {
    setItem({ ...item, name: newValue });
    setNameError("");
  };
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`/employment-types/${id}`);
        setItem({
          name: responseItem?.data?.data?.name
            ? responseItem?.data?.data?.name
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
      title={`${props.type === "add" ? "Add" : "Edit"} Employment Type`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/employment-types") }}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <TextField
            value={item.name}
            onChange={handleChangeName}
            error={nameError}
            label="Name"
            requiredIndicator
          />
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
                  .delete(`employment-types/${id}`)
                  .then((result) => {
                    navigate("/admin/employment-types");
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
    if (!item.name) {
      !item.name && setNameError("This field is required");
    } else {
      setIsSaving(true);
      const bodyObj = {
        name: item.name,
      };
      props.type === "add"
        ? axios
            .post(`/employment-types`, bodyObj)
            .then((result) => {
              navigate("/admin/employment-types");
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`/employment-types/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditEmploymentType;
