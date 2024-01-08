import {
  FormLayout,
  Text,
  TextField,
  Select,
  DropZone,
  Button,
  PageActions,
} from "@shopify/polaris";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import { countryList } from "../countries";
import SelectSearchable from "react-select";

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
  const handleDropDocs = (file) => {
    setItem({ ...item, idDocumentsPassport: file });
  };

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
      <DropZone
        label="ID Document/ Passport"
        onDrop={handleDropDocs}
        value={item.idDocumentsPassport}
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
    const bodyObj1 = {
      work_mobile: item.workMobile,
      work_email: item.workEmail,
      personal_mobile: item.personalMobile,
      residential_address: item.residenceAddress,
      residential_phone: item.residencePhone,

      employee_id: id,
      personal_email: item.workEmail,

      primary_emergency_contact_country: item.emergencyCountry.value,
      primary_emergency_contact_first_name: item.emergencyFirstName,
      primary_emergency_contact_last_name: item.emergencyLastName,
      primary_emergency_contact_phone_number: item.emergencyPhoneContact,
      primary_emergency_contact_relation: item.emergencyRelation,
    };
    const bodyObj2 = {
      country: item.identificationCountry.value,
      passport_or_id: item.idDocumentsPassport,
      first_image: "",
      second_image: "",
    };

    axios
      .patch(`/contact-details/${id}`, bodyObj1)
      .then((result) => {
        console.log(result);
        console.log("contact details updated");
      })
      .catch((err) => console.log(err));

    axios
      .patch(`/identification-documents/${id}`, bodyObj2)
      .then((result) => {
        console.log(result);
        console.log("Identification Documents updated");
      })
      .catch((err) => console.log(err));
  }
};

export default ContactDetailsForm;
