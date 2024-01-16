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
    personalEmail: "",
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
    setItem({ ...item, personalEmail: newValue });
  };

  const handleChangeResidenceAddress = (newValue) => {
    setItem({ ...item, residenceAddress: newValue });
  };
  const handleChangeResidencePhone = (newValue) => {
    setItem({ ...item, residencePhone: newValue });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";

    try {
      responseItem = await axios.get(`/intern-contact-details/${id}`);
      console.log(responseItem.data.data);
      setItem({
        personalMobile: responseItem?.data?.data?.phone_number
          ? responseItem?.data?.data?.phone_number
          : "",
        workMobile: responseItem?.data?.data?.work_mobile
          ? responseItem?.data?.data?.work_mobile
          : "",
        personalEmail: responseItem?.data?.data?.email
          ? responseItem?.data?.data?.email
          : "",
        residenceAddress: responseItem?.data?.data?.residential_address
          ? responseItem?.data?.data?.residential_address
          : "",
        residencePhone: responseItem?.data?.data?.residential_phone
          ? responseItem?.data?.data?.residential_phone
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
        value={item.personalEmail}
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

      <PageActions
        primaryAction={{
          content: "Save",
          onClick: handleSave,
        }}
      ></PageActions>
    </FormLayout>
  );

  function handleSave() {
    const bodyObj = {
      work_mobile: item.workMobile,
      phone_number: item.personalMobile,
      email: item.personalEmail,
      residential_address: item.residenceAddress,
      residential_phone: item.residencePhone,
      intern_id: id,
    };

    axios
      .patch(`/intern-contact-details/${id}`, bodyObj)
      .then((result) => {
        console.log(result);
        console.log("Identification Documents updated");
      })
      .catch((err) => console.log(err));
  }
};

export default ContactDetailsForm;
