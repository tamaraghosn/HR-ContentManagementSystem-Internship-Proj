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
  Frame,
  InlineError,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useRef } from "react";
import emptyListImage from "../../Assets/Images/emptyList.svg";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const Employees = () => {
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
  const handleAddUser = () => {
    navigate("/admin/users/new");
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
  const handleEdit = (id) => {
    navigate(`/admin/users/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [ts, availability, queryValue, page]);

  async function fetchData() {
    let responseUsers = "";
    let responseFeatures = [];

    try {
      responseUsers = await axios.get(
        `/users?per_page=${perPage}&page=${refBoolPage.current ? page : 1}${
          queryValue
            ? `&filter[${
                availability === "" ? "name" : availability
              }]=${queryValue}`
            : ""
        }`
      );
      setPageObject({
        ...pageObject,
        tableItems: responseUsers.data.data.data.map((item, index) => [
          item?.name && item.name,
          item.is_active ? (
            <Badge status="success">Active</Badge>
          ) : (
            <Badge status="info">Inactive</Badge>
          ),
          <ButtonGroup>
            <Button onClick={() => handleEdit(item.id)}>Edit</Button>
          </ButtonGroup>,
        ]),
        isLoading: false,
        isListEmpty: !responseUsers.data.data.data.length ? true : false,
        tableTotalPages: responseUsers.data.data.total,
      });
    } catch (error) {
      console.log(error);
    }

    // if (!featuresList.length)
    //   try {
    //     responseFeatures = await axios.get(`features`);
    //     setFeaturesList(
    //       responseFeatures.data.data.data.map((item, index) => {
    //         return {
    //           label: item.name,
    //           value: item.id,
    //         };
    //       })
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [toastContent, setToastContent] = useState(
    "This user has been successfully deleted"
  );

  const toastMarkup = active ? (
    <Toast content={toastContent} onDismiss={toggleActive} />
  ) : null;

  return (
    <Page
      title="Users"
      primaryAction={
        <Button primary onClick={handleAddUser}>
          Add User
        </Button>
      }
    >
      <Card>
        {loadingMarkup}

        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          onClearAll={handleFiltersClearAll}
        />

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

export default Employees;
