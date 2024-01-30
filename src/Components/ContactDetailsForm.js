import {
  FormLayout,
  Text,
  TextField,
  DropZone,
  PageActions,
  Thumbnail,
} from "@shopify/polaris";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import { countryList } from "../countries";
import SelectSearchable from "react-select";
const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

const ContactDetailsForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    workMobile: "",
    workEmail: "",
    personalMobile: "",
    residenceAddress: "",
    residencePhone: "",
    emergencyCountry: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyRelation: "",
    emergencyPhoneContact: "",
    identificationCountry: "",
    idDocumentsPassport: "",
  });
  const handleChangeWorkMobile = (newValue) => {
    setItem({ ...item, workMobile: newValue });
  };
  const handleChangeWorkEmail = (newValue) => {
    setItem({ ...item, workEmail: newValue });
  };
  const handleChangePersonalMobile = (newValue) => {
    setItem({ ...item, personalMobile: newValue });
  };

  const handleChangeResidenceAddress = (newValue) => {
    setItem({ ...item, residenceAddress: newValue });
  };
  const handleChangeResidencePhone = (newValue) => {
    setItem({ ...item, residencePhone: newValue });
  };
  const handleSelectChangeCountry = (newValue) => {
    setItem({ ...item, emergencyCountry: newValue });
  };
  const handleChangeFirstName = (newValue) => {
    setItem({ ...item, emergencyFirstName: newValue });
  };
  const handleChangeLastName = (newValue) => {
    setItem({ ...item, emergencyLastName: newValue });
  };
  const handleChangeRelationship = (newValue) => {
    setItem({ ...item, emergencyRelation: newValue });
  };
  const handleChangeEmergencyPhoneContact = (newValue) => {
    setItem({ ...item, emergencyPhoneContact: newValue });
  };
  const handleSelectChangeIdentificationCountry = (newValue) => {
    setItem({ ...item, identificationCountry: newValue });
  };

  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

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
      idDocumentsPassport: isImageType
        ? window.URL.createObjectURL(files[0])
        : "",
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
    let responseItem1 = "";

    try {
      responseItem1 = await axios.get(`/contact-details/${id}`);
      console.log(responseItem1.data.data);
      setItem({
        workMobile: responseItem1?.data?.data?.work_mobile
          ? responseItem1?.data?.data?.work_mobile
          : "",
        workEmail: responseItem1?.data?.data?.work_email
          ? responseItem1?.data?.data?.work_email
          : "",
        personalMobile: responseItem1?.data?.data?.personal_mobile
          ? responseItem1?.data?.data?.personal_mobile
          : "",
        residential_address: responseItem1?.data?.data?.residential_address
          ? responseItem1?.data?.data?.residential_address
          : "",
        residencePhone: responseItem1?.data?.data?.residential_phone
          ? responseItem1?.data?.data?.residential_phone
          : "",
        emergencyFirstName: responseItem1?.data?.data
          ?.primary_emergency_contact_first_name
          ? responseItem1?.data?.data?.primary_emergency_contact_first_name
          : "",
        emergencyLastName: responseItem1?.data?.data
          ?.primary_emergency_contact_last_name
          ? responseItem1?.data?.data?.primary_emergency_contact_last_name
          : "",
        primary_emergency_contact_country: responseItem1?.data?.data
          ?.primary_emergency_contact_country
          ? responseItem1?.data?.data?.primary_emergency_contact_country
          : "",
        emergencyRelation: responseItem1?.data?.data
          ?.primary_emergency_contact_relation
          ? responseItem1?.data?.data?.primary_emergency_contact_relation
          : "",
        emergencyPhoneContact: responseItem1?.data?.data
          ?.primary_emergency_contact_phone_number
          ? responseItem1?.data?.data?.primary_emergency_contact_phone_number
          : "",
        identificationCountry: responseItem1?.data?.data?.country
          ? responseItem1?.data?.data?.country
          : "",
        idDocumentsPassport: responseItem1?.data?.data?.document
          ? responseItem1?.data?.data?.document
          : "",
        isActive: responseItem1?.data?.data?.is_active ? true : false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        CONTACT DETAILS
      </Text>
      <FormLayout.Group>
        <TextField
          label="Work Mobile"
          value={item.workMobile}
          onChange={handleChangeWorkMobile}
        />
        <TextField
          label="Work Email"
          value={item.workEmail}
          type="email"
          onChange={handleChangeWorkEmail}
        />
      </FormLayout.Group>
      <TextField
        label="Personal Mobile"
        value={item.personalMobile}
        onChange={handleChangePersonalMobile}
      />
      <FormLayout.Group>
        <TextField
          label="Residential Address"
          value={item.residenceAddress}
          onChange={handleChangeResidenceAddress}
        />
        <TextField
          label="Residence Phone"
          value={item.residencePhone}
          onChange={handleChangeResidencePhone}
        />
      </FormLayout.Group>
      <Text variant="headingSm" as="h6">
        EMERGENCY CONTACT
      </Text>
      <FormLayout.Group>
        <TextField
          label="First Name"
          value={item.emergencyFirstName}
          onChange={handleChangeFirstName}
        />
        <TextField
          label="Last Name"
          value={item.emergencyLastName}
          onChange={handleChangeLastName}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <FormLayout>
          <Text>Country</Text>
          <SelectSearchable
            options={countryList.map((item, index) => {
              return { label: item.name, value: item.name };
            })}
            onChange={handleSelectChangeCountry}
            value={item.emergencyCountry}
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
          label="Relationship"
          value={item.emergencyRelation}
          onChange={handleChangeRelationship}
        />
      </FormLayout.Group>
      <TextField
        label="Emergency Contact - Phone Number"
        value={item.emergencyPhoneContact}
        onChange={handleChangeEmergencyPhoneContact}
      />
      <Text variant="headingSm" as="h6">
        IDENTIFICATION DOCUMENTS
      </Text>
      <FormLayout>
        <Text>Country</Text>
        <SelectSearchable
          options={countryList.map((item, index) => {
            return { label: item.name, value: item.name };
          })}
          onChange={handleSelectChangeIdentificationCountry}
          value={item.identificationCountry}
          placeholder="Please select"
          styles={{
            // Fixes the overlapping problem of the component
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
        />
      </FormLayout>

      <Text>ID Document/ Passport</Text>

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
    // const bodyObj1 = {
    //   work_mobile: item.workMobile,
    //   work_email: item.workEmail,
    //   personal_mobile: item.personalMobile,
    //   residential_address: item.residenceAddress,
    //   residential_phone: item.residencePhone,

    //   employee_id: id,
    //   personal_email: item.workEmail,

    //   primary_emergency_contact_country: item.emergencyCountry.value,
    //   primary_emergency_contact_first_name: item.emergencyFirstName,
    //   primary_emergency_contact_last_name: item.emergencyLastName,
    //   primary_emergency_contact_phone_number: item.emergencyPhoneContact,
    //   primary_emergency_contact_relation: item.emergencyRelation,
    //   country: item.identificationCountry.value,
    //   first_image: files[files.length - 1].name,
    //   second_image: "",
    // };

    const formData = new FormData();

    formData.append("work_mobile", item.workMobile);
    formData.append("work_email", item.workEmail);
    formData.append("personal_mobile", item.personalMobile);
    formData.append("residential_address", item.residenceAddress);
    formData.append("residential_phone", item.residencePhone);
    formData.append("employee_id", id);
    formData.append("personal_email", item.workEmail);
    formData.append(
      "primary_emergency_contact_country",
      item.emergencyCountry.value
    );
    formData.append(
      "primary_emergency_contact_first_name",
      item.emergencyFirstName
    );
    formData.append(
      "primary_emergency_contact_last_name",
      item.emergencyLastName
    );
    formData.append(
      "primary_emergency_contact_phone_number",
      item.emergencyPhoneContact
    );
    formData.append(
      "primary_emergency_contact_relation",
      item.emergencyRelation
    );
    formData.append("country", item.identificationCountry.value);
    formData.append("first_image", files[files.length - 1].name);
    formData.append("second_image", " ");
    formData.append("_method", "PATCH");
    formData.append("document", files[files.length - 1].name);

    console.log(files[files.length - 1]);

    axios
      .post(`/contact-details/${id}`, formData)
      .then((result) => {
        console.log(result);
        console.log("contact details updated");
      })
      .catch((err) => console.log(err));
  }
};

export default ContactDetailsForm;
