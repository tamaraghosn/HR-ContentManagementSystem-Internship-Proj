import {
  FormLayout,
  Text,
  TextField,
  Select,
  DropZone,
  Button,
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
    personalMobile: "",
    perosnalEmail: "",
    residenceAddress: "",
    residencePhone: "",
  });
  const handleChangePersonalMobile = (newValue) => {
    setItem({ ...item, personalMobile: newValue });
  };
  const handleChangeWorkMobile = (newValue) => {
    setItem({ ...item, workMobile: newValue });
  };
  const handleChangePersonalEmail = (newValue) => {
    setItem({ ...item, workEmail: newValue });
  };

  const handleChangeResidenceAddress = (newValue) => {
    setItem({ ...item, residenceAddress: newValue });
  };
  const handleChangeResidencePhone = (newValue) => {
    setItem({ ...item, residencePhone: newValue });
  };

  return (
    <FormLayout>
      <Text variant="headingSm" as="h6">
        CONTACT DETAILS
      </Text>
      <FormLayout.Group>
        <TextField
          label="Personal Mobile"
          value={item.personalMobile}
          onChange={handleChangePersonalMobile}
        />
        <TextField
          label="Work Mobile"
          value={item.workMobile}
          type="email"
          onChange={handleChangeWorkMobile}
        />
      </FormLayout.Group>
      <TextField
        label="Personal Email"
        value={item.perosnalEmail}
        onChange={handleChangePersonalEmail}
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

      <Button onClick={handleSave}>save</Button>
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
