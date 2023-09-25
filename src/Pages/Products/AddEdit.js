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
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();
const AddEditProduct = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    name: "",
    isActive: true,
    features: [],
    discounts: [],
  });
  const handleChangeName = (newValue) => {
    setItem({ ...item, name: newValue });
    setNameError("");
  };
  const handleChangeIsActive = (newValue) => {
    setItem({ ...item, isActive: newValue });
  };
  const [nameError, setNameError] = useState("");
  const [featuresList, setFeaturesList] = useState([]);
  const [featuresError, setFeaturesError] = useState("");
  const [discountsList, setDiscountsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseFeatures = [];
    let responseItem = "";
    let responseDiscounts = [];
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`products/${id}`);
        setItem({
          name: responseItem?.data?.data?.name
            ? responseItem?.data?.data?.name
            : "",
          isActive: responseItem?.data?.data?.is_active ? true : false,
          features: responseItem?.data?.data?.features.map((item, index) => {
            return {
              label: item.name,
              value: String(item.id),
              key: String(item.id),
            };
          }),
          discounts: responseItem?.data?.data?.discounts.map((item, index) => {
            return {
              label: item.name,
              value: String(item.id),
              key: String(item.id),
            };
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log(
      "test=",
      responseItem?.data?.data?.features.map((item) => item.id)
    );
    try {
      responseFeatures = await axios.get(`features`);
      console.log(responseFeatures.data.data);
      setFeaturesList(
        responseFeatures.data.data.data
          .filter((item) => {
            return !responseItem?.data?.data?.features
              .map((item) => item.id)
              .includes(item.id);
          })
          .map((item, index) => {
            return {
              label: item.name,
              value: item.id,
            };
          })
      );
    } catch (error) {
      console.log(error);
    }
    try {
      responseDiscounts = await axios.get(`discounts`);
      setDiscountsList(
        responseDiscounts.data.data.data
          .filter((item) => {
            return !responseItem?.data?.data?.discounts
              .map((item) => item.id)
              .includes(item.id);
          })
          .map((item, index) => {
            return {
              label: item.name,
              value: item.id,
            };
          })
      );
    } catch (error) {
      console.log(error);
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
      title={`${props.type === "add" ? "Add" : "Edit"} Product`}
      breadcrumbs={[{ onAction: () => navigate("/admin/products") }]}
      narrowWidth
    >
      {isSaving ? <Loading /> : null}
      <Card sectioned>
        <FormLayout>
          <Text as="p" fontWeight="regular">
            Name
          </Text>
          <TextField
            value={item.name}
            onChange={handleChangeName}
            error={nameError}
          />
          <Text as="p" fontWeight="regular">
            Features
          </Text>

          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={item.features}
            isMulti
            options={featuresList}
            value={item.features}
            onChange={(newValue) => {
              setItem({ ...item, features: newValue });
            }}
            // hideSelectedOptions={false}

            // styles={customStyles}
          />
          <Text as="p" fontWeight="regular">
            Discounts
          </Text>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={item.discounts}
            isMulti
            options={discountsList}
            value={item.discounts}
            onChange={(newValue) => {
              setItem({ ...item, discounts: newValue });
            }}
            // hideSelectedOptions={false}

            // styles={customStyles}
          />

          <InlineError message={featuresError} />

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
    if (!item.name || !item.features.length) {
      !item.name && setNameError("This field is required");
      !item.features.length && setFeaturesError("Please select features");
    } else {
      setIsSaving(true);
      const bodyObj = {
        is_active: item.isActive ? 1 : 0,
        name: item.name,
        feature_ids: item.features.map((item) => item.value),
        discount_ids: item.discounts.map((item) => item.value),
      };
      props.type === "add"
        ? axios
            .post(`products`, bodyObj)
            .then((result) => {
              navigate("/admin/products");
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`products/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditProduct;
