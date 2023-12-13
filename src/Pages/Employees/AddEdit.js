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

const AddEditEmployee = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(true);
  const [item, setItem] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    workEmailAddress: "",
    title: "",
    joiningDate: null,
    employmentEndDate: null,
    status: false,
    // isInactive: false,
    employmentType: "",
    probationPeriod: "",
    department: " ",
    jobTitle: " ",
    lineManager: " ",
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

  const handleChangePhoneNumber = (newValue) => {
    setItem({ ...item, phoneNumber: newValue });
    setPhoneNumberError("");
  };
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChangeWorkEmailAddress = (newValue) => {
    setItem({ ...item, workEmailAddress: newValue });
    setWorkEmailAddressError("");
  };
  const [workEmailAddressError, setWorkEmailAddressError] = useState("");

  const handleSelectChangeGender = (newValue) => {
    setItem({ ...item, gender: newValue });
  };

  const optionsGender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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

  const handleChangeJoiningDate = (date) => {
    setItem({ ...item, joiningDate: date });
    setJoiningDateError("");
  };
  const [joiningDateError, setJoiningDateError] = useState("");

  const handleChangeEmploymentEndDate = (date) => {
    setItem({ ...item, employmentEndDate: date });
    setItem({ ...item, isInactive: true });
  };

  const handleChangeActiveEmploymentStatus = (checked) => {
    setItem({ ...item, status: checked });
  };

  // const handleChangeInactiveEmploymentStatus = (checked) => {
  //   setItem({ ...item, isInactive: checked });
  // };

  const [optionsEmploymentType, setOptionsEmploymentType] = useState([]);
  const optionsJobTitle = [{ label: "Frontend", value: "front-end" }];

  const handleSelectChangeEmploymentType = (newValue) => {
    setItem({ ...item, employmentType: newValue });
    setEmploymentTypeError("");
  };

  const [employmentTypeError, setEmploymentTypeError] = useState("");

  const handleChangeProbationPeriod = (newValue) => {
    setItem({ ...item, probationPeriod: newValue });
  };

  const handleSelectChangeDepartment = (newValue) => {
    setItem({ ...item, department: newValue });
  };

  const handleSelectChangeJobTitle = (newValue) => {
    setItem({ ...item, jobTitle: newValue });
    setJobTitleError("");
  };
  const [jobTitleError, setJobTitleError] = useState("");

  const handleSelectChangeLineManager = (newValue) => {
    setItem({ ...item, lineManager: newValue });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    let responseEmploymentTypes = "";
    try {
      responseEmploymentTypes = await axios.get(`/employment-types`);
      setOptionsEmploymentType(
        responseEmploymentTypes.data.data.data.map((item, index) => {
          return {
            label: item.name,
            value: String(item.id),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
    if (props.type === "edit") {
      try {
        responseItem = await axios.get(`/employees/${id}`);
        setItem({
          firstName: responseItem?.data?.data?.firstName
            ? responseItem?.data?.data?.firstName
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
      title={`${props.type === "add" ? "Add" : "Edit"} Employee`}
      // backAction={[{ onAction: () => navigate("/admin/users") }]}
      backAction={{ onAction: () => navigate("/admin/employees") }}
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
            <TextField
              value={item.phoneNumber}
              onChange={handleChangePhoneNumber}
              error={phoneNumberError}
              label="Phone Number"
              type="email"
              requiredIndicator
            />

            <TextField
              value={item.workEmailAddress}
              onChange={handleChangeWorkEmailAddress}
              error={workEmailAddressError}
              label="Work Email Address"
              type="email"
              requiredIndicator
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Select
              label="Gender"
              options={optionsGender.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeGender}
              value={item.gender}
              placeholder="Please choose an option"
            />

            <Select
              label="Title"
              options={optionsTitle.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeTitle}
              value={item.title}
              placeholder="Please choose an option"
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <TextField
              label="Joining/Starting Date"
              value={item.joiningDate}
              type="date"
              onChange={handleChangeJoiningDate}
              placeholder="MM/DD/YYYY"
              error={joiningDateError}
              requiredIndicator
            />

            <TextField
              label="Employment End Date"
              type="date"
              value={item.employmentEndDate}
              onChange={handleChangeEmploymentEndDate}
              placeholder="MM/DD/YYYY"
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <FormLayout>
              <Text>Employment Type</Text>
              <SelectSearchable
                options={optionsEmploymentType}
                onChange={handleSelectChangeEmploymentType}
                value={item.employmentType}
                placeholder="Please select"
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </FormLayout>
            {/* <Select
              label="Employment Type"
              options={optionsEmploymentType.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              onChange={handleSelectChangeEmploymentType}
              value={item.employmentType}
              placeholder="Please choose an option"
            /> */}
            <TextField
              value={item.probationPeriod}
              onChange={handleChangeProbationPeriod}
              label="Probation Period"
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <Select
              label="Department"
              onChange={handleSelectChangeDepartment}
              value={item.department}
              placeholder="Please choose an option"
              r
            />
            <Select
              label="Job Title"
              onChange={handleSelectChangeJobTitle}
              options={optionsJobTitle.map((item, index) => {
                return { label: item.label, value: item.value };
              })}
              error={jobTitleError}
              value={item.jobTitle}
              placeholder="Please choose an option"
              requiredIndicator
            />
          </FormLayout.Group>
          <Select
            label="Line manager/supervisor"
            onChange={handleSelectChangeLineManager}
            value={item.lineManager}
          />

          <Text>Employment Status</Text>
          <FormLayout.Group>
            <Checkbox
              label="Active"
              checked={item.status}
              onChange={handleChangeActiveEmploymentStatus}
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
                  .delete(`employees/${id}`)
                  .then((result) => {
                    navigate("/admin/employees");
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
      !item.phoneNumber ||
      !item.lastName ||
      !item.workEmailAddress ||
      !item.joiningDate ||
      !item.jobTitle
    ) {
      !item.firstName && setFirstNameError("This field is required");
      !item.lastName && setLastNameError("This field is required");
      !item.phoneNumber && setPhoneNumberError("This field is required");
      !item.workEmailAddress &&
        setWorkEmailAddressError("This field is required");
      !item.joiningDate && setJoiningDateError("This field is required");
      !item.jobTitle && setJobTitleError("This field is required");
    } else {
      setIsSaving(true);
      const bodyObj = {
        title: item.title,
        first_name: item.firstName,
        joining_date: item.joiningDate,
        employment_end_date: item.employmentEndDate,
        employment_status: item.status,
        probation_period: item.probationPeriod,
        work_email_address: item.workEmailAddress,
        employment_type_id: item.employmentType.value,
        job_title_id: item.jobTitle,
        department_id: item.department,
        line_manager_id: item.lineManager,
      };
      props.type === "add"
        ? axios
            .post(`/employees`, bodyObj)
            .then((result) => {
              navigate("/admin/employees");
            })
            .catch((err) => console.log(err))
        : axios
            .patch(`/employees/${id}`, bodyObj)
            .then((result) => {
              toggleActive();
              setIsSaving(false);
            })
            .catch((err) => console.log(err));
    }
  }
};

export default AddEditEmployee;
