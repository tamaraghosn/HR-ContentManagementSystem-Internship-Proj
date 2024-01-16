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

const AddEditSpeciality = (props) => {
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
        responseItem = await axios.get(`/specialities/${id}`);
        setItem({
          name: responseItem?.data?.data?.speciality
            ? responseItem?.data?.data?.speciality
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
      title={`${props.type === "add" ? "Add" : "Edit"} Speciality`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/specialities") }}
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
                  .delete(`specialities/${id}`)
                  .then((result) => {
                    navigate("/admin/specialities");
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
        speciality: item.name,
        is_active: 1,
      };
      props.type === "add"
        ? axios
            .post(`/specialities`, bodyObj)
            .then((result) => {
              navigate("/admin/specialities");
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`/specialities/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditSpeciality;
