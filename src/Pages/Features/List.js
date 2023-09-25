import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  Card,
  Modal,
  Text,
  Spinner,
  Image,
  Loading,
  Button,
  DataTable,
  ButtonGroup,
  TextContainer,
  Toast,
  Checkbox,
  FormLayout,
  Filters,
  TextField,
  Badge,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useRef } from "react";
import emptyListImage from "../../Assets/Images/emptyList.svg";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  const addEditState = useRef("");
  const perPage = 100;
  const [ts, setTs] = useState("");
  const [availability, setAvailability] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageObject, setPageObject] = useState({
    isLoading: true,
    isSaving: false,
    tableItems: [],
    tableTotalPages: 0,
    isListEmpty: false,
  });
  const handleAddFeature = () => {
    addEditState.current = "add-feature";
    setItem({ ...item, name: "", isActive: true });
    setActiveAddEdit(true);
  };
  function handleFiltersQueryChange(queryValue) {
    refBoolPage.current = false;
    setQueryValue(queryValue);
  }
  function handleAvailabilityChange(availability) {
    setAvailability(availability);
  }
  const handleAvailabilityRemove = useCallback(() => setAvailability(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAvailabilityRemove();
    handleQueryValueRemove();
  }, [handleAvailabilityRemove, handleQueryValueRemove]);

  const filters = [
    //   {
    //     key: "availability",
    //     label: "Filter by",
    //     filter: (
    //       <ChoiceList
    //         title="Filter by"
    //         titleHidden
    //         choices={[{ label: "Name", value: "name" }]}
    //         selected={availability || []}
    //         onChange={handleAvailabilityChange}
    //       />
    //     ),
    //     shortcut: true,
    //   },
  ];

  const appliedFilters = [];
  if (!isEmpty(availability)) {
    const key = "availability";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, availability),
      onRemove: handleAvailabilityRemove,
    });
  }
  const loadingMarkup = pageObject.isLoading ? <Loading /> : null;
  const emtyState = pageObject.isListEmpty ? (
    <div
      style={{
        display: "flex",
        justifyContent: "middle",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "25%" }}>
        <Image src={emptyListImage}></Image>
      </div>
      <div className="mb-3">
        <Text variant="headingLg" as="h5" color="subdued">
          No results found
        </Text>
      </div>
      <br />
    </div>
  ) : (
    pageObject.isLoading && (
      <div className="spinnerContainer">
        <div className="vertical-center">
          <Spinner size="large" />
        </div>
      </div>
    )
  );
  const refBoolPage = useRef(true);
  const handleChangePage = (event, value) => {
    refBoolPage.current = true;
    setPage(value);
  };
  useEffect(() => {
    getData();
  }, [ts, availability, queryValue, page]);
  const getData = () => {
    axios
      .get(
        `/features?per_page=${perPage}&page=${refBoolPage.current ? page : 1}${
          queryValue
            ? `&filter[${
                availability === "" ? "name" : availability
              }]=${queryValue}`
            : ""
        }`
      )
      .then((result) => {
        setPageObject({
          ...pageObject,
          tableItems: result.data.data.data.map((item, index) => [
            item?.name && item.name,
            item.is_active ? (
              <Badge status="success">Active</Badge>
            ) : (
              <Badge status="info">Inactive</Badge>
            ),
            <ButtonGroup>
              <Button primary onClick={() => handleEditSubfeatures(item.id)}>
                Subfeatures
              </Button>
              <Button onClick={() => handleEdit(item)}>Edit</Button>
              <Button destructive onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </ButtonGroup>,
          ]),
          isLoading: false,
          isListEmpty: !result.data.data.data.length ? true : false,
          tableTotalPages: result.data.data.total,
        });
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
  };
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [toastContent, setToastContent] = useState(
    "This feature has been successfully deleted"
  );

  const toastMarkup = active ? (
    <Toast content={toastContent} onDismiss={toggleActive} />
  ) : null;
  const clickedItem = useRef(null);
  const [activeDelete, setActiveDelete] = useState(false);
  const handleChangeModalDelete = useCallback((activeDelete) => {
    setActiveDelete(!activeDelete);
  }, []);
  const handleDelete = (id) => {
    clickedItem.current = id;
    setActiveDelete(true);
  };
  const handleEdit = (item) => {
    console.log(item);
    clickedItem.current = item.id;
    addEditState.current = "edit-feature";
    setItem({
      ...item,
      name: item.name,
      isActive: item?.is_active ? true : false,
    });
    setActiveAddEdit(true);
  };
  const handleEditSubfeatures = (id) => {
    navigate(`/admin/features/${id}/subfeatures`);
  };
  const handleYesDelete = () => {
    setPageObject({ ...pageObject, isSaving: true });
    const form_data = new FormData();
    form_data.append("is_active", 0);
    axios
      .delete(`features/${clickedItem.current}`, form_data)
      .then((result) => {
        setPageObject({ ...pageObject, isSaving: false });
        setToastContent("This feature has been successfully deleted");
        toggleActive();
        setActiveDelete(!activeDelete);
        setTs(+new Date());
      })
      .catch((err) => console.log(err));
  };

  const [activeAddEdit, setActiveAddEdit] = useState(false);
  const handleChangeModalAddEdit = () => {
    setActiveAddEdit(false);
  };
  const handleSubmitAddEdit = () => {
    if (!item.name) {
      setNameError("This field is required");
    } else {
      setPageObject({ ...pageObject, isSaving: true });
      const bodyObj = { is_active: item.isActive ? 1 : 0, name: item.name };
      addEditState.current === "add-feature"
        ? axios
            .post(`features`, bodyObj)
            .then((result) => {
              setPageObject({ ...pageObject, isSaving: false });
              setToastContent(`This feature has been successfully added`);
              toggleActive();
              setActiveAddEdit(false);
              setTs(+new Date());
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`features/${clickedItem.current}`, bodyObj)
            .then((result) => {
              setPageObject({ ...pageObject, isSaving: false });
              setToastContent(
                addEditState.current === "add-feature"
                  ? `This feature has been successfully added`
                  : "Changes have been saved successfully"
              );
              toggleActive();
              setActiveAddEdit(false);
              setTs(+new Date());
            })
            .catch((err) => console.log(err));
    }
    // if (!featureNameValue) {
    //   setFeatureNameError("This field is required");
    // } else {
    //   setIsSaving(true);
    //   const form_data = new FormData();
    //   form_data.append("name", featureNameValue);
    //   form_data.append("slug", featureSlugValue);
    //   form_data.append("is_default", checkedIsDefault ? 1 : 0);
    //   addEditState.current === "edit-feature" &&
    //     form_data.append("_method", "PATCH");
    //   let url =
    //     addEditState.current === "add-feature"
    //       ? `/features`
    //       : `/features/${clickedItem.current.id}`;
    // axios
    //   .post(url, form_data)
    //   .then((result) => {
    //     setToastContent(
    //       addEditState.current === "add-feature"
    //         ? `This feature has been successfully added`
    //         : "Changes have been saved successfully"
    //     );
    //     toggleActive();
    //     setIsSaving(false);
    //     setActiveAddEdit(false);
    //     setTs(+new Date());
    //   })
    //   .catch((err) => console.log(err));
    // }
  };
  const [item, setItem] = useState({
    name: "",
    isActive: true,
  });
  const handleChangeName = (newValue) => {
    setItem({ ...item, name: newValue });
    setNameError("");
  };
  const handleChangeIsActive = (newValue) => {
    setItem({ ...item, isActive: newValue });
  };
  const [nameError, setNameError] = useState("");
  return (
    <Page
      title="Features"
      primaryAction={
        <Button primary onClick={handleAddFeature}>
          Add Feature
        </Button>
      }
    >
      <Card>
        {loadingMarkup}
        <Card.Section>
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={appliedFilters}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleFiltersClearAll}
          />
        </Card.Section>
        <DataTable
          columnContentTypes={["text", "text", "text", "text"]}
          headings={[
            <Text variant="bodyMd" as="p" fontWeight="medium">
              Name
            </Text>,
            <Text variant="bodyMd" as="p" fontWeight="medium"></Text>,
            <Text variant="bodyMd" as="p" fontWeight="medium"></Text>,
          ]}
          rows={pageObject.tableItems}
          verticalAlign="middle"
          increasedTableDensity
          footerContent={
            pageObject.tableItems?.length &&
            `Showing ${pageObject.tableItems.length} of ${pageObject.tableTotalPages} results`
          }
        />
        {emtyState}
        {Math.ceil(pageObject.tableTotalPages / perPage) >= 2 && (
          <div
            style={{
              paddingTop: "10px",
              textAlign: "center",
              paddingBottom: "10px",
            }}
          >
            <Pagination
              count={Math.ceil(pageObject.tableTotalPages / perPage)}
              page={page}
              onChange={handleChangePage}
              size="large"
            />
          </div>
        )}

        <Modal
          open={activeDelete}
          onClose={handleChangeModalDelete}
          title="Delete Feature"
          primaryAction={{
            content: "Yes",
            onAction: handleYesDelete,
            loading: pageObject.isSaving,
          }}
          secondaryActions={[
            {
              content: "No",
              loading: pageObject.isSaving,
              onAction: handleChangeModalDelete,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>Are you sure you want to delete this feature?</p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeAddEdit}
          onClose={handleChangeModalAddEdit}
          title={`${
            addEditState.current === "add-feature" ? "Add" : "Edit"
          } Feature`}
          primaryAction={{
            content: "Submit",
            onAction: handleSubmitAddEdit,
            loading: pageObject.isSaving,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              loading: pageObject.isSaving,
              onAction: handleChangeModalAddEdit,
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Name"
                value={item.name}
                onChange={handleChangeName}
                error={nameError}
              />

              <Checkbox
                label="Is Active"
                checked={item.isActive}
                onChange={handleChangeIsActive}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
        {toastMarkup}
      </Card>
    </Page>
  );
  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      case "availability":
        return `Filter by ${value}`;
      default:
        return value;
    }
  }
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};

export default Features;
