import {
  FormLayout,
  Text,
  TextField,
  Select,
  DropZone,
  PageActions,
  Card,
  Thumbnail,
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

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const [profilePictureFiles, setProfilePictureFiles] = useState([]);
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [portfolioPreview, setPortfolioPreview] = useState(null);

  const handleProfilePictureDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setProfilePictureFiles(acceptedFiles); // Update files state with the new files
    },
    []
  );
  const handlePortfolioDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      setPortfolioFiles(acceptedFiles); // Update files state with the new files
    },
    []
  );
  const sendProfilePicture = useCallback((profilePictureFiles) => {
    const isImageType =
      validImageTypes.indexOf(profilePictureFiles[0].type) >= 0;

    setProfilePicturePreview(
      isImageType
        ? window.URL.createObjectURL(profilePictureFiles[0])
        : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
    );

    setItem((prevItem) => ({
      ...prevItem,
      profilePicture: isImageType
        ? window.URL.createObjectURL(profilePictureFiles[0])
        : "",
    }));
  }, []);

  const uploadedProfilePictureFiles = profilePictureFiles.length > 0 && (
    <div alignment="center">
      <Thumbnail
        size="small"
        alt={profilePictureFiles[0].name}
        source={
          validImageTypes.indexOf(profilePictureFiles[0].type) >= 0
            ? window.URL.createObjectURL(profilePictureFiles[0])
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {profilePictureFiles[0].name}{" "}
        <Text>{profilePictureFiles[0].size} bytes</Text>
      </div>
    </div>
  );

  const sendResumePortfolio = useCallback((profilePictureFiles) => {
    const isImageType =
      validImageTypes.indexOf(profilePictureFiles[0].type) >= 0;

    setPortfolioPreview(
      isImageType
        ? window.URL.createObjectURL(profilePictureFiles[0])
        : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
    );

    setItem((prevItem) => ({
      ...prevItem,
      profilePicture: isImageType
        ? window.URL.createObjectURL(profilePictureFiles[0])
        : "",
    }));
  }, []);

  const uploadedPortfolioFiles = portfolioFiles.length > 0 && (
    <div alignment="center">
      <Thumbnail
        size="small"
        alt={portfolioFiles[0].name}
        source={
          validImageTypes.indexOf(portfolioFiles[0].type) >= 0
            ? window.URL.createObjectURL(portfolioFiles[0])
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {portfolioFiles[0].name} <Text>{portfolioFiles[0].size} bytes</Text>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";

    try {
      responseItem = await axios.get(`/intern-general-information/${id}`);
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
        dateOfBirth: responseItem?.data?.data?.date_of_birth
          ? responseItem?.data?.data?.date_of_birth
          : "",
        bloodType: responseItem?.data?.data?.blood_type
          ? String(responseItem?.data?.data?.blood_type)
          : "",
        gender: responseItem?.data?.data?.gender
          ? String(responseItem?.data?.data?.gender)
          : "",
        nationality: responseItem?.data?.data?.nationality
          ? responseItem?.data?.data?.nationality
          : "",
        bio: responseItem?.data?.data?.bio ? responseItem?.data?.data?.bio : "",
        resumePortfolio: responseItem?.data?.data?.resume_portfolio
          ? responseItem?.data?.data?.resume_portfolio
          : "",
        profilePicturePreview: responseItem?.data?.data?.profile_picture
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
          placeholder="Please select"
        />
        <TextField
          label="Bio"
          value={item.bio}
          onChange={handleChangeBio}
          placeholder="Write a short bio"
          showCharacterCount
        />
      </FormLayout.Group>

      <Text>Resume/Portfolio</Text>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ float: "left" }}>
          <Thumbnail size="large" source={portfolioPreview || ""} />
        </div>
        <div style={{ width: "100%", marginLeft: "10px" }}>
          <DropZone
            accept=".png,.jpeg,.jpg,.svg,.json"
            allowMultiple={false}
            onDrop={handlePortfolioDrop}
            onDropAccepted={sendResumePortfolio}
          >
            {uploadedPortfolioFiles}
            {!portfolioFiles.length && <DropZone.FileUpload />}
          </DropZone>
        </div>
      </div>

      <Text>Profile Picture</Text>
      <FormLayout.Group>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div style={{ float: "left" }}>
            <Thumbnail size="large" source={profilePicturePreview || ""} />
          </div>
          <div style={{ width: "100%", marginLeft: "10px" }}>
            <DropZone
              accept=".png,.jpeg,.jpg,.svg,.json"
              allowMultiple={false}
              onDrop={handleProfilePictureDrop}
              onDropAccepted={sendProfilePicture}
            >
              {uploadedProfilePictureFiles}
              {!profilePictureFiles.length && <DropZone.FileUpload />}
            </DropZone>
          </div>
        </div>
      </FormLayout.Group>
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
      //   date_of_birth: item.dateOfBirth,
      //   phone_number: "",
      //   blood_type: item.bloodType,
      //   gender: item.gender,
      //   nationality: item.nationality.value,
      //   profile_picture: profilePictureFiles[profilePictureFiles.length - 1],
      //   resume_portfolio: portfolioFiles[portfolioFiles.length - 1],
      //   bio: item.bio,
      // };
      const formData = new FormData();

      formData.append("intern_id", id);
      formData.append("first_name", item.firstName);
      formData.append("middle_name", item.middleName);
      formData.append("last_name", item.lastName);
      formData.append("display_name", item.displayName);
      formData.append("date_of_birth", item.dateOfBirth);
      formData.append("phone_number", "");
      formData.append("blood_type", item.bloodType);
      formData.append("gender", item.gender);
      formData.append("nationality", item.nationality.value);
      formData.append(
        "profile_picture",
        profilePictureFiles[profilePictureFiles.length - 1]
      );
      formData.append(
        "resume_portfolio",
        portfolioFiles[portfolioFiles.length - 1]
      );
      formData.append("bio", item.bio);
      formData.append("_method", "PATCH");

      axios
        .post(`/intern-general-information/${id}`, formData)
        .then((result) => {
          console.log("general information updated");
        })
        .catch((err) => console.log(err));
    }
  }
};

export default PersonalInformationForm;
