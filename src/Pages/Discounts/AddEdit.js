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
  Select,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddEditDiscount = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(
    props?.type === "edit" ? true : false
  );
  const [item, setItem] = useState({
    name: "",
    isActive: true,
    description: "",
    title: "",
    dataEntryType: "",
    yesDiscount: "",
    noDiscount: "",
  });
  const handleChangeName = (newValue) => {
    setItem({ ...item, name: newValue });
    setNameError("");
  };
  const handleChangeTitle = (newValue) => {
    setItem({ ...item, title: newValue });
    setTitleError("");
  };
  const handleChangeDescription = (newValue) => {
    setItem({ ...item, description: newValue });
  };
  const handleChangeIsActive = (newValue) => {
    setItem({ ...item, isActive: newValue });
  };
  const [nameError, setNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const handleSelectChangeDataEntry = (newValue) => {
    setItem({ ...item, dataEntryType: newValue });
    setDataEntryTypeError("");
  };
  const optionsDataEntry = [
    // { label: "Choice", value: "1" },
    // { label: "Free", value: "2" },
    // { label: "Slider", value: "3" },
    { label: "Yes or No", value: "4" },
    // { label: "Choice Slider", value: "5" },
  ];
  const [dataEntryTypeError, setDataEntryTypeError] = useState("");

  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast
      content="Changes have been saved successfully"
      onDismiss={toggleActive}
    />
  ) : null;
  const handleChangeYesDiscount = (newValue) => {
    setItem({ ...item, yesDiscount: newValue });
  };
  const handleChangeNoDiscount = (newValue) => {
    setItem({ ...item, noDiscount: newValue });
  };
  useEffect(() => {
    if (props.type === "edit")
      axios
        .get(`discounts/${id}`)
        .then((result) => {
          setItem({
            title: result?.data?.data?.title ? result.data.data.title : "",
            name: result?.data?.data?.name ? result.data.data.title : "",
            description: result?.data?.data?.subtitle
              ? result.data.data.subtitle
              : "",
            dataEntryType:
              result?.data?.data?.data_entry_type !== null
                ? String(result.data.data.data_entry_type)
                : "",

            isActive: result?.data?.data?.is_active == 0 ? false : true,
            yesDiscount:
              String(result.data.data.data_entry_type) === "4" &&
              result?.data?.data?.discount &&
              result?.data?.data?.discount?.length
                ? result?.data?.data?.discount[0]
                : "",
            noDiscount:
              String(result.data.data.data_entry_type) === "4" &&
              result?.data?.data?.discount &&
              result?.data?.data?.discount?.length
                ? result?.data?.data?.discount[1]
                : "",
          });
          setIsSaving(false);
        })
        .catch((err) => console.log(err));
  }, []);

  const switchAnswer = () => {
    switch (item.dataEntryType) {
      case "4":
        return ["yes", "no"];

      default:
      // code block
    }
  };
  const switchDiscount = () => {
    switch (item.dataEntryType) {
      case "4":
        return [item.yesDiscount, item.noDiscount];

      default:
      // code block
    }
  };
  return (
    <Page
      title={`${props.type === "add" ? "Add" : "Edit"} Discount`}
      breadcrumbs={[
        {
          onAction: () => navigate(`/admin/discounts`),
        },
      ]}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="Name"
              value={item.name}
              onChange={handleChangeName}
              error={nameError}
            />
            <TextField
              label="Title"
              value={item.title}
              onChange={handleChangeTitle}
              error={titleError}
            />
          </FormLayout.Group>
          <TextField
            label="Description"
            value={item.description}
            onChange={handleChangeDescription}
          />
          <FormLayout.Group>
            <Select
              label="Data Entry Type"
              options={optionsDataEntry}
              onChange={handleSelectChangeDataEntry}
              value={item.dataEntryType}
              placeholder="Please select"
              error={dataEntryTypeError}
            />
          </FormLayout.Group>
          {item.dataEntryType === "4" && (
            <FormLayout.Group>
              <TextField
                label="Discount for yes answer"
                value={item.yesDiscount}
                onChange={handleChangeYesDiscount}
                type="number"
              />
              <TextField
                label="Discount for no answer"
                value={item.noDiscount}
                onChange={handleChangeNoDiscount}
                type="number"
              />
            </FormLayout.Group>
          )}

          <Checkbox
            label="Is Active"
            checked={item.isActive}
            onChange={handleChangeIsActive}
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
                  .delete(`products/${id}`)
                  .then((result) => {
                    navigate("/admin/products");
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
    if (!item.name || !item.title || item.dataEntryType === "") {
      !item.name && setNameError("This field is required");
      !item.title && setTitleError("This field is required");
      item.dataEntryType === "" &&
        setDataEntryTypeError("Please select a type");
    } else {
      setIsSaving(true);
      const bodyObj = {
        is_active: item.isActive ? 1 : 0,
        name: item.name,
        title: item.title,
        subtitle: item.description,
        data_entry_type: item.dataEntryType,
        answer: switchAnswer(),
        discount: switchDiscount(),
      };
      props.type === "add"
        ? axios
            .post(`discounts`, bodyObj)
            .then((result) => {
              navigate(`/admin/discounts`);
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`discounts/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditDiscount;
