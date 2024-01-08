import {
  FormLayout,
  Text,
  TextField,
  Select,
  DropZone,
  Button,
  Page,
  PageActions,
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import SelectSearchable from "react-select";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { countryList } from "../countries";

const PersonalInformationForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    dateOfBirth: null,
    bloodType: "",
    gender: "",
    nationality: "",
    profilePicture: "",
    resumePortfolio: "",
    bio: "",
  });

  const handleChangeFirstName = (newValue) => {
    setItem({ ...item, firstName: newValue });
    setFirstNameError("");
  };
  const [firstNameError, setFirstNameError] = useState("");

  const handleChangeMiddleName = (newValue) => {
    setItem({ ...item, middleName: newValue });
  };

  const handleChangeLastName = (newValue) => {
    setItem({ ...item, lastName: newValue });
    setLastNameError("");
  };
  const [lastNameError, setLastNameError] = useState("");

  const handleChangeDisplayName = (newValue) => {
    setItem({ ...item, displayName: newValue });
  };

  const handleChangeDateOfBirth = (date) => {
    setItem({ ...item, dateOfBirth: date });
  };

  const handleSelectChangeBloodType = (newValue) => {
    setItem({ ...item, bloodType: newValue });
  };
  const optionsBloodType = [
    { label: "A+", value: "5" },
    { label: "A-", value: "6" },
    { label: "B+", value: "3" },
    { label: "B-", value: "4" },
    { label: "O+", value: "1" },
    { label: "O-", value: "2" },
    { label: "AB+", value: "7" },
    { label: "AB-", value: "8" },
  ];

  const handleSelectChangeGender = (newValue) => {
    setItem({ ...item, gender: newValue });
  };

  const optionsGender = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];

  const handleSelectChangeNationality = (newValue) => {
    setItem({ ...item, nationality: newValue });
  };

  const handleChangeBio = (newValue) => {
    setItem({ ...item, bio: newValue });
  };
  const handleDropProfilePicture = (file) => {
    // Check if the file object is defined and has a type property
    if (file && file.type && file.type.startsWith("image/")) {
      setItem({ ...item, profilePicture: file });
    } else {
      // Handle the case where the file is undefined or does not have a type property
      console.error("Invalid file format for the profile picture.");
      // You may also set an error state to display a message to the user
    }
  };
  const handleDropResumePortfolio = (file) => {
    setItem({ ...item, resumePortfolio: file });
  };

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        PERSONAL INFORMATION
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
          value={item.middleName}
          onChange={handleChangeMiddleName}
          label="Middle Name"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          value={item.lastName}
          onChange={handleChangeLastName}
          error={lastNameError}
          label="Last Name"
          requiredIndicator
        />
        <TextField
          value={item.displayName}
          onChange={handleChangeDisplayName}
          label="Display Name"
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="Date Of Birth"
          value={item.dateOfBirth}
          type="date"
          onChange={handleChangeDateOfBirth}
          placeholder="MM/DD/YYYY"
        />
        <Select
          label="Blood Type"
          options={optionsBloodType.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeBloodType}
          value={item.bloodType}
          placeholder="Please choose an option"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <Text>Nationality</Text>
          <SelectSearchable
            options={countryList.map((item, index) => {
              return { label: item.name, value: item.name };
            })}
            onChange={handleSelectChangeNationality}
            value={item.nationality}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
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
        <TextField
          label="Bio"
          value={item.bio}
          onChange={handleChangeBio}
          placeholder="Write a short bio"
          showCharacterCount
        />
      </FormLayout.Group>

      <DropZone
        label="Profile Picture"
        type="image"
        onDrop={handleDropProfilePicture}
        value={item.profilePicture}
      ></DropZone>

      <DropZone
        label="Resume/Portfolio"
        type="image"
        onDrop={handleDropResumePortfolio}
        value={item.resumePortfolio}
      ></DropZone>
      <PageActions
        primaryAction={{
          content: "Save",
          onClick: handleSave,
        }}
      ></PageActions>
    </FormLayout>
  );

  function handleSave() {
    if (!item.firstName || !item.lastName) {
      !item.firstName && setFirstNameError("This field is required");
      !item.lastName && setLastNameError("This field is required");
    } else {
      const bodyObj = {
        first_name: item.firstName,
        middle_name: item.middleName,
        last_name: item.lastName,
        display_name: item.displayName,
        email: item.email,
        date_of_birth: item.dateOfBirth,
        blood_type: item.bloodType,
        gender: item.gender,
        nationality: item.nationality.value,
        profile_picture: item.profilePicture,
        // resume/portfolio: item.resumePortfolio,
      };

      axios
        .patch(`/employee-general-informations/${id}`, bodyObj)
        .then((result) => {
          // console.log(result);
          console.log("general information updated");
        })
        .catch((err) => console.log(err));
    }
  }
};

export default PersonalInformationForm;
