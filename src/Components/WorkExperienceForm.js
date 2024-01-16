import {
  FormLayout,
  Text,
  TextField,
  Button,
  PageActions,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { countryList } from "../countries";
import SelectSearchable from "react-select";
import axios from "../Assets/Lib/axios";
import { useParams } from "react-router-dom";

const WorkExperienceForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    company: "",
    country: "",
    position: "",
    startDate: null,
    endDate: null,
    responsibilities: "",
  });

  const handleChangeCompany = (newValue) => {
    setItem({ ...item, company: newValue });
  };

  const handleSelectChangeCountry = (newValue) => {
    setItem({ ...item, country: newValue });
  };
  const handleChangePosition = (newValue) => {
    setItem({ ...item, position: newValue });
  };
  const handleChangeStartDate = (date) => {
    setItem({ ...item, startDate: date });
  };
  const handleChangeEndDate = (date) => {
    setItem({ ...item, endDate: date });
  };
  const handleChangeResponisibilities = (newValue) => {
    setItem({ ...item, responsibilities: newValue });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let responseItem = "";
    try {
      responseItem = await axios.get(`/work-experiences/${id}`);
      console.log(responseItem.data.data);
      setItem({
        company: responseItem?.data?.data?.company
          ? responseItem?.data?.data?.company
          : "",
        country: responseItem?.data?.data?.country
          ? responseItem?.data?.data?.country
          : "",
        position: responseItem?.data?.data?.position
          ? responseItem?.data?.data?.position
          : "",
        startDate: responseItem?.data?.data?.start_date
          ? responseItem?.data?.data?.start_date
          : "",
        endDate: responseItem?.data?.data?.end_date
          ? responseItem?.data?.data?.end_date
          : "",
        responsibilities: responseItem?.data?.data?.responsibilities
          ? responseItem?.data?.data?.responsibilities
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
        WORK EXPERIENCE
      </Text>
      <FormLayout.Group>
        <TextField
          label="Company"
          value={item.company}
          onChange={handleChangeCompany}
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
            value={item.country}
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
          label="Position"
          value={item.position}
          onChange={handleChangePosition}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <TextField
          label="Start Date"
          type="date"
          value={item.startDate}
          onChange={handleChangeStartDate}
        />
        <TextField
          label="End Date"
          type="date"
          value={item.endDate}
          onChange={handleChangeEndDate}
        />
      </FormLayout.Group>
      <TextField
        label="Responsibilities"
        multiline={6}
        value={item.responsibilities}
        onChange={handleChangeResponisibilities}
      />
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
      company: item.company,
      country: item.country.value,
      position: item.position,
      start_date: item.startDate,
      end_date: item.endDate,
      responsibilities: item.responsibilities,
      employee_id: id,
    };

    axios
      .patch(`/work-experiences/${id}`, bodyObj)
      .then((result) => {
        console.log(result);
        console.log("work experience updated");
      })
      .catch((err) => console.log(err));
  }
};

export default WorkExperienceForm;
