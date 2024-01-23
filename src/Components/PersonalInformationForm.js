import {
  FormLayout,
  Text,
  TextField,
  Select,
  DropZone,
  PageActions,
  Thumbnail,
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import SelectSearchable from "react-select";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { countryList } from "../countries";
const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

const PersonalInformationForm = () => {
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams();
  const [item, setItem] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: null,
    bloodType: "",
    gender: "",
    nationality: "",
    otherNationality: "",
    maritalStatus: "",
    profilePicture: "",
    linkedInLink: "",
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

  const handleChangeFatherName = (newValue) => {
    setItem({ ...item, fatherName: newValue });
  };

  const handleChangeMotherName = (newValue) => {
    setItem({ ...item, motherName: newValue });
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

  const optionsMaritalStatus = [
    { label: "Single", value: "1" },
    { label: "Married", value: "2" },
    { label: "Divorced", value: "3" },
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
  const handleSelectChangeOtherNationality = (newValue) => {
    setItem({ ...item, otherNationality: newValue });
  };
  const handleSelectChangeMaritalStatus = (newValue) => {
    setItem({ ...item, maritalStatus: newValue });
  };
  const handleChangeLinkedInLink = (newValue) => {
    setItem({ ...item, linkedInLink: newValue });
  };
  const handleChangeBio = (newValue) => {
    setItem({ ...item, bio: newValue });
  };

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setFiles(acceptedFiles); // Update files state with the new files
    },
    []
  );

  const sendImage = useCallback((files) => {
    const isImageType = validImageTypes.indexOf(files[0].type) >= 0;

    setImagePreview(
      isImageType
        ? window.URL.createObjectURL(files[0])
        : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
    );

    setItem((prevItem) => ({
      ...prevItem,
      profilePicture: isImageType ? window.URL.createObjectURL(files[0]) : "",
    }));
  }, []);

  const uploadedFiles = files.length > 0 && (
    <div alignment="center">
      <Thumbnail
        size="small"
        alt={files[0].name}
        source={
          validImageTypes.indexOf(files[0].type) >= 0
            ? window.URL.createObjectURL(files[0])
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {files[0].name} <Text>{files[0].size} bytes</Text>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";

    try {
      responseItem = await axios.get(`/employee-general-information/${id}`);
      console.log(responseItem.data.data);
      setItem({
        firstName: responseItem?.data?.data?.first_name
          ? responseItem?.data?.data?.first_name
          : "",
        middleName: responseItem?.data?.data?.middle_name
          ? responseItem?.data?.data?.middle_name
          : "",
        lastName: responseItem?.data?.data?.last_name
          ? responseItem?.data?.data?.last_name
          : "",
        displayName: responseItem?.data?.data?.display_name
          ? responseItem?.data?.data?.display_name
          : "",
        fatherName: responseItem?.data?.data?.father_name
          ? responseItem?.data?.data?.father_name
          : "",
        motherName: responseItem?.data?.data?.mother_name
          ? responseItem?.data?.data?.mother_name
          : "",
        dateOfBirth: responseItem?.data?.data?.date_of_birth
          ? responseItem?.data?.data?.date_of_birth
          : "",
        bloodType: responseItem?.data?.data?.blood_type
          ? responseItem?.data?.data?.blood_type
          : "",
        maritalStatus: responseItem?.data?.data?.marital_status
          ? responseItem?.data?.data?.marital_status
          : "",
        gender: responseItem?.data?.data?.gender
          ? responseItem?.data?.data?.gender
          : "",
        nationality: responseItem?.data?.data?.nationality
          ? responseItem?.data?.data?.nationality
          : "",
        otherNationality: responseItem?.data?.data?.other_nationality
          ? responseItem?.data?.data?.other_nationality
          : "",
        bio: responseItem?.data?.data?.bio ? responseItem?.data?.data?.bio : "",
        linkedInLink: responseItem?.data?.data?.linkedIn_profile
          ? responseItem?.data?.data?.linkedIn_profile
          : "",
        profilePicture: responseItem?.data?.data?.profile_picture
          ? responseItem?.data?.data?.profile_picture
          : "",

        isActive: responseItem?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
          value={item.fatherName}
          onChange={handleChangeFatherName}
          label="Father Name"
        />
        <TextField
          value={item.motherName}
          onChange={handleChangeMotherName}
          label="Mother Name"
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
          placeholder="Please select"
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <Select
          label="Marital Status"
          options={optionsMaritalStatus.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeMaritalStatus}
          value={item.maritalStatus}
          placeholder="Please select"
        />
        <Select
          label="Gender"
          options={optionsGender.map((item, index) => {
            return { label: item.label, value: item.value };
          })}
          onChange={handleSelectChangeGender}
          value={item.gender}
          placeholder="Please select"
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
        <FormLayout>
          <Text>Other Nationality</Text>
          <SelectSearchable
            options={countryList.map((item, index) => {
              return { label: item.name, value: item.name };
            })}
            onChange={handleSelectChangeOtherNationality}
            value={item.otherNationality}
            placeholder="Please select"
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </FormLayout>
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="Bio"
          value={item.bio}
          onChange={handleChangeBio}
          placeholder="Write a short bio"
          showCharacterCount
        />
        <TextField
          label="LinkedIn Profile Link"
          value={item.linkedInLink}
          onChange={handleChangeLinkedInLink}
        />
      </FormLayout.Group>

      <Text>Profile Picture</Text>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ float: "left" }}>
          <Thumbnail size="large" source={imagePreview || ""} />
        </div>
        <div style={{ width: "100%", marginLeft: "10px" }}>
          <DropZone
            accept=".png,.jpeg,.jpg,.svg,.json"
            allowMultiple={false}
            onDrop={handleDropZoneDrop}
            onDropAccepted={sendImage}
          >
            {uploadedFiles}
            {!files.length && <DropZone.FileUpload />}
          </DropZone>
        </div>
      </div>

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
      // const bodyObj = {
      //   first_name: item.firstName,
      //   middle_name: item.middleName,
      //   last_name: item.lastName,
      //   display_name: item.displayName,
      //   father_name: item.fatherName,
      //   mother_name: item.motherName,
      //   marital_status: item.maritalStatus,
      //   date_of_birth: item.dateOfBirth,
      //   blood_type: item.bloodType,
      //   gender: item.gender,
      //   nationality: item.nationality.value,
      //   other_nationality: item.otherNationality.value,
      //   profile_picture: item.profilePicture,
      //   linkedIn_profile: item.linkedInLink,
      //   employee_id: id,
      //   bio: item.bio,
      // };
      const formData = new FormData();

      formData.append("first_name", item.firstName);
      formData.append("middle_name", item.middleName);
      formData.append("last_name", item.lastName);
      formData.append("display_name", item.displayName);
      formData.append("father_name", item.fatherName);
      formData.append("mother_name", item.motherName);
      formData.append("marital_status", item.maritalStatus);
      formData.append("date_of_birth", item.dateOfBirth);
      formData.append("blood_type", item.bloodType);
      formData.append("gender", item.gender);
      formData.append("nationality", item.nationality.value);
      formData.append("other_nationality", item.otherNationality.value);
      formData.append("linkedIn_profile", item.linkedInLink);
      formData.append("employee_id", id);
      formData.append("bio", item.bio);
      formData.append("profile_picture", files[files.length - 1].name);
      console.log(files[files.length - 1]);

      axios
        .patch(`/employee-general-information/${id}`, formData)
        .then((result) => {
          console.log("general information updated");
        })
        .catch((err) => console.log(err));
    }
  }
};

export default PersonalInformationForm;
