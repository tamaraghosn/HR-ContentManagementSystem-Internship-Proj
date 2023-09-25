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

const AddEditSubfeature = (props) => {
  const navigate = useNavigate();
  var { featureId, subfeatureId } = useParams();
  const [isSaving, setIsSaving] = useState(
    props?.type === "edit" ? true : false
  );
  const [item, setItem] = useState({
    name: "",
    isActive: true,
    description: "",
    title: "",
    subscriptionType: "",
    dataEntryType: "",
    yesPrice: "",
    noPrice: "",
    minimumSlider: "",
    maximumSlider: "",
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
    { label: "Choice", value: "1" },
    { label: "Free", value: "2" },
    { label: "Slider", value: "3" },
    { label: "Yes or No", value: "4" },
    { label: "Choice Slider", value: "5" },
  ];
  const [dataEntryTypeError, setDataEntryTypeError] = useState("");
  const handleSelectChangeSubscription = (newValue) => {
    setItem({ ...item, subscriptionType: newValue });
  };
  const optionsSubscription = [
    { label: "None", value: "1" },
    { label: "Yearly", value: "2" },
    { label: "Monthly", value: "3" },
  ];
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast
      content="Changes have been saved successfully"
      onDismiss={toggleActive}
    />
  ) : null;
  const handleChangeYesPrice = (newValue) => {
    setItem({ ...item, yesPrice: newValue });
  };
  const handleChangeNoPrice = (newValue) => {
    setItem({ ...item, noPrice: newValue });
  };
  const handleChangeMinimumSlider = (newValue) => {
    setItem({ ...item, minimumSlider: newValue });
    setSliderInputsError("");
  };
  const handleChangeMaximumlider = (newValue) => {
    setItem({ ...item, maximumSlider: newValue });
    setSliderInputsError("");
  };
  const [sliderInputsError, setSliderInputsError] = useState("");
  useEffect(() => {
    if (props.type === "edit")
      axios
        .get(`subfeatures/${subfeatureId}`)
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
            subscriptionType:
              result?.data?.data?.subscription_type !== null
                ? String(result.data.data.subscription_type)
                : "",
            isActive: result?.data?.data?.is_active == 0 ? false : true,
            yesPrice:
              String(result.data.data.data_entry_type) === "4" &&
              result?.data?.data?.price &&
              result?.data?.data?.price?.length
                ? result?.data?.data?.price[0]
                : "",
            noPrice:
              String(result.data.data.data_entry_type) === "4" &&
              result?.data?.data?.price &&
              result?.data?.data?.price?.length
                ? result?.data?.data?.price[1]
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
  const switchPrice = () => {
    switch (item.dataEntryType) {
      case "4":
        return [item.yesPrice, item.noPrice];

      default:
      // code block
    }
  };
  return (
    <Page
      title={`${props.type === "add" ? "Add" : "Edit"} Subfeature`}
      breadcrumbs={[
        {
          onAction: () => navigate(`/admin/features/${featureId}/subfeatures`),
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
            <Select
              label="Subscription Type"
              options={optionsSubscription}
              onChange={handleSelectChangeSubscription}
              value={item.subscriptionType}
              placeholder="Please select"
            />
          </FormLayout.Group>
          {item.dataEntryType === "3" && (
            <FormLayout.Group>
              <TextField
                label="Minimum"
                value={item.minimumSlider}
                onChange={handleChangeMinimumSlider}
                type="number"
              />
              <TextField
                label="Maximum"
                value={item.maximumSlider}
                onChange={handleChangeMaximumlider}
                type="number"
              />
            </FormLayout.Group>
          )}
          <InlineError message={sliderInputsError} />
          {item.dataEntryType === "4" && (
            <FormLayout.Group>
              <TextField
                label="Price for yes answer"
                value={item.yesPrice}
                onChange={handleChangeYesPrice}
                type="number"
              />
              <TextField
                label="Price for no answer"
                value={item.noPrice}
                onChange={handleChangeNoPrice}
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
                  .delete(`products/${featureId}`)
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
    if (
      !item.name ||
      !item.title ||
      item.dataEntryType === "" ||
      (item.dataEntryType === "3" &&
        (!item.minimumSlider || !item.maximumSlider))
    ) {
      !item.name && setNameError("This field is required");
      !item.title && setTitleError("This field is required");
      item.dataEntryType === "" &&
        setDataEntryTypeError("Please select a type");
      item.dataEntryType === "3" &&
        (!item.minimumSlider || !item.maximumSlider) &&
        setSliderInputsError("Minimum and Maximum inputs are required");
    } else {
      setIsSaving(true);
      const bodyObj = {
        is_active: item.isActive ? 1 : 0,
        name: item.name,
        title: item.title,
        subtitle: item.description,
        data_entry_type: item.dataEntryType,
        subscription_type: item.subscriptionType,
        feature_id: featureId,
        answer: switchAnswer(),
        price: switchPrice(),
        ...(item.dataEntryType === "3" && { min_number: item.minimumSlider }),
        ...(item.dataEntryType === "3" && { max_number: item.maximumSlider }),
      };
      props.type === "add"
        ? axios
            .post(`subfeatures`, bodyObj)
            .then((result) => {
              navigate(`/admin/features/${featureId}/subfeatures`);
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`subfeatures/${subfeatureId}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditSubfeature;
