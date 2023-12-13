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
  ChoiceList,
} from "@shopify/polaris";
import axios from "../../Assets/Lib/axios";
import { useRef } from "react";
import emptyListImage from "../../Assets/Images/emptyList.svg";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Pagination from "@mui/material/Pagination";

const animatedComponents = makeAnimated();
const EmploymentTypes = () => {
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
  const handleAddEmploymentType = () => {
    navigate("/admin/employment-types/new");
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
    {
      key: "availability",
      label: "Filter by",
      filter: (
        <ChoiceList
          title="Filter by"
          titleHidden
          choices={[{ label: "Name", value: "name" }]}
          selected={availability || []}
          onChange={handleAvailabilityChange}
        />
      ),
      shortcut: false,
    },
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
        <Text variant="bodyLg" as="p" tone="subdued">
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
    navigate(`/admin/employment-types/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [ts, availability, queryValue, page]);

  async function fetchData() {
    let responseEmploymentTypes = "";
    let responseFeatures = [];

    try {
      responseEmploymentTypes = await axios.get(
        `/employment-types?per_page=${perPage}&page=${
          refBoolPage.current ? page : 1
        }${
          queryValue
            ? `&filter[${
                availability === "" ? "name" : availability
              }]=${queryValue}`
            : ""
        }`
      );
      setPageObject({
        ...pageObject,
        tableItems: responseEmploymentTypes.data.data.data.map(
          (item, index) => [
            item?.name ? item?.name : "-",

            <ButtonGroup>
              <Button onClick={() => handleEdit(item.id)}>Edit</Button>
            </ButtonGroup>,
          ]
        ),
        isLoading: false,
        isListEmpty: !responseEmploymentTypes.data.data.data.length
          ? true
          : false,
        tableTotalPages: responseEmploymentTypes.data.data.total,
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
    "This Employment Type has been successfully deleted"
  );

  const toastMarkup = active ? (
    <Toast content={toastContent} onDismiss={toggleActive} />
  ) : null;

  return (
    <Page
      title="Employment Type"
      primaryAction={
        <Button variant="primary" onClick={handleAddEmploymentType}>
          Add Employment Type
        </Button>
      }
    >
      <Card padding="0">
        {loadingMarkup}

        <Filters
          queryValue={queryValue}
          queryPlaceholder="Search..."
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
              variant="outlined"
              count={Math.ceil(pageObject.tableTotalPages / perPage)}
              page={page}
              onChange={handleChangePage}
            />
            {/* <Pagination
              count={Math.ceil(pageObject.tableTotalPages / perPage)}
              page={page}
              onChange={handleChangePage}
              size="large"
            /> */}
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

export default EmploymentTypes;
