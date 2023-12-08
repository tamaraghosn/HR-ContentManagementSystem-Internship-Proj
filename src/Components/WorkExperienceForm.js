import { FormLayout, Text, TextField, Select } from "@shopify/polaris";
import React, { useState } from "react";

const WorkExperienceForm = () => {
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
        <Select
          label="Country"
          // options={optionsCountry.map((item, index) => {
          //     return { label: item.label, value: item.value };
          // })}
          onChange={handleSelectChangeCountry}
          value={item.country}
          placeholder="Choose an option"
        />
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
    </FormLayout>
  );
};

export default WorkExperienceForm;
