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

const AddEditDepartment = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    depName: "",
  });
  const handleChangeDepName = (newValue) => {
    setItem({ ...item, depName: newValue });
    setDepNameError("");
  };
  const [depNameError, setDepNameError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`departments/${id}`);
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
      title={`${props.type === "add" ? "Add" : "Edit"} Department`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/departments") }}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <Text variant="headingSm" as="h6">
            DEPARTMENT
          </Text>
          <FormLayout.Group>
            <TextField
              value={item.depName}
              onChange={handleChangeDepName}
              error={depNameError}
              label="Name"
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
                  .delete(`departments/${id}`)
                  .then((result) => {
                    navigate("/admin/departments");
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
    if (!item.depName) {
      !item.depName && setDepNameError("This field is required");
    } else {
      // setIsSaving(true);
      // const bodyObj = {
      //   name: item.firstName,
      // };
      // props.type === "add"
      //   ? axios
      //       .post(`departments`, bodyObj)
      //       .then((result) => {
      //         navigate("/admin/departments");
      //       })
      //       .catch((err) => console.log(err))
      //   : axios
      //       .patch(`departments/${id}`, bodyObj)
      //       .then((result) => {
      //         toggleActive();
      //         setIsSaving(false);
      //       })
      //       .catch((err) => console.log(err));
    }
  }
};

export default AddEditDepartment;
